
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Today's Check-ins */}
        <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Today's Check-ins
            </CardTitle>
            <UserPlus className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{mockData.checkIns}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        {/* Today's Check-outs */}
        <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Today's Check-outs
            </CardTitle>
            <UserMinus className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{mockData.checkOuts}</div>
            <p className="text-xs text-orange-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5% from yesterday
            </p>
          </CardContent>
        </Card>

        {/* Occupancy Rate */}
        <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Occupancy Rate
            </CardTitle>
            <BedDouble className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{mockData.occupancyRate}%</div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +3% from last week
            </p>
          </CardContent>
        </Card>

        {/* Revenue Today */}
        <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Revenue Today
            </CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${mockData.revenueToday.toLocaleString()}</div>
            <p className="text-xs text-purple-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8% from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Room Status Section */}
      <RoomStatus />

      {/* Check-in Trends Chart */}
      <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-gray-800 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Check-in Trends & Processing Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Check-in Volume */}
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-3">Check-in Volume by Hour</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={mockData.checkInTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="time" 
                    fontSize={12}
                    tick={{ fill: '#666' }}
                  />
                  <YAxis 
                    fontSize={12}
                    tick={{ fill: '#666' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="checkIns" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Processing Time */}
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-3">Average Processing Time (minutes)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={mockData.checkInTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="time" 
                    fontSize={12}
                    tick={{ fill: '#666' }}
                  />
                  <YAxis 
                    fontSize={12}
                    tick={{ fill: '#666' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avgTime" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reservations Table */}
      <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-200">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-4">
          <CardTitle className="text-lg font-medium text-gray-800 flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-primary" />
            Reservations Overview
          </CardTitle>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4 sm:mt-0">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search reservations..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => {
            setActiveTab(value);
            setCurrentPage(1);
          }} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="arrivals" className="text-xs sm:text-sm">
                Arrivals ({mockData.allReservations.arrivals.length})
              </TabsTrigger>
              <TabsTrigger value="departures" className="text-xs sm:text-sm">
                Departures ({mockData.allReservations.departures.length})
              </TabsTrigger>
              <TabsTrigger value="stayovers" className="text-xs sm:text-sm">
                Stay-overs ({mockData.allReservations.stayovers.length})
              </TabsTrigger>
              <TabsTrigger value="inhouse" className="text-xs sm:text-sm">
                In-house ({mockData.allReservations.inhouse.length})
              </TabsTrigger>
            </TabsList>

            {Object.entries(mockData.allReservations).map(([key, reservations]) => (
              <TabsContent key={key} value={key} className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">ID</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Guest</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Room</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Phone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getPaginatedReservations().map((reservation) => (
                        <tr key={reservation.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 text-sm text-gray-600">{reservation.id}</td>
                          <td className="py-3 px-4 text-sm font-medium text-gray-900">{reservation.guest}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{reservation.room}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{reservation.date}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{reservation.phone}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {getTotalPages() > 1 && (
                  <div className="flex justify-center mt-6">
                    <Pagination>
                      <PaginationContent>
                        {currentPage > 1 && (
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() => setCurrentPage(currentPage - 1)}
                              className="cursor-pointer"
                            />
                          </PaginationItem>
                        )}
                        
                        {Array.from({ length: getTotalPages() }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        {currentPage < getTotalPages() && (
                          <PaginationItem>
                            <PaginationNext
                              onClick={() => setCurrentPage(currentPage + 1)}
                              className="cursor-pointer"
                            />
                          </PaginationItem>
                        )}
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

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
