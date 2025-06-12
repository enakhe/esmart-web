
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
  Clock
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">
        {/* Arrivals */}
        <Card className="bg-white border-none shadow-soft hover:shadow-md transition-shadow duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Arrivals
              <span className="block text-xs font-normal mt-1">This week</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-2xl sm:text-3xl font-semibold text-gray-800">
                {mockData.checkIns}
              </div>
              <div className="h-full flex items-end">
                <div className="w-1 h-12 sm:h-16 bg-secondary rounded-t-md"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Departures */}
        <Card className="bg-white border-none shadow-soft hover:shadow-md transition-shadow duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Departures
              <span className="block text-xs font-normal mt-1">This week</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-2xl sm:text-3xl font-semibold text-gray-800">
                {mockData.checkOuts}
              </div>
              <div className="h-full flex items-end">
                <div className="w-1 h-8 sm:h-10 bg-secondary rounded-t-md"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rooms Occupied */}
        <Card className="bg-gradient-to-br from-primary to-primary/90 text-white border-none shadow-soft hover:shadow-md transition-shadow duration-200 col-span-1 sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/80">
              <div className="flex justify-between items-center">
                <span>Rooms Occupied</span>
                <span className="text-xl sm:text-2xl">60%</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl sm:text-5xl font-semibold">{mockData.rooms.occupied}</div>
          </CardContent>
        </Card>

        {/* Today's Activities */}
        <Card className="bg-white border-none shadow-soft hover:shadow-md transition-shadow duration-200 col-span-1 sm:col-span-2 lg:col-span-1 row-span-1 lg:row-span-2">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg font-medium text-gray-800">
              Today's Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                  <span className="text-lg sm:text-xl font-semibold">
                    {mockData.todaysActivities.booked}
                  </span>
                </div>
                <p className="text-xs text-gray-600">Booked</p>
              </div>
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 bg-secondary/10 text-secondary rounded-full flex items-center justify-center">
                  <span className="text-lg sm:text-xl font-semibold">
                    {mockData.todaysActivities.guests}
                  </span>
                </div>
                <p className="text-xs text-gray-600">Guest</p>
              </div>
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-xs sm:text-sm font-semibold">
                    ${mockData.todaysActivities.revenue}
                  </span>
                </div>
                <p className="text-xs text-gray-600">Revenue</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <h3 className="text-sm sm:text-base font-medium text-gray-800">Weekly Stats</h3>
                <div className="flex text-xs sm:text-sm gap-2 sm:gap-4">
                  <span className="text-gray-600">Revenue</span>
                  <span className="text-gray-600">Guest</span>
                </div>
              </div>
              
              <div className="h-32 sm:h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockData.weeklyStats}
                    margin={{ top: 5, right: 5, left: -30, bottom: 5 }}
                  >
                    <CartesianGrid vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false} 
                      fontSize={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      fontSize={10}
                    />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#8056FF" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="guests" fill="#00CC66" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* In-house Guests */}
        <Card className="bg-white border-none shadow-soft hover:shadow-md transition-shadow duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Users className="w-4 h-4" />
              In-house Guests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-semibold text-gray-800">
              {mockData.inHouseGuests}
            </div>
            <p className="text-xs text-green-600 mt-1">↑ 12% from yesterday</p>
          </CardContent>
        </Card>

        {/* Revenue Today */}
        <Card className="bg-white border-none shadow-soft hover:shadow-md transition-shadow duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Revenue Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-3xl font-semibold text-gray-800">
              ${mockData.revenueToday.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 mt-1">↑ 8% from yesterday</p>
          </CardContent>
        </Card>

        {/* Average Stay Length */}
        <Card className="bg-white border-none shadow-soft hover:shadow-md transition-shadow duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Avg Stay Length
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-semibold text-gray-800">
              {mockData.avgStayLength} days
            </div>
            <p className="text-xs text-blue-600 mt-1">Stable from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Check-in Trends Chart */}
      <Card className="bg-white border-none shadow-soft hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg font-medium text-gray-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Check-in Trends & Processing Time
          </CardTitle>
          <p className="text-xs sm:text-sm text-gray-500">Today's hourly check-in volume and average processing time</p>
        </CardHeader>
        <CardContent>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={mockData.checkInTrends}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  fontSize={11}
                />
                <YAxis
                  yAxisId="left"
                  axisLine={false}
                  tickLine={false}
                  fontSize={11}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  fontSize={11}
                />
                <Tooltip />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="checkIns"
                  stroke="#8056FF"
                  fill="#8056FF"
                  fillOpacity={0.3}
                  name="Check-ins"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="avgTime"
                  stroke="#00CC66"
                  strokeWidth={2}
                  dot={{ fill: "#00CC66", strokeWidth: 2, r: 4 }}
                  name="Avg Time (min)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 sm:gap-6 mt-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary/60 rounded"></div>
              <span className="text-gray-600">Check-ins</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-secondary rounded"></div>
              <span className="text-gray-600">Processing Time (min)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reservations Table */}
      <Card className="bg-white border-none shadow-soft hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-4">
          <CardTitle className="text-base sm:text-lg font-medium text-gray-800">
            Reservations
          </CardTitle>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search name, room, id or phone"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full sm:w-64 h-10 pl-3 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.5} 
                  stroke="currentColor" 
                  className="w-5 h-5 text-gray-400"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" 
                  />
                </svg>
              </div>
            </div>
            <button 
              className="flex items-center justify-center px-4 py-2 text-white bg-secondary rounded-md hover:bg-secondary/90 transition-colors duration-200"
              onClick={() => setIsAddReservationModalOpen(true)}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-5 h-5 mr-1"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M12 4.5v15m7.5-7.5h-15" 
                />
              </svg>
              Add
            </button>
          </div>
        </CardHeader>
        
        <div className="px-4 sm:px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="arrivals" className="text-xs sm:text-sm">Arrivals</TabsTrigger>
              <TabsTrigger value="departures" className="text-xs sm:text-sm">Departure</TabsTrigger>
              <TabsTrigger value="stayovers" className="text-xs sm:text-sm">Stayover</TabsTrigger>
              <TabsTrigger value="inhouse" className="text-xs sm:text-sm">Inhouse</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="text-left text-xs sm:text-sm text-gray-500 border-b border-gray-200">
                      <th className="px-2 sm:px-4 py-3 font-medium">ID</th>
                      <th className="px-2 sm:px-4 py-3 font-medium">Guest</th>
                      <th className="px-2 sm:px-4 py-3 font-medium">Room</th>
                      <th className="px-2 sm:px-4 py-3 font-medium hidden sm:table-cell">Phone</th>
                      <th className="px-2 sm:px-4 py-3 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPaginatedReservations().map((reservation, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-2 sm:px-4 py-4 text-xs sm:text-sm text-gray-900">{reservation.id}</td>
                        <td className="px-2 sm:px-4 py-4 text-xs sm:text-sm text-gray-900">{reservation.guest}</td>
                        <td className="px-2 sm:px-4 py-4 text-xs sm:text-sm text-gray-900">{reservation.room}</td>
                        <td className="px-2 sm:px-4 py-4 text-xs sm:text-sm text-gray-900 hidden sm:table-cell">{reservation.phone}</td>
                        <td className="px-2 sm:px-4 py-4 text-xs sm:text-sm text-gray-900">{reservation.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {getTotalPages() > 1 && (
                <div className="mt-4 flex justify-center">
                  <Pagination>
                    <PaginationContent className="flex-wrap">
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
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
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(Math.min(getTotalPages(), currentPage + 1))}
                          className={currentPage === getTotalPages() ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
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
