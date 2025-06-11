
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  CalendarDays, 
  Bed, 
  BookOpen, 
  FileText, 
  Key, 
  Settings, 
  LogOut,
  ChevronDown
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Logo from "@/components/atoms/Logo";
import { 
  Sidebar as SidebarComponent, 
  SidebarContent, 
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar 
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarProps {
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  mobileSidebarOpen, 
  setMobileSidebarOpen 
}) => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { logout } = useAuth();
  
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Guests", path: "/guests", icon: Users },
    { name: "Reservations", path: "/reservations", icon: CalendarDays },
    { name: "Rooms", path: "/rooms", icon: Bed },
    { name: "Booking", path: "/booking", icon: BookOpen },
    { name: "Card Maintenance", path: "/cards", icon: Key },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const reportItems = [
    "Daily Arrivals Report",
    "Daily Departures Report", 
    "Occupancy Report",
    "Guest Registration Report",
    "Room Status Report",
    "Reservation Summary Report",
    "Guest Profile Report",
    "Loyalty Points Report",
    "Group Booking Report",
    "Event Management Report",
    "Revenue Summary Report",
    "Check-in/Check-out Log",
    "Room Assignment Report",
    "Guest Folio Report",
    "No-Show Report",
    "Cancellation Report"
  ];

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `flex items-center gap-4 px-6 py-4 rounded-lg transition-colors text-white ${
      isActive 
        ? "bg-white/20 text-white font-medium" 
        : "hover:bg-white/10 hover:text-white"
    }`;
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <SidebarComponent
        className={`bg-primary fixed top-0 left-0 z-50 h-full transition-all duration-300 shadow-lg 
          ${collapsed ? "w-[70px]" : "w-[260px]"}
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        collapsible="icon"
      >
        <div className="flex items-center justify-between px-6 py-6">
          {!collapsed && (
            <div className="flex items-center">
              <Logo className="text-white" variant="light" />
            </div>
          )}
          <SidebarTrigger className="text-white hover:text-gray-200" />
        </div>

        <SidebarContent className="px-3">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton asChild size="lg">
                  <NavLink 
                    to={item.path} 
                    className={getNavLinkClass}
                    onClick={() => setMobileSidebarOpen(false)}
                  >
                    <item.icon size={22} />
                    {!collapsed && <span className="text-base font-medium">{item.name}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

            {/* Reports Dropdown */}
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg" className="flex items-center gap-4 px-6 py-4 rounded-lg transition-colors text-white hover:bg-white/10 hover:text-white w-full justify-start">
                    <FileText size={22} />
                    {!collapsed && (
                      <>
                        <span className="text-base font-medium">Reports</span>
                        <ChevronDown size={16} className="ml-auto" />
                      </>
                    )}
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  side="right" 
                  align="start" 
                  className="w-64 bg-white border border-gray-200 shadow-lg z-50"
                >
                  {reportItems.map((report, index) => (
                    <DropdownMenuItem 
                      key={index}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        console.log(`Generating ${report}`);
                        setMobileSidebarOpen(false);
                      }}
                    >
                      {report}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>

            <div className="mt-auto pt-8">
              <SidebarMenuItem>
                <SidebarMenuButton asChild size="lg">
                  <button 
                    onClick={logout}
                    className="flex items-center gap-4 w-full px-6 py-4 text-white 
                      hover:bg-white/10 hover:text-white rounded-lg transition-colors"
                  >
                    <LogOut size={22} />
                    {!collapsed && <span className="text-base font-medium">Logout</span>}
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </div>
          </SidebarMenu>
        </SidebarContent>
      </SidebarComponent>
    </>
  );
};

export default Sidebar;
