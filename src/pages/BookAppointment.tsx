import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { 
  CalendarIcon, 
  Clock, 
  User, 
  Heart, 
  ArrowLeft,
  Phone,
  Mail,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { doctors } from "../data/doctors";
import { useAuth } from "../auth/AuthContext";

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { user, addAppointment } = useAuth();
  const doctor = doctors.find(doc => doc.id === parseInt(doctorId || ""));
  
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    patientName: user?.fullName || "",
    email: user?.email || "",
    phone: "",
    symptoms: "",
    emergencyContact: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Date/Time, 2: Patient Info, 3: Confirmation

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep = (stepNumber: number) => {
    if (stepNumber === 1) {
      if (!selectedDate || !selectedTime) {
        toast.error("Please select both date and time");
        return false;
      }
    }
    
    if (stepNumber === 2) {
      if (!formData.patientName || !formData.email || !formData.phone) {
        toast.error("Please fill in all required fields");
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address");
        return false;
      }

      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
        toast.error("Please enter a valid 10-digit phone number");
        return false;
      }
    }
    
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate booking process
    setTimeout(() => {
      toast.success("Appointment booked successfully! You will receive a confirmation email shortly.");
      setIsLoading(false);
      // Save appointment for user
      if (user && doctor && selectedDate && selectedTime) {
        addAppointment({
          doctorId: doctor.id,
          doctorName: doctor.name,
          date: selectedDate.toISOString(),
          time: selectedTime,
          patientName: formData.patientName
        });
      }
      // Navigate to a success page or back to doctor details
      navigate(`/doctor/${doctor?.id}`, { 
        state: { 
          bookingSuccess: true,
          appointmentDetails: {
            date: selectedDate,
            time: selectedTime,
            patientName: formData.patientName
          }
        }
      });
    }, 2000);
  };

  const isDateAvailable = (date: Date) => {
    if (!doctor) return false;
    const dayName = format(date, "EEEE");
    return doctor.availability.includes(dayName);
  };

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to={`/doctor/${doctor.id}`} className="flex items-center text-teal-600 hover:text-teal-700 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Doctor Profile
          </Link>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= num 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > num ? <CheckCircle className="h-4 w-4" /> : num}
                </div>
                {num < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > num ? 'bg-teal-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <span className="text-sm text-gray-600">
              {step === 1 && "Select Date & Time"}
              {step === 2 && "Patient Information"}
              {step === 3 && "Confirmation"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <CalendarIcon className="h-6 w-6 mr-2" />
                  Book Appointment
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Select Date</h3>
                      <div className="flex justify-center">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => 
                            date < new Date() || 
                            !isDateAvailable(date)
                          }
                          className="rounded-md border shadow-sm bg-white"
                        />
                      </div>
                    </div>

                    {selectedDate && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Available Time Slots</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {doctor.timeSlots.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`p-3 rounded-lg border transition-all ${
                                selectedTime === time
                                  ? 'bg-teal-600 text-white border-teal-600'
                                  : 'bg-white text-gray-700 border-gray-200 hover:border-teal-300'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button 
                      onClick={handleNext}
                      disabled={!selectedDate || !selectedTime}
                      className="w-full bg-teal-600 hover:bg-teal-700"
                    >
                      Continue to Patient Information
                    </Button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Patient Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="patientName">Full Name *</Label>
                        <div className="relative mt-1">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="patientName"
                            name="patientName"
                            placeholder="Enter patient name"
                            value={formData.patientName}
                            onChange={handleInputChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="relative mt-1">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter email address"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <div className="relative mt-1">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="emergencyContact">Emergency Contact</Label>
                        <div className="relative mt-1">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="emergencyContact"
                            name="emergencyContact"
                            type="tel"
                            placeholder="Emergency contact number"
                            value={formData.emergencyContact}
                            onChange={handleInputChange}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="symptoms">Symptoms / Reason for Visit</Label>
                      <Textarea
                        id="symptoms"
                        name="symptoms"
                        placeholder="Please describe your symptoms or reason for the appointment..."
                        value={formData.symptoms}
                        onChange={handleInputChange}
                        className="mt-1"
                        rows={4}
                      />
                    </div>

                    <div className="flex space-x-4">
                      <Button 
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button 
                        onClick={handleNext}
                        className="flex-1 bg-teal-600 hover:bg-teal-700"
                      >
                        Review Booking
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Your Appointment</h3>
                    
                    <div className="bg-teal-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Date:</span>
                        <span className="text-gray-900">{selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Time:</span>
                        <span className="text-gray-900">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Patient:</span>
                        <span className="text-gray-900">{formData.patientName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Consultation Fee:</span>
                        <span className="text-teal-600 font-semibold">${doctor.consultationFee}</span>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button 
                        variant="outline"
                        onClick={() => setStep(2)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button 
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
                      >
                        {isLoading ? "Booking..." : "Confirm Appointment"}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Doctor Summary & Info */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-teal-700">Doctor Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-full flex items-center justify-center">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                    <Badge variant="secondary" className="bg-teal-100 text-teal-700 border-teal-200">
                      {doctor.specialization}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">{doctor.experience} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <span className="font-medium">{doctor.rating}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Consultation Fee:</span>
                    <span className="font-medium text-teal-600">${doctor.consultationFee}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-teal-700">
                  <Clock className="h-5 w-5 mr-2" />
                  Available Days
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {doctor.availability.map((day, index) => (
                    <Badge key={index} variant="outline" className="mr-1 mb-1 border-teal-200 text-teal-700">
                      {day}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-teal-700">Important Notes</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>• Please arrive 15 minutes before your appointment</p>
                <p>• Bring your ID and insurance card</p>
                <p>• You can reschedule up to 24 hours before</p>
                <p>• Cancellation fee may apply for same-day cancellations</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
