
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Users, 
  Award, 
  Clock, 
  Shield, 
  CheckCircle,
  Target,
  Globe
} from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, label: "Happy Patients", value: "10,000+" },
    { icon: Award, label: "Expert Doctors", value: "500+" },
    { icon: Clock, label: "Years Experience", value: "15+" },
    { icon: Shield, label: "Success Rate", value: "98%" }
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "We believe healthcare should be delivered with empathy, understanding, and genuine concern for each patient's wellbeing."
    },
    {
      icon: Target,
      title: "Excellence in Service", 
      description: "Our commitment to excellence drives us to constantly improve our services and maintain the highest medical standards."
    },
    {
      icon: Globe,
      title: "Accessible Healthcare",
      description: "Making quality healthcare accessible to everyone, regardless of location or background, through our innovative platform."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-teal-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <Heart className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About MediCare</h1>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing healthcare delivery through technology, compassion, and unwavering commitment to patient wellbeing.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-500 h-2 rounded-t-lg"></div>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To bridge the gap between patients and healthcare providers by creating an intuitive, 
                  secure, and efficient platform that makes quality healthcare accessible to everyone, 
                  anywhere, anytime.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600">Making a difference in healthcare, one patient at a time</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-teal-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-coral-400 to-orange-400 rounded-full flex items-center justify-center mb-4">
                    <value.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Built by Healthcare Enthusiasts</h2>
          <p className="text-lg text-teal-100 mb-8 leading-relaxed">
            Our team combines years of healthcare industry experience with cutting-edge technology 
            expertise to create solutions that truly make a difference in people's lives.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Medical Professionals
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Software Engineers
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              UX Designers
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Data Scientists
            </Badge>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
