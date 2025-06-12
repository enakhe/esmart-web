
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
  ChevronDown,
  ChevronRight
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
    return `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-white/80 relative overflow-hidden ${
      isActive 
        ? "bg-white/15 text-white font-medium shadow-lg backdrop-blur-sm border border-white/20" 
        : "hover:bg-white/10 hover:text-white hover:translate-x-1 hover:shadow-md"
    }`;
  };

  const getMenuButtonClass = (isActive = false) => {
    return `group flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300 text-white/80 relative overflow-hidden ${
      isActive 
        ? "bg-white/15 text-white font-medium shadow-lg backdrop-blur-sm border border-white/20" 
        : "hover:bg-white/10 hover:text-white hover:translate-x-1 hover:shadow-md"
    }`;
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <SidebarComponent
        className={`bg-gradient-to-b from-primary via-primary to-primary/90 fixed top-0 left-0 z-50 h-full transition-all duration-300 shadow-2xl border-r border-white/10
          ${collapsed ? "w-[70px]" : "w-[280px]"}
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        collapsible="icon"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
          {!collapsed && (
            <div className="flex items-center">
              <Logo className="text-white" variant="light" />
            </div>
          )}
          <SidebarTrigger className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-all duration-200" />
        </div>

        <SidebarContent className="px-4 py-6 space-y-2">
          <SidebarMenu className="space-y-2">
            {/* Navigation Items */}
            {navItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton asChild size="lg" className="p-0">
                  <NavLink 
                    to={item.path} 
                    className={getNavLinkClass}
                    onClick={() => setMobileSidebarOpen(false)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <item.icon size={20} className="relative z-10 group-hover:scale-110 transition-transform duration-200" />
                    {!collapsed && (
                      <span className="relative z-10 text-sm font-medium tracking-wide">{item.name}</span>
                    )}
                    {!collapsed && (
                      <ChevronRight size={16} className="relative z-10 ml-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

            {/* Reports Dropdown */}
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg" className={`${getMenuButtonClass()} p-0`}>
                    <div className="flex items-center gap-3 w-full px-4 py-3">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <FileText size={20} className="relative z-10 group-hover:scale-110 transition-transform duration-200" />
                      {!collapsed && (
                        <>
                          <span className="relative z-10 text-sm font-medium tracking-wide">Reports</span>
                          <ChevronDown size={16} className="relative z-10 ml-auto group-hover:rotate-180 transition-transform duration-200" />
                        </>
                      )}
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  side="right" 
                  align="start" 
                  className="w-72 bg-white/95 backdrop-blur-lg border border-gray-200/50 shadow-2xl z-50 rounded-xl"
                >
                  <div className="p-2">
                    {reportItems.map((report, index) => (
                      <DropdownMenuItem 
                        key={index}
                        className="px-4 py-3 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary cursor-pointer rounded-lg transition-all duration-200 font-medium"
                        onClick={() => {
                          console.log(`Generating ${report}`);
                          setMobileSidebarOpen(false);
                        }}
                      >
                        {report}
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>

            {/* Logout Button */}
            <div className="pt-8 border-t border-white/10 mt-8">
              <SidebarMenuItem>
                <SidebarMenuButton asChild size="lg" className="p-0">
                  <button 
                    onClick={logout}
                    className={getMenuButtonClass()}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <LogOut size={20} className="relative z-10 group-hover:scale-110 transition-transform duration-200" />
                    {!collapsed && (
                      <span className="relative z-10 text-sm font-medium tracking-wide">Logout</span>
                    )}
                    {!collapsed && (
                      <ChevronRight size={16} className="relative z-10 ml-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                    )}
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
