import { Heart, Award, Users, Sparkles, Star, Camera, Calendar } from "lucide-react";
import { useContent } from "@/hooks/useContent";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Award,
  Users,
  Sparkles,
  Star,
  Camera,
  Calendar,
};

const defaultStats = [
  { id: "1", icon: "Heart", label: "Events Celebrated", value: "1,000+" },
  { id: "2", icon: "Award", label: "Five-Star Reviews", value: "373" },
  { id: "3", icon: "Users", label: "Happy Clients", value: "500+" },
  { id: "4", icon: "Sparkles", label: "Years Experience", value: "5+" },
];

const defaultAbout = {
  sectionLabel: "About Us",
  title: "Creating Unforgettable Moments",
  paragraph1: "At Susie Calvert Photography, we believe every event deserves to be extraordinary. What started as a passion for capturing joy has grown into Southern California's premier photo booth experience company.",
  paragraph2: "Our mission is simple: transform your celebrations into unforgettable experiences. With state-of-the-art equipment, elegant design options, and personalized service, we ensure every moment is picture-perfect.",
  paragraph3: "From intimate weddings to corporate galas, we've had the privilege of being part of thousands of special moments. Let us help make your next event truly magical.",
};

export const About = () => {
  const { content: about } = useContent<typeof defaultAbout>('about');
  const { content: stats } = useContent<typeof defaultStats>('stats');
  
  const aboutData = { ...defaultAbout, ...about };
  const statsData = stats && stats.length > 0 ? stats : defaultStats;

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <p className="text-secondary font-medium mb-4 tracking-wide uppercase text-sm">
              {aboutData.sectionLabel}
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Creating <span className="text-primary italic">Unforgettable</span> Moments
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{aboutData.paragraph1}</p>
              <p>{aboutData.paragraph2}</p>
              <p>{aboutData.paragraph3}</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {statsData.map((stat, index) => {
              const IconComponent = iconMap[stat.icon] || Heart;
              return (
                <div
                  key={stat.id || stat.label}
                  className="bg-card p-8 rounded-xl shadow-luxury hover:shadow-soft transition-smooth border border-border"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <IconComponent className="w-8 h-8 text-primary mb-4" />
                  <div className="font-display text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
