import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, CheckCircle2, XCircle, Clock, MapPin, Phone, Mail } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const availabilityFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  service: z.enum(["photo-booth", "360-experience", "custom-backdrops"], {
    required_error: "Please select a service.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  timeSlot: z.string().optional(),
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
    label: "Custom Backdrops",
    description: "Curated collection of elegant backdrops",
  },
];

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
];

// Mock availability checker - in real app, this would call an API
const checkAvailability = (service: string, date: Date, timeSlot?: string) => {
  // Simulate checking availability
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  // Weekend dates are more likely to be booked
  if (isWeekend && Math.random() > 0.3) {
    return { available: false, message: "This date is currently booked. Please try another date." };
  }
  
  // Weekday dates are more likely to be available
  if (!isWeekend && Math.random() > 0.7) {
    return { available: false, message: "This date is currently booked. Please try another date." };
  }
  
  return { 
    available: true, 
    message: "Great news! This date is available. Complete your booking below." 
  };
};

export default function CheckAvailability() {
  const [availabilityResult, setAvailabilityResult] = useState<{
    available: boolean;
    message: string;
  } | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const form = useForm<AvailabilityFormValues>({
    resolver: zodResolver(availabilityFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: undefined,
      date: undefined,
      timeSlot: undefined,
    },
  });

  const onSubmit = async (data: AvailabilityFormValues) => {
    setIsChecking(true);
    // Simulate API call delay
    setTimeout(() => {
      const result = checkAvailability(data.service, data.date, data.timeSlot);
      setAvailabilityResult(result);
      setIsChecking(false);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById("availability-result")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 1000);
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
                  Select your preferred service and date to check availability. 
                  Our team will confirm your booking within 24 hours.
                </p>
              </div>

              {/* Availability Form */}
              <Card className="shadow-luxury border-0">
                <CardHeader>
                  <CardTitle>Check Availability</CardTitle>
                  <CardDescription>
                    Provide your contact information and select your preferred service and date.
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
                                  <SelectItem key={service.value} value={service.value}>
                                    <div>
                                      <div className="font-medium">{service.label}</div>
                                      <div className="text-xs text-muted-foreground">
                                        {service.description}
                                      </div>
                                    </div>
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

                      {/* Date Selection */}
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Event Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal bg-muted hover:bg-muted/80 border-muted-foreground/20",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              Select your preferred event date. We recommend booking 2-3 months in advance.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Time Slot (Optional) */}
                      <FormField
                        control={form.control}
                        name="timeSlot"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Time (Optional)</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a time (optional)" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Let us know your preferred start time. We'll do our best to accommodate.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        disabled={isChecking}
                      >
                        {isChecking ? (
                          <>
                            <Clock className="mr-2 h-4 w-4 animate-spin" />
                            Checking Availability...
                          </>
                        ) : (
                          <>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            Check Availability
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
                              <p className="text-sm text-muted-foreground">
                                Next steps to complete your booking:
                              </p>
                              <div className="flex flex-col sm:flex-row gap-3">
                                <Button 
                                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                                  onClick={() => {
                                    // In a real app, this would navigate to a booking form
                                    alert("Booking form would open here!");
                                  }}
                                >
                                  Complete Booking
                                </Button>
                                <Button 
                                  variant="outline"
                                  onClick={() => {
                                    form.reset();
                                    setAvailabilityResult(null);
                                  }}
                                >
                                  Check Another Date
                                </Button>
                              </div>
                              
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
                              Try Another Date
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
                      We recommend booking 2-3 months in advance for best availability.
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

