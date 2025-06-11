import React, { useState } from "react";
import { 
  Calendar, 
  LogOut, 
  UserCheck, 
  Users, 
  Home,
  Bell,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart,
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import AddReservationModal from "@/components/modals/AddReservationModal";

// Mock data
const mockData = {
  checkIns: 54,
  checkOuts: 12,
  occupancyRate: 75,
  upcomingReservations: 23,
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
  recentReservations: [
    { id: "#1245", guest: "Marika Venus", room: "2B", date: "Jul 31, 2023" },
    { id: "#1246", guest: "John Doe", room: "3A", date: "Aug 1, 2023" },
    { id: "#1247", guest: "Emma Wilson", room: "1C", date: "Aug 2, 2023" },
    { id: "#1248", guest: "Michael Brown", room: "4B", date: "Aug 3, 2023" },
  ],
};

const Dashboard: React.FC = () => {
  const [isAddReservationModalOpen, setIsAddReservationModalOpen] = useState(false);

  const handleAddReservation = (reservationData: any) => {
    console.log("New reservation created:", reservationData);
    // Here you would typically send this data to your backend
    setIsAddReservationModalOpen(false);
    
    // You could also update the local state to show the new reservation
    // or refetch the reservations data
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Arrivals */}
        <Card className="bg-white border-none shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Arrivals
              <span className="block text-xs font-normal mt-1">This week</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-semibold text-gray-800">
                {mockData.checkIns}
              </div>
              <div className="h-full flex items-end">
                <div className="w-1 h-16 bg-secondary rounded-t-md"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Departures */}
        <Card className="bg-white border-none shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Departures
              <span className="block text-xs font-normal mt-1">This week</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-semibold text-gray-800">
                {mockData.checkOuts}
              </div>
              <div className="h-full flex items-end">
                <div className="w-1 h-10 bg-secondary rounded-t-md"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rooms Occupied */}
        <Card className="bg-primary text-white border-none shadow-soft col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/80">
              <div className="flex justify-between items-center">
                <span>Rooms Occupied</span>
                <span className="text-2xl">60%</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-semibold">{mockData.rooms.occupied}</div>
          </CardContent>
        </Card>

        {/* Today's Activities */}
        <Card className="bg-white border-none shadow-soft row-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-800">
              Today's Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="w-12 h-12 mx-auto mb-2 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold">
                    {mockData.todaysActivities.booked}
                  </span>
                </div>
                <p className="text-xs text-gray-600">Booked</p>
              </div>
              <div>
                <div className="w-12 h-12 mx-auto mb-2 bg-secondary/10 text-secondary rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold">
                    {mockData.todaysActivities.guests}
                  </span>
                </div>
                <p className="text-xs text-gray-600">Guest</p>
              </div>
              <div>
                <div className="w-12 h-12 mx-auto mb-2 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold">
                    ${mockData.todaysActivities.revenue}
                  </span>
                </div>
                <p className="text-xs text-gray-600">Revenue</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <h3 className="text-base font-medium text-gray-800">Weekly Stats</h3>
                <div className="flex text-sm gap-4">
                  <span className="text-gray-600">Revenue</span>
                  <span className="text-gray-600">Guest</span>
                </div>
              </div>
              
              <div className="h-40">
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
                      fontSize={12}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      fontSize={12}
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
      </div>

      {/* Reservations Table */}
      <Card className="bg-white border-none shadow-soft">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium text-gray-800">
            Reservations
          </CardTitle>
          <div className="flex items-center">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search name, room or id"
                className="w-64 h-10 pl-3 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
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
              className="flex items-center justify-center px-4 py-2 text-white bg-secondary rounded-md hover:bg-secondary/90"
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
        
        <div className="px-6">
          <div className="flex border-b border-gray-200">
            <button className="px-4 py-2 text-sm font-medium text-primary border-b-2 border-primary">
              Arrivals
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
              Departure
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
              Stayover
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
              Inhouse
            </button>
          </div>
        </div>
        
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Guest</th>
                  <th className="px-4 py-3 font-medium">Room</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {mockData.recentReservations.map((reservation, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-900">{reservation.id}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{reservation.guest}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{reservation.room}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{reservation.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
