
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Guest {
  id: string;
  name: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: "Active" | "Checked Out" | "Reserved";
  phone: string;
}

// Mock guest data
const mockGuests: Guest[] = [
  {
    id: "G-1001",
    name: "John Doe",
    room: "101",
    checkIn: "2023-05-15",
    checkOut: "2023-05-20",
    status: "Active",
    phone: "+1 (555) 123-4567",
  },
  {
    id: "G-1002",
    name: "Jane Smith",
    room: "203",
    checkIn: "2023-05-16",
    checkOut: "2023-05-22",
    status: "Active",
    phone: "+1 (555) 987-6543",
  },
  {
    id: "G-1003",
    name: "Robert Johnson",
    room: "305",
    checkIn: "2023-05-14",
    checkOut: "2023-05-21",
    status: "Active",
    phone: "+1 (555) 456-7890",
  },
  {
    id: "G-1004",
    name: "Emily Davis",
    room: "402",
    checkIn: "2023-05-18",
    checkOut: "2023-05-25",
    status: "Reserved",
    phone: "+1 (555) 234-5678",
  },
  {
    id: "G-1005",
    name: "Michael Wilson",
    room: "110",
    checkIn: "2023-05-10",
    checkOut: "2023-05-17",
    status: "Checked Out",
    phone: "+1 (555) 876-5432",
  },
];

const GuestsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter guests based on search term
  const filteredGuests = mockGuests.filter(guest =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Guest Management</h1>
        <Button className="bg-secondary hover:bg-secondary/90">
          Add New Guest
        </Button>
      </div>

      <Card className="bg-white border-none shadow-soft">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium text-gray-800">
            Current Guests
          </CardTitle>
          <div className="flex items-center">
            <div className="relative mr-4">
              <Input
                type="text"
                placeholder="Search by name, room, or ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 border-gray-300"
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Room</th>
                  <th className="px-4 py-3 font-medium">Check-in</th>
                  <th className="px-4 py-3 font-medium">Check-out</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuests.map((guest) => (
                  <tr key={guest.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-900">{guest.id}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{guest.name}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{guest.room}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{guest.checkIn}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{guest.checkOut}</td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        guest.status === "Active" ? "bg-green-100 text-green-800" :
                        guest.status === "Reserved" ? "bg-blue-100 text-blue-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {guest.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">{guest.phone}</td>
                    <td className="px-4 py-4 text-sm space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">View</button>
                      <button className="text-green-600 hover:text-green-800">Edit</button>
                      <button className="text-red-600 hover:text-red-800">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuestsPage;
