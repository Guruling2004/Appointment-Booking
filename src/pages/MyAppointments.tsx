import { useAuth } from "../auth/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, User, Clock, Trash2 } from "lucide-react";
import { format } from "date-fns";

const MyAppointments = () => {
  const { user, appointments, removeAppointment } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your appointments.</h1>
          <Link to="/login">
            <Button className="bg-teal-600 hover:bg-teal-700">Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-teal-700 mb-8 text-center">My Appointments</h1>
        {appointments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-lg text-gray-700 mb-4">You have no appointments yet.</p>
            <Link to="/doctors">
              <Button className="bg-teal-600 hover:bg-teal-700">Book an Appointment</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {appointments.map((appt, idx) => (
              <Card key={idx} className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center text-teal-700">
                    <User className="h-5 w-5 mr-2" />
                    {appt.doctorName}
                  </CardTitle>
                  <span className="text-sm text-gray-500">{appt.patientName}</span>
                  <button
                    className="ml-4 text-red-500 hover:text-red-700"
                    title="Remove Appointment"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to remove this appointment?')) {
                        removeAppointment(idx);
                      }
                    }}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </CardHeader>
                <CardContent className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-emerald-600" />
                    <span>{format(new Date(appt.date), "EEEE, MMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-emerald-600" />
                    <span>{appt.time}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments; 