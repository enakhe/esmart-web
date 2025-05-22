
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
  const { collapsed } = useSidebar();
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
    return `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive 
        ? "bg-primary text-white" 
        : "text-gray-200 hover:bg-primary/20 hover:text-white"
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
          ${collapsed ? "w-[70px]" : "w-[240px]"}
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        collapsible
      >
        <div className="flex items-center justify-between px-4 py-5">
          {!collapsed && (
            <div className="flex items-center">
              <Logo className="text-white" variant="light" />
            </div>
          )}
          <SidebarTrigger className="text-white hover:text-gray-200" />
        </div>

        <SidebarContent className="px-2">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to={item.path} 
                    className={getNavLinkClass}
                    onClick={() => setMobileSidebarOpen(false)}
                  >
                    <item.icon size={20} />
                    {!collapsed && <span>{item.name}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

            <div className="mt-auto pt-6">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button 
                    onClick={logout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-gray-200 
                      hover:bg-primary/20 hover:text-white rounded-lg transition-colors"
                  >
                    <LogOut size={20} />
                    {!collapsed && <span>Logout</span>}
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
