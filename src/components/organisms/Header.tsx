
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
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <button
          className="lg:hidden mr-4 hover:text-primary"
          onClick={() => setMobileSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-gray-500 hover:text-primary">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-medium text-white">
            3
          </span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">
                {user?.name?.charAt(0) || "U"}
              </span>
            </div>
            <div className="hidden md:block text-sm text-right">
              <p className="font-medium text-gray-800">{user?.name || "User"}</p>
              <p className="text-xs text-gray-500">Receptionist</p>
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
