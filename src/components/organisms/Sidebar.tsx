
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
  LogOut 
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
    { name: "Reports", path: "/reports", icon: FileText },
    { name: "Card Maintenance", path: "/cards", icon: Key },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `flex items-center gap-4 px-6 py-4 rounded-lg transition-colors text-white ${
      isActive 
        ? "bg-primary text-white font-medium" 
        : "hover:bg-primary/20 hover:text-white"
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
        className={`bg-hotel-primary fixed top-0 left-0 z-50 h-full transition-all duration-300 shadow-lg 
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

            <div className="mt-auto pt-8">
              <SidebarMenuItem>
                <SidebarMenuButton asChild size="lg">
                  <button 
                    onClick={logout}
                    className="flex items-center gap-4 w-full px-6 py-4 text-white 
                      hover:bg-primary/20 hover:text-white rounded-lg transition-colors"
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
