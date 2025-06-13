import React, { useState } from "react";
import { 
  Calendar, 
  LogOut, 
  UserCheck, 
  Users, 
  Home,
  Bell,
  ChevronRight,
  DollarSign,
  TrendingUp,
  Clock,
  UserPlus,
  UserMinus,
  BedDouble,
  CalendarCheck
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart,
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import AddReservationModal from "@/components/modals/AddReservationModal";
import RoomStatus from "@/components/organisms/RoomStatus";

// Mock data
const mockData = {
  checkIns: 54,
  checkOuts: 12,
  occupancyRate: 75,
  upcomingReservations: 23,
  inHouseGuests: 142,
  revenueToday: 8750,
  avgStayLength: 2.4,
  rooms: {
    occupied: 50,
    vacant: 15,
    maintenance: 5,
    cleaning: 8,
  },
  todaysActivities: {
    booked: 5,
    guests: 22,
    revenue: 9867,
  },
  weeklyStats: [
    { day: "15", revenue: 500, guests: 10 },
    { day: "16", revenue: 750, guests: 15 },
    { day: "17", revenue: 650, guests: 12 },
    { day: "18", revenue: 800, guests: 16 },
    { day: "19", revenue: 550, guests: 11 },
    { day: "20", revenue: 700, guests: 14 },
    { day: "21", revenue: 900, guests: 18 },
  ],
  checkInTrends: [
    { time: "06:00", checkIns: 2, avgTime: 8 },
    { time: "08:00", checkIns: 5, avgTime: 12 },
    { time: "10:00", checkIns: 8, avgTime: 15 },
    { time: "12:00", checkIns: 12, avgTime: 18 },
    { time: "14:00", checkIns: 18, avgTime: 22 },
    { time: "16:00", checkIns: 25, avgTime: 15 },
    { time: "18:00", checkIns: 15, avgTime: 12 },
    { time: "20:00", checkIns: 8, avgTime: 10 },
    { time: "22:00", checkIns: 3, avgTime: 8 },
  ],
  allReservations: {
    arrivals: [
      { id: "#1245", guest: "Marika Venus", room: "2B", date: "Jul 31, 2023", phone: "+1-555-0123" },
      { id: "#1246", guest: "John Doe", room: "3A", date: "Aug 1, 2023", phone: "+1-555-0124" },
      { id: "#1247", guest: "Emma Wilson", room: "1C", date: "Aug 2, 2023", phone: "+1-555-0125" },
      { id: "#1248", guest: "Michael Brown", room: "4B", date: "Aug 3, 2023", phone: "+1-555-0126" },
      { id: "#1249", guest: "Sarah Davis", room: "5A", date: "Aug 4, 2023", phone: "+1-555-0127" },
      { id: "#1250", guest: "James Wilson", room: "6C", date: "Aug 5, 2023", phone: "+1-555-0128" },
    ],
    departures: [
      { id: "#1251", guest: "Alice Johnson", room: "7A", date: "Jul 31, 2023", phone: "+1-555-0129" },
      { id: "#1252", guest: "Bob Smith", room: "8B", date: "Aug 1, 2023", phone: "+1-555-0130" },
      { id: "#1253", guest: "Carol Lee", room: "9C", date: "Aug 2, 2023", phone: "+1-555-0131" },
    ],
    stayovers: [
      { id: "#1254", guest: "David Miller", room: "10A", date: "Jul 30, 2023", phone: "+1-555-0132" },
      { id: "#1255", guest: "Eva Garcia", room: "11B", date: "Jul 29, 2023", phone: "+1-555-0133" },
    ],
    inhouse: [
      { id: "#1256", guest: "Frank Wilson", room: "12C", date: "Jul 28, 2023", phone: "+1-555-0134" },
      { id: "#1257", guest: "Grace Taylor", room: "13A", date: "Jul 27, 2023", phone: "+1-555-0135" },
      { id: "#1258", guest: "Henry Davis", room: "14B", date: "Jul 26, 2023", phone: "+1-555-0136" },
      { id: "#1259", guest: "Ivy Chen", room: "15C", date: "Jul 25, 2023", phone: "+1-555-0137" },
    ],
  },
};

const Dashboard: React.FC = () => {
  const [isAddReservationModalOpen, setIsAddReservationModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("arrivals");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleAddReservation = (reservationData: any) => {
    console.log("New reservation created:", reservationData);
    setIsAddReservationModalOpen(false);
  };

  const getCurrentReservations = () => {
    return mockData.allReservations[activeTab as keyof typeof mockData.allReservations] || [];
  };

  const getFilteredReservations = () => {
    const reservations = getCurrentReservations();
    if (!searchTerm) return reservations;
    
    return reservations.filter(reservation =>
      reservation.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.phone.includes(searchTerm)
    );
  };

  const getPaginatedReservations = () => {
    const filtered = getFilteredReservations();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filtered.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    return Math.ceil(getFilteredReservations().length / itemsPerPage);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Metrics Cards Grid */}
      {/* ... keep existing code (metrics cards grid) */}

      {/* Room Status Section */}
      <RoomStatus />

      {/* Check-in Trends Chart */}
      {/* ... keep existing code (check-in trends chart) */}

      {/* Reservations Table */}
      {/* ... keep existing code (reservations table) */}

      {/* Add Reservation Modal */}
      <AddReservationModal
        isOpen={isAddReservationModalOpen}
        onClose={() => setIsAddReservationModalOpen(false)}
        onSubmit={handleAddReservation}
      />
    </div>
  );
};

export default Dashboard;
