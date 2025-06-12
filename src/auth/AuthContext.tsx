import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  fullName: string;
  email: string;
}

export interface Appointment {
  doctorId: number;
  doctorName: string;
  date: string;
  time: string;
  patientName: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  appointments: Appointment[];
  addAppointment: (appt: Appointment) => void;
  removeAppointment: (index: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("authUser");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (user) {
      const appts = localStorage.getItem(`appointments_${user.email}`);
      setAppointments(appts ? JSON.parse(appts) : []);
    } else {
      setAppointments([]);
    }
  }, [user]);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("authUser", JSON.stringify(user));
    const appts = localStorage.getItem(`appointments_${user.email}`);
    setAppointments(appts ? JSON.parse(appts) : []);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
    setAppointments([]);
  };

  const addAppointment = (appt: Appointment) => {
    if (!user) return;
    const updated = [...appointments, appt];
    setAppointments(updated);
    localStorage.setItem(`appointments_${user.email}`, JSON.stringify(updated));
  };

  const removeAppointment = (index: number) => {
    if (!user) return;
    const updated = appointments.filter((_, i) => i !== index);
    setAppointments(updated);
    localStorage.setItem(`appointments_${user.email}`, JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, appointments, addAppointment, removeAppointment }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}; 