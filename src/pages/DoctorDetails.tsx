
import { useParams, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  MapPin, 
  Clock, 
  Heart, 
  GraduationCap, 
  Award, 
  Calendar,
  ArrowLeft,
  CheckCircle
} from "lucide-react";
import { doctors } from "../data/doctors";
import { useEffect, useState } from "react";

const DoctorDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const doctor = doctors.find(doc => doc.id === parseInt(id || ""));
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (location.state?.bookingSuccess) {
      setShowSuccess(true);
      // Hide success message after 5 seconds
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Doctor Not Found</h1>
          <Link to="/">
            <Button className="bg-teal-600 hover:bg-teal-700">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <h3 className="text-green-800 font-medium">Appointment Booked Successfully!</h3>
              <p className="text-green-700 text-sm">
                Your appointment for {location.state?.appointmentDetails?.patientName} has been confirmed.
              </p>
            </div>
          </div>
        )}

        <div className="mb-6">
          <Link to="/" className="flex items-center text-teal-600 hover:text-teal-700 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card className="mb-8 shadow-xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-emerald-500 h-2"></div>
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="h-16 w-16 text-white" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
                    <Badge variant="secondary" className="text-lg px-4 py-2 mb-4 bg-teal-100 text-teal-700 border-teal-200">
                      {doctor.specialization}
                    </Badge>
                  </div>
                  <div className="text-right bg-gradient-to-br from-coral-50 to-orange-50 p-4 rounded-lg border border-coral-200">
                    <div className="text-2xl font-bold text-coral-600 mb-1">
                      ${doctor.consultationFee}
                    </div>
                    <div className="text-gray-600">Consultation Fee</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2 bg-yellow-50 p-3 rounded-lg">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">{doctor.rating}</span>
                    <span className="text-gray-600">Rating</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-lg">
                    <Award className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">{doctor.experience} years</span>
                    <span className="text-gray-600">Experience</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">{doctor.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-green-50 p-3 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">{doctor.education}</span>
                  </div>
                </div>

                <Link to={`/book-appointment/${doctor.id}`}>
                  <Button size="lg" className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 shadow-lg">
                    <Calendar className="h-5 w-5 mr-2" />
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-teal-50 to-emerald-50 border-b border-teal-100">
                <CardTitle className="text-teal-700">About Dr. {doctor.name.split(' ')[1]}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700 leading-relaxed">{doctor.about}</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm mb-6">
              <CardHeader className="bg-gradient-to-r from-teal-50 to-emerald-50 border-b border-teal-100">
                <CardTitle className="flex items-center text-teal-700">
                  <Clock className="h-5 w-5 mr-2" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Available Days</h4>
                    <div className="space-y-1">
                      {doctor.availability.map((day, index) => (
                        <Badge key={index} variant="outline" className="mr-1 mb-1 border-teal-200 text-teal-700">
                          {day}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Time Slots</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {doctor.timeSlots.slice(0, 4).map((time, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-teal-100 text-teal-700">
                          {time}
                        </Badge>
                      ))}
                    </div>
                    {doctor.timeSlots.length > 4 && (
                      <p className="text-sm text-gray-500 mt-2">
                        +{doctor.timeSlots.length - 4} more slots available
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-teal-50 to-emerald-50 border-b border-teal-100">
                <CardTitle className="text-teal-700">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Patients Treated</span>
                    <span className="font-medium text-teal-600">2,500+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Success Rate</span>
                    <span className="font-medium text-teal-600">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-medium text-teal-600">Less than 2 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
