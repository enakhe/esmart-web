
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/organisms/Sidebar";
import Header from "@/components/organisms/Header";
import { SidebarProvider } from "@/components/ui/sidebar";

const DashboardLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50/50">
        {/* Sidebar */}
        <Sidebar 
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
        />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen lg:ml-[280px] transition-all duration-300">
          <Header 
            setMobileSidebarOpen={setMobileSidebarOpen}
          />
          
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-none">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
