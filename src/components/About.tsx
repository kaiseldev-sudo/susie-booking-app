import { Heart, Award, Users, Sparkles } from "lucide-react";

const stats = [
  { icon: Heart, label: "Events Celebrated", value: "1,000+" },
  { icon: Award, label: "Five-Star Reviews", value: "373" },
  { icon: Users, label: "Happy Clients", value: "500+" },
  { icon: Sparkles, label: "Years Experience", value: "5+" },
];

export const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <p className="text-secondary font-medium mb-4 tracking-wide uppercase text-sm">
              About Us
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Creating <span className="text-primary italic">Unforgettable</span> Moments
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                At Susie Calvert Photography, we believe every event deserves to be extraordinary. 
                What started as a passion for capturing joy has grown into Southern California's 
                premier photo booth experience company.
              </p>
              <p>
                Our mission is simple: transform your celebrations into unforgettable experiences. 
                With state-of-the-art equipment, elegant design options, and personalized service, 
                we ensure every moment is picture-perfect.
              </p>
              <p>
                From intimate weddings to corporate galas, we've had the privilege of being part 
                of thousands of special moments. Let us help make your next event truly magical.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-card p-8 rounded-xl shadow-luxury hover:shadow-soft transition-smooth border border-border"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <stat.icon className="w-8 h-8 text-primary mb-4" />
                <div className="font-display text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
