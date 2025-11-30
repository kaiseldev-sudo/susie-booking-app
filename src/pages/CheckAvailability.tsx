import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format, parseISO, addDays } from "date-fns";
import { Calendar as CalendarIcon, CheckCircle2, XCircle, Clock, MapPin, Phone, Mail, Loader2 } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type AvailabilityResult = {
  available: boolean;
  message: string;
  details?: {
    appointmentId?: number;
    appointmentStatus?: string;
    eventDate?: string;
    preferredTime?: string | null;
    contactEmail?: string;
  };
};

type Schedule = {
  id: number;
  title: string;
  date: string;
  time: string;
  end_time: string | null;
  time_display: string;
  date_display: string;
  date_short: string;
  description?: string;
  status: string;
};

// Generate mock schedules for the next 30 days
const generateMockSchedules = (): Schedule[] => {
  const schedules: Schedule[] = [];
  const times = ["10:00", "14:00", "18:00"];
  const today = new Date();
  
  for (let i = 3; i <= 30; i++) {
    const date = addDays(today, i);
    // Skip some days randomly to make it more realistic
    if (i % 4 === 0) continue;
    
    times.forEach((time, timeIndex) => {
      // Skip some time slots randomly
      if ((i + timeIndex) % 3 === 0) return;
      
      const [hours, minutes] = time.split(":").map(Number);
      const dateWithTime = new Date(date);
      dateWithTime.setHours(hours, minutes, 0, 0);
      
      schedules.push({
        id: i * 10 + timeIndex,
        title: `Available Slot`,
        date: format(date, "yyyy-MM-dd"),
        time: time,
        end_time: null,
        time_display: format(dateWithTime, "h:mm a"),
        date_display: format(date, "EEEE, MMMM d, yyyy"),
        date_short: format(date, "MMM d"),
        status: "pending",
      });
    });
  }
  
  return schedules;
};

const mockSchedules = generateMockSchedules();

const formatEventDateDisplay = (value?: string) => {
  if (!value) {
    return null;
  }

  try {
    return format(parseISO(value), "PPP");
  } catch {
    return value;
  }
};

const formatPreferredTimeDisplay = (value?: string | null) => {
  if (!value || value.trim().length === 0) {
    return "Flexible";
  }

  const normalized = value.trim();
  if (/^\d{2}:\d{2}(:\d{2})?$/.test(normalized)) {
    const [hourStr, minuteStr] = normalized.split(":");
    const date = new Date();
    date.setHours(Number(hourStr), Number(minuteStr), 0, 0);
    return format(date, "h:mm a");
  }

  return normalized;
};

const availabilityFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  service: z.enum(["photo-booth", "360-experience", "custom-backdrops", "micro-photo-booth"], {
    required_error: "Please select a service.",
  }),
  scheduleId: z.string({
    required_error: "Please select an available schedule.",
  }),
});

type AvailabilityFormValues = z.infer<typeof availabilityFormSchema>;

const services = [
  {
    value: "photo-booth",
    label: "Photo Booth",
    description: "Classic photo booth with modern technology",
  },
  {
    value: "360-experience",
    label: "360° Experience",
    description: "Ultimate party centerpiece with slow-motion videos",
  },
  {
    value: "custom-backdrops",
    label: "Mirror Booth",
    description: "Curated collection of elegant backdrops",
  },
  {
    value: "micro-photo-booth",
    label: "Micro Photo Booth",
    description: "Compact booth perfect for intimate spaces and pop-up events",
  },
];

// Simple counter for generating appointment IDs
let appointmentCounter = 1000;

export default function CheckAvailability() {
  const [availabilityResult, setAvailabilityResult] = useState<AvailabilityResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [completeError, setCompleteError] = useState<string | null>(null);
  const [lastSubmission, setLastSubmission] = useState<{ email: string } | null>(null);
  const [availableSchedules, setAvailableSchedules] = useState<Schedule[]>([]);
  const [isLoadingSchedules, setIsLoadingSchedules] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>();

  const form = useForm<AvailabilityFormValues>({
    resolver: zodResolver(availabilityFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: undefined,
      scheduleId: undefined,
    },
  });

  // Watch service selection to load schedules
  const watchedService = form.watch("service");

  useEffect(() => {
    if (watchedService) {
      setSelectedService(watchedService);
      loadAvailableSchedules();
      // Reset schedule selection when service changes
      form.setValue("scheduleId", undefined);
    } else {
      setAvailableSchedules([]);
      setSelectedService(undefined);
    }
  }, [watchedService]);

  const loadAvailableSchedules = () => {
    setIsLoadingSchedules(true);
    // Simulate loading delay
    setTimeout(() => {
      setAvailableSchedules(mockSchedules);
      setIsLoadingSchedules(false);
    }, 500);
  };

  const eventDateDisplay = availabilityResult?.details
    ? formatEventDateDisplay(availabilityResult.details.eventDate)
    : null;
  const preferredTimeDisplay = formatPreferredTimeDisplay(availabilityResult?.details?.preferredTime);
  const appointmentReference = availabilityResult?.details?.appointmentId
    ? `APT-${String(availabilityResult.details.appointmentId).padStart(5, "0")}`
    : null;
  const appointmentStatus = availabilityResult?.details?.appointmentStatus ?? "pending";

  const onSubmit = async (data: AvailabilityFormValues) => {
    setIsChecking(true);
    setAvailabilityResult(null);
    setCompleteError(null);
    setLastSubmission(null);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      // Find selected schedule to get date and time
      const selectedSchedule = availableSchedules.find(
        (s) => s.id.toString() === data.scheduleId
      );

      if (!selectedSchedule) {
        throw new Error("Selected schedule not found");
      }

      // Generate a new appointment ID
      const newAppointmentId = ++appointmentCounter;

      setAvailabilityResult({
        available: true,
        message: "Great news! This date is available. Complete your booking below.",
        details: {
          appointmentId: newAppointmentId,
          appointmentStatus: "pending",
          eventDate: selectedSchedule.date,
          preferredTime: selectedSchedule.time,
          contactEmail: data.email,
        },
      });
      setLastSubmission({ email: data.email });
      form.reset();
    } catch (error) {
      const fallback = error instanceof Error ? error.message : "Unable to submit availability request.";
      setAvailabilityResult({
        available: false,
        message: fallback,
      });
    } finally {
      setIsChecking(false);
      setTimeout(() => {
        document.getElementById("availability-result")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleCompleteBooking = async () => {
    if (!availabilityResult?.details?.appointmentId || !lastSubmission?.email) {
      return;
    }

    setIsCompleting(true);
    setCompleteError(null);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      setAvailabilityResult((prev) => ({
        available: true,
        message: "Appointment confirmed! We can't wait to celebrate with you. You will receive a confirmation email shortly.",
        details: {
          appointmentId: prev?.details?.appointmentId,
          appointmentStatus: "confirmed",
          eventDate: prev?.details?.eventDate,
          preferredTime: prev?.details?.preferredTime,
          contactEmail: prev?.details?.contactEmail ?? lastSubmission.email,
        },
      }));
    } catch (error) {
      const fallback = error instanceof Error ? error.message : "Unable to confirm booking.";
      setCompleteError(fallback);
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-16">
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  Check <span className="text-primary italic">Availability</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Select your preferred service and choose from available schedules. 
                  Our team will confirm your booking within 24 hours.
                </p>
              </div>

              {/* Availability Form */}
              <Card className="shadow-luxury border-0">
                <CardHeader>
                  <CardTitle>Inquire Now</CardTitle>
                  <CardDescription>
                    Provide your contact information and select your preferred service and schedule.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Client Information Section */}
                      <div className="space-y-4 pb-4 border-b border-border/50">
                        <h3 className="text-lg font-semibold">Your Information</h3>
                        
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your.email@example.com" {...field} />
                              </FormControl>
                              <FormDescription>
                                We'll use this to send you booking confirmation.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Number *</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="(123) 456-7890" {...field} />
                              </FormControl>
                              <FormDescription>
                                We'll contact you to confirm your booking details.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Service Selection */}
                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {services.map((service) => (
                                  <SelectItem
                                    key={service.value}
                                    value={service.value}
                                    description={service.description}
                                  >
                                    <span className="font-medium">{service.label}</span>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Choose the service you'd like to book for your event.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Available Schedule Selection */}
                      <FormField
                        control={form.control}
                        name="scheduleId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Available Schedule *</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              value={field.value}
                              disabled={!selectedService || isLoadingSchedules}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={
                                    !selectedService 
                                      ? "Select a service first" 
                                      : isLoadingSchedules 
                                      ? "Loading schedules..." 
                                      : availableSchedules.length === 0
                                      ? "No available schedules"
                                      : "Select a schedule"
                                  } />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {isLoadingSchedules ? (
                                  <div className="flex items-center justify-center p-4">
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    <span className="text-sm text-muted-foreground">Loading schedules...</span>
                                  </div>
                                ) : availableSchedules.length === 0 ? (
                                  <div className="p-4 text-center text-sm text-muted-foreground">
                                    No available schedules found. Please try a different service or check back later.
                                  </div>
                                ) : (
                                  availableSchedules.map((schedule) => (
                                    <SelectItem
                                      key={schedule.id}
                                      value={schedule.id.toString()}
                                      description={
                                        <span className="flex items-center gap-1">
                                          <Clock className="h-3 w-3" />
                                          {schedule.time_display || schedule.time}
                                        </span>
                                      }
                                    >
                                      <span className="font-medium">
                                        {schedule.date_display || schedule.date_short || schedule.date}
                                      </span>
                                    </SelectItem>
                                  ))
                                )}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              {selectedService 
                                ? "Select your preferred event date and time from available schedules."
                                : "Select a service first to see available schedules."}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        disabled={isChecking || !selectedService || availableSchedules.length === 0}
                      >
                        {isChecking ? (
                          <>
                            <ClipLoader size={16} color="currentColor" className="mr-2" />
                            Checking Availability...
                          </>
                        ) : (
                          <>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            Inquire Now
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* Availability Result */}
              {availabilityResult && (
                <div id="availability-result" className="mt-8">
                  <Card className={cn(
                    "shadow-luxury border-0",
                    availabilityResult.available 
                      ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900" 
                      : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900"
                  )}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        {availabilityResult.available ? (
                          <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                        ) : (
                          <XCircle className="h-8 w-8 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                        )}
                        <div className="flex-1">
                          <h3 className={cn(
                            "font-semibold text-lg mb-2",
                            availabilityResult.available 
                              ? "text-green-900 dark:text-green-100" 
                              : "text-red-900 dark:text-red-100"
                          )}>
                            {availabilityResult.available ? "Available!" : "Not Available"}
                          </h3>
                          <p className={cn(
                            "mb-4",
                            availabilityResult.available 
                              ? "text-green-800 dark:text-green-200" 
                              : "text-red-800 dark:text-red-200"
                          )}>
                            {availabilityResult.message}
                          </p>
                          
                          {availabilityResult.available && (
                            <div className="space-y-3">
                              {availabilityResult.details && (
                                <div className="rounded-lg border border-border/40 bg-background/70 p-4 shadow-inner">
                                  <dl className="grid gap-4 sm:grid-cols-2 text-sm">
                                    {appointmentReference && (
                                      <div>
                                        <dt className="text-muted-foreground">Reference #</dt>
                                        <dd className="font-semibold">{appointmentReference}</dd>
                                      </div>
                                    )}
                                    {eventDateDisplay && (
                                      <div>
                                        <dt className="text-muted-foreground">Event Date</dt>
                                        <dd className="font-semibold">{eventDateDisplay}</dd>
                                      </div>
                                    )}
                                    <div>
                                      <dt className="text-muted-foreground">Preferred Time</dt>
                                      <dd className="font-semibold">{preferredTimeDisplay}</dd>
                                    </div>
                                    <div>
                                      <dt className="text-muted-foreground">Status</dt>
                                      <dd className="font-semibold capitalize">{appointmentStatus}</dd>
                                    </div>
                                  </dl>
                                </div>
                              )}
                              <p className="text-sm text-muted-foreground">
                                Next steps to complete your booking:
                              </p>
                              <div className="flex flex-col sm:flex-row gap-3">
                                <Button 
                                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                                  onClick={handleCompleteBooking}
                                  disabled={isCompleting}
                                >
                                  {isCompleting ? (
                                    <>
                                      <ClipLoader size={16} color="currentColor" className="mr-2" />
                                      Confirming...
                                    </>
                                  ) : (
                                    <>Complete Booking</>
                                  )}
                                </Button>
                                <Button 
                                  variant="outline"
                                  onClick={() => {
                                    form.reset();
                                    setAvailabilityResult(null);
                                    setCompleteError(null);
                                    setLastSubmission(null);
                                  }}
                                >
                                  Check Another Date
                                </Button>
                              </div>
                              {completeError && (
                                <p className="text-sm text-red-600 dark:text-red-300">
                                  {completeError}
                                </p>
                              )}
                              
                              <div className="pt-4 border-t border-border/50">
                                <p className="text-sm font-semibold mb-2">Or contact us directly:</p>
                                <div className="flex flex-col sm:flex-row gap-4 text-sm">
                                  <a 
                                    href="tel:+1234567890" 
                                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-smooth"
                                  >
                                    <Phone className="h-4 w-4" />
                                    <span>(123) 456-7890</span>
                                  </a>
                                  <a 
                                    href="mailto:hello@susiecalvert.com" 
                                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-smooth"
                                  >
                                    <Mail className="h-4 w-4" />
                                    <span>hello@susiecalvert.com</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {!availabilityResult.available && (
                            <Button 
                              variant="outline"
                              onClick={() => {
                                form.reset();
                                setAvailabilityResult(null);
                              }}
                              className="mt-4"
                            >
                              Try Again
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Additional Information */}
              <div className="mt-12 grid md:grid-cols-3 gap-6">
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Quick Response</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      We'll confirm your booking within 24 hours of your request.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Service Area</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Serving all of Southern California including LA, Orange County, and San Diego.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-2">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Flexible Dates</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Browse available schedules and select the one that works best for you.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
