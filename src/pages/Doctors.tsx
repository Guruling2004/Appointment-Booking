
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  MapPin, 
  Heart, 
  Search,
  Filter,
  ArrowRight
} from "lucide-react";
import { doctors } from "../data/doctors";

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");

  // Get unique specializations for filter
  const specializations = [...new Set(doctors.map(doctor => doctor.specialization))];

  // Filter doctors based on search and specialization
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialization = selectedSpecialization === "" || 
                                 doctor.specialization === selectedSpecialization;
    
    return matchesSearch && matchesSpecialization;
  });

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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Doctor</h1>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
            Browse our network of qualified healthcare professionals and book appointments that fit your schedule.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white/80 backdrop-blur-sm border-b border-teal-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by doctor name, specialization, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:border-teal-500 focus:ring-teal-500 bg-white"
              >
                <option value="">All Specializations</option>
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {filteredDoctors.length} Doctor{filteredDoctors.length !== 1 ? 's' : ''} Found
            </h2>
            <p className="text-gray-600">
              {searchTerm && `Search results for "${searchTerm}"`}
              {selectedSpecialization && ` in ${selectedSpecialization}`}
            </p>
          </div>

          {filteredDoctors.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse all doctors.</p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSpecialization("");
                }}
                variant="outline"
                className="border-teal-600 text-teal-600 hover:bg-teal-50"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDoctors.map((doctor) => (
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
                    
                    <div className="space-y-3 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{doctor.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{doctor.rating} ({doctor.experience} years exp.)</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold text-coral-600">
                        ${doctor.consultationFee}
                      </div>
                      <div className="text-sm text-gray-500">consultation</div>
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
          )}
        </div>
      </section>
    </div>
  );
};

export default Doctors;
