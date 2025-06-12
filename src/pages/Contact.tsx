
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Send,
  MessageCircle
} from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      toast.success("Thank you for your message! We'll get back to you within 24 hours.");
      setIsLoading(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      info: "+1 (555) 123-4567",
      description: "Mon-Fri 9AM-6PM EST"
    },
    {
      icon: Mail,
      title: "Email",
      info: "contact@medicare.com",
      description: "We respond within 24 hours"
    },
    {
      icon: MapPin,
      title: "Address", 
      info: "123 Healthcare Ave, Medical District",
      description: "New York, NY 10001"
    },
    {
      icon: Clock,
      title: "Business Hours",
      info: "Monday - Friday: 9AM - 6PM",
      description: "Saturday - Sunday: 10AM - 4PM"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-teal-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <MessageCircle className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
            Have questions about our services? Need technical support? We're here to help you on your healthcare journey.
          </p>
        </div>
      </section>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <div className="bg-gradient-to-r from-teal-500 to-emerald-500 h-2 rounded-t-lg"></div>
                <CardHeader>
                  <CardTitle className="flex items-center text-teal-700">
                    <Send className="h-6 w-6 mr-2" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-gray-700 font-medium">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="mt-1 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-gray-700 font-medium">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-1 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-gray-700 font-medium">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="What is this about?"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="mt-1 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-gray-700 font-medium">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us how we can help you..."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="mt-1 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                        rows={6}
                        required
                      />
                    </div>

                    <Button 
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 py-3 text-lg font-semibold shadow-lg"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-teal-700">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-teal-600 font-medium">{item.info}</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-teal-700">Quick Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                      <h4 className="font-medium text-teal-800 mb-2">Emergency Support</h4>
                      <p className="text-sm text-teal-700">For urgent medical concerns, please call our 24/7 emergency line or visit your nearest emergency room.</p>
                    </div>
                    <div className="bg-coral-50 p-4 rounded-lg border border-coral-200">
                      <h4 className="font-medium text-coral-800 mb-2">Technical Issues</h4>
                      <p className="text-sm text-coral-700">Having trouble with the platform? Our technical support team is available during business hours.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
