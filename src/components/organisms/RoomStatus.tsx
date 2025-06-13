
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Building, Eye, EyeOff } from "lucide-react";

// Room status enum and colors
enum RoomStatusType {
  Vacant = "Vacant",
  Maintenance = "Maintenance", 
  Booked = "Booked",
  Reserved = "Reserved",
  Dirty = "Dirty",
  Debit = "Debit",
  Credit = "Credit"
}

const getStatusColor = (status: RoomStatusType): string => {
  switch (status) {
    case RoomStatusType.Vacant:
      return "#00C853";
    case RoomStatusType.Maintenance:
      return "#000000";
    case RoomStatusType.Booked:
      return "#1a237e";
    case RoomStatusType.Reserved:
      return "#fbbc04";
    case RoomStatusType.Dirty:
      return "#FF7500";
    case RoomStatusType.Debit:
      return "#FF0000";
    case RoomStatusType.Credit:
      return "#E9F0F7";
    default:
      return "#D3D3D3";
  }
};

interface Room {
  number: string;
  type: string;
  status: RoomStatusType;
  price: number;
  building: string;
  floor: number;
}

interface FilterOptions {
  number: boolean;
  roomType: boolean;
  price: boolean;
  status: boolean;
}

// Mock room data
const mockRooms: Room[] = [
  { number: "101", type: "Standard", status: RoomStatusType.Vacant, price: 120, building: "A", floor: 1 },
  { number: "102", type: "Deluxe", status: RoomStatusType.Booked, price: 180, building: "A", floor: 1 },
  { number: "103", type: "Standard", status: RoomStatusType.Dirty, price: 120, building: "A", floor: 1 },
  { number: "104", type: "Suite", status: RoomStatusType.Reserved, price: 250, building: "A", floor: 1 },
  { number: "201", type: "Standard", status: RoomStatusType.Maintenance, price: 120, building: "A", floor: 2 },
  { number: "202", type: "Deluxe", status: RoomStatusType.Vacant, price: 180, building: "A", floor: 2 },
  { number: "203", type: "Standard", status: RoomStatusType.Booked, price: 120, building: "A", floor: 2 },
  { number: "204", type: "Suite", status: RoomStatusType.Credit, price: 250, building: "A", floor: 2 },
  { number: "301", type: "Deluxe", status: RoomStatusType.Debit, price: 180, building: "B", floor: 1 },
  { number: "302", type: "Standard", status: RoomStatusType.Vacant, price: 120, building: "B", floor: 1 },
  { number: "303", type: "Suite", status: RoomStatusType.Reserved, price: 250, building: "B", floor: 1 },
  { number: "304", type: "Deluxe", status: RoomStatusType.Dirty, price: 180, building: "B", floor: 1 },
];

const RoomStatus: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    number: true,
    roomType: true,
    price: false,
    status: true
  });

  const handleFilterChange = (key: keyof FilterOptions) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const groupedRooms = mockRooms.reduce((acc, room) => {
    const buildingKey = `Building ${room.building}`;
    const floorKey = `Floor ${room.floor}`;
    
    if (!acc[buildingKey]) {
      acc[buildingKey] = {};
    }
    if (!acc[buildingKey][floorKey]) {
      acc[buildingKey][floorKey] = [];
    }
    
    acc[buildingKey][floorKey].push(room);
    return acc;
  }, {} as Record<string, Record<string, Room[]>>);

  const statusLegend = Object.values(RoomStatusType).map(status => ({
    status,
    color: getStatusColor(status)
  }));

  return (
    <Card className="bg-white border-none shadow-xl hover:shadow-2xl transition-shadow duration-200">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-4">
        <CardTitle className="text-base sm:text-lg font-medium text-gray-800 flex items-center gap-2">
          <Building className="w-5 h-5 text-primary" />
          Room Status
        </CardTitle>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4 sm:mt-0">
          {/* Status Legend */}
          <div className="flex flex-wrap gap-2">
            {statusLegend.map(({ status, color }) => (
              <div key={status} className="flex items-center gap-1 text-xs">
                <div 
                  className="w-3 h-3 rounded border border-gray-300"
                  style={{ backgroundColor: color }}
                />
                <span className="text-gray-600">{status}</span>
              </div>
            ))}
          </div>
          
          {/* Filter Controls */}
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
            <Eye className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-600 font-medium">Show:</span>
            {Object.entries(filters).map(([key, value]) => (
              <label key={key} className="flex items-center gap-1 text-xs cursor-pointer">
                <Checkbox
                  checked={value}
                  onCheckedChange={() => handleFilterChange(key as keyof FilterOptions)}
                  className="w-3 h-3"
                />
                <span className="text-gray-600 capitalize">
                  {key === 'roomType' ? 'Type' : key}
                </span>
              </label>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {Object.entries(groupedRooms).map(([building, floors]) => (
            <div key={building} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                {building}
              </h3>
              
              {Object.entries(floors).map(([floor, rooms]) => (
                <div key={floor} className="space-y-3">
                  <h4 className="text-md font-medium text-gray-700 pl-4">
                    {floor}
                  </h4>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 pl-8">
                    {rooms.map((room) => (
                      <div
                        key={room.number}
                        className="relative p-3 rounded-lg border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 min-h-[80px] flex flex-col justify-center items-center text-center"
                        style={{ 
                          backgroundColor: getStatusColor(room.status),
                          color: room.status === RoomStatusType.Credit ? '#000' : '#fff'
                        }}
                      >
                        {filters.number && (
                          <div className="font-bold text-sm mb-1">
                            {room.number}
                          </div>
                        )}
                        {filters.roomType && (
                          <div className="text-xs opacity-90 mb-1">
                            {room.type}
                          </div>
                        )}
                        {filters.price && (
                          <div className="text-xs opacity-80 mb-1">
                            ${room.price}
                          </div>
                        )}
                        {filters.status && (
                          <div className="text-xs opacity-90 font-medium">
                            {room.status}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomStatus;
