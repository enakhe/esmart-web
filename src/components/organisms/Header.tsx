
import React from "react";
import { Menu, Bell, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  setMobileSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setMobileSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 px-6 sm:px-8 lg:px-10 py-4 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center">
        <button
          className="lg:hidden mr-4 hover:text-primary p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          onClick={() => setMobileSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-500 hidden sm:block">Welcome back, manage your hotel operations</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button className="relative text-gray-500 hover:text-primary p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
          <Bell size={20} />
          <span className="absolute -top-0 -right-0 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-medium text-white">
            3
          </span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none hover:bg-gray-100 rounded-lg p-2 transition-colors duration-200">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
              <span className="text-sm font-medium text-white">
                {user?.name?.charAt(0) || "U"}
              </span>
            </div>
            <div className="hidden md:block text-sm text-left">
              <p className="font-medium text-gray-800">{user?.name || "User"}</p>
              <p className="text-xs text-gray-500">Receptionist</p>
            </div>
            <ChevronDown size={16} className="text-gray-400 hidden sm:block" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-lg border border-gray-200/50 shadow-xl rounded-xl">
            <div className="p-1">
              <DropdownMenuItem 
                onClick={() => navigate("/profile")}
                className="rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => navigate("/settings")}
                className="rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={logout}
                className="rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
              >
                Logout
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
