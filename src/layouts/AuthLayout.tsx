
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        {children}
      </div>
      
      {/* Right Side - Hotel Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 hotel-gradient opacity-30"></div>
        <div 
          className="h-full bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')" 
          }}
        >
          <div className="flex flex-col h-full justify-end p-12 relative z-10">
            <div className="bg-black bg-opacity-50 p-6 rounded-lg backdrop-blur-sm max-w-md">
              <h3 className="text-white text-2xl font-serif mb-2">LuxeStay Hotel Management</h3>
              <p className="text-gray-200">
                Streamline operations, enhance guest experiences, and boost revenue with our comprehensive hotel management system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
