import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Users, Shield, Heart, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { doctors } from "../data/doctors";
import { useAuth } from "../auth/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const featuredDoctors = doctors.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-600 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
                <Heart className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your Health, Our
              <span className="block text-coral-300"> Priority</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-teal-100 max-w-3xl mx-auto">
              Connect with certified healthcare professionals and book appointments seamlessly. 
              Experience healthcare that puts you first.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-white text-teal-600 hover:bg-cream-50 hover:text-teal-700 px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105">
                  Get Started
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-8 py-4 text-lg font-semibold transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-cream-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose MediCare?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Experience healthcare like never before with our comprehensive platform</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-teal-100 to-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="h-10 w-10 text-teal-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Expert Doctors</h3>
              <p className="text-gray-600 leading-relaxed">Connect with board-certified doctors and specialists who care about your health journey</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-coral-100 to-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Clock className="h-10 w-10 text-coral-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Easy Scheduling</h3>
              <p className="text-gray-600 leading-relaxed">Book appointments at your convenience, 24/7 with our intuitive booking system</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Secure Platform</h3>
              <p className="text-gray-600 leading-relaxed">Your health data is protected with enterprise-grade security and privacy measures</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Doctors</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Meet our top-rated healthcare professionals ready to serve you</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDoctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white shadow-lg overflow-hidden group">
                <div className="bg-gradient-to-r from-teal-500 to-emerald-500 h-2"></div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                      <Badge variant="secondary" className="mt-1 bg-teal-100 text-teal-700 border-teal-200">
                        {doctor.specialization}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{doctor.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{doctor.rating} ({doctor.experience} years exp.)</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-lg font-semibold text-coral-600">
                    ${doctor.consultationFee} consultation
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6">
                  <Link to={`/doctor/${doctor.id}`} className="w-full">
                    <Button className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 shadow-lg">
                      View Profile
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/doctors">
              <Button variant="outline" size="lg" className="border-2 border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-3 text-lg">
                View All Doctors
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">2,500+</div>
              <div className="text-teal-100">Happy Patients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-teal-100">Expert Doctors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-teal-100">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-teal-100">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      {!user && (
        <section className="bg-gradient-to-br from-cream-50 to-teal-50 text-gray-900 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-2xl p-12 shadow-xl border-0">
              <div className="mb-8">
                <CheckCircle className="h-16 w-16 text-teal-600 mx-auto mb-4" />
                <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Join thousands of patients who trust MediCare for their healthcare needs. 
                  Start your journey to better health today.
                </p>
              </div>
              <Link to="/register">
                <Button size="lg" className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 px-10 py-4 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300">
                  Create Your Account
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
