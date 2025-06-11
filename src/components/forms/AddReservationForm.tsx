
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Plus, X, Users, Bed } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock room data - in real app this would come from API
const availableRooms = [
  { id: "101", number: "101", type: "Standard", capacity: 2, rate: 120 },
  { id: "102", number: "102", type: "Standard", capacity: 2, rate: 120 },
  { id: "201", number: "201", type: "Deluxe", capacity: 3, rate: 180 },
  { id: "202", number: "202", type: "Deluxe", capacity: 3, rate: 180 },
  { id: "301", number: "301", type: "Suite", capacity: 4, rate: 250 },
  { id: "302", number: "302", type: "Suite", capacity: 4, rate: 250 },
];

// Mock booked dates for demonstration
const bookedDates = {
  "101": [new Date(2025, 5, 15), new Date(2025, 5, 16)],
  "201": [new Date(2025, 5, 18), new Date(2025, 5, 19)],
};

const formSchema = z.object({
  guestName: z.string().min(2, "Guest name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  checkIn: z.date({
    required_error: "Check-in date is required",
  }),
  checkOut: z.date({
    required_error: "Check-out date is required",
  }),
  adults: z.string().min(1, "Number of adults is required"),
  children: z.string().default("0"),
  specialRequests: z.string().optional(),
}).refine((data) => data.checkOut > data.checkIn, {
  message: "Check-out date must be after check-in date",
  path: ["checkOut"],
});

interface AddReservationFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const AddReservationForm: React.FC<AddReservationFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [selectedRooms, setSelectedRooms] = useState<typeof availableRooms>([]);
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adults: "1",
      children: "0",
      specialRequests: "",
    },
  });

  const isRoomAvailable = (roomId: string, checkIn?: Date, checkOut?: Date) => {
    if (!checkIn || !checkOut) return true;
    
    const roomBookedDates = bookedDates[roomId as keyof typeof bookedDates] || [];
    
    return !roomBookedDates.some(bookedDate => {
      return bookedDate >= checkIn && bookedDate <= checkOut;
    });
  };

  const addRoom = (room: typeof availableRooms[0]) => {
    if (!selectedRooms.find(r => r.id === room.id)) {
      setSelectedRooms([...selectedRooms, room]);
    }
  };

  const removeRoom = (roomId: string) => {
    setSelectedRooms(selectedRooms.filter(room => room.id !== roomId));
  };

  const calculateTotal = () => {
    if (!checkInDate || !checkOutDate) return 0;
    
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const roomTotal = selectedRooms.reduce((sum, room) => sum + room.rate, 0);
    
    return nights * roomTotal;
  };

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    if (selectedRooms.length === 0) {
      alert("Please select at least one room");
      return;
    }

    const reservationData = {
      ...data,
      rooms: selectedRooms,
      totalAmount: calculateTotal(),
      nights: Math.ceil((data.checkOut.getTime() - data.checkIn.getTime()) / (1000 * 60 * 60 * 24)),
    };

    onSubmit(reservationData);
  };

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Guest Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users size={20} />
                Guest Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="guestName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guest Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter guest name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="guest@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="adults"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adults *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Adults" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="children"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Children</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Children" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[0, 1, 2, 3, 4].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon size={20} />
                Stay Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="checkIn"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Check-in Date *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick check-in date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              setCheckInDate(date);
                            }}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="checkOut"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Check-out Date *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick check-out date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              setCheckOutDate(date);
                            }}
                            disabled={(date) => date <= (checkInDate || new Date())}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Room Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bed size={20} />
                Room Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Selected Rooms */}
              {selectedRooms.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Selected Rooms:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRooms.map((room) => (
                      <Badge
                        key={room.id}
                        variant="secondary"
                        className="flex items-center gap-2 px-3 py-1"
                      >
                        Room {room.number} - {room.type} (${room.rate}/night)
                        <X
                          size={14}
                          className="cursor-pointer hover:text-red-500"
                          onClick={() => removeRoom(room.id)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Rooms */}
              <div className="space-y-2">
                <h4 className="font-medium">Available Rooms:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-40 overflow-y-auto">
                  {availableRooms
                    .filter(room => !selectedRooms.find(sr => sr.id === room.id))
                    .map((room) => {
                      const available = isRoomAvailable(room.id, checkInDate, checkOutDate);
                      return (
                        <div
                          key={room.id}
                          className={cn(
                            "border rounded-lg p-3 cursor-pointer transition-colors",
                            available
                              ? "hover:bg-gray-50 border-gray-200"
                              : "bg-gray-100 border-gray-300 cursor-not-allowed opacity-60"
                          )}
                          onClick={() => available && addRoom(room)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">Room {room.number}</div>
                              <div className="text-sm text-gray-600">{room.type}</div>
                              <div className="text-sm text-gray-600">
                                Up to {room.capacity} guests
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">${room.rate}</div>
                              <div className="text-xs text-gray-500">per night</div>
                              {!available && (
                                <div className="text-xs text-red-500 mt-1">Booked</div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Reservation Summary */}
              {selectedRooms.length > 0 && checkInDate && checkOutDate && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Reservation Summary:</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Number of nights:</span>
                      <span>{Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Number of rooms:</span>
                      <span>{selectedRooms.length}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-1">
                      <span>Total Amount:</span>
                      <span>${calculateTotal()}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Special Requests */}
          <Card>
            <CardContent className="pt-6">
              <FormField
                control={form.control}
                name="specialRequests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Requests</FormLabel>
                    <FormControl>
                      <textarea
                        className="w-full min-h-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        placeholder="Any special requests or notes..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="min-w-32">
              Create Reservation
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddReservationForm;
