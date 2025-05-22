
import React from "react";
import LoginCarousel from "@/components/molecules/LoginCarousel";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Carousel */}
      <div className="hidden md:flex md:w-1/2 bg-white p-8 items-center justify-center">
        <div className="max-w-md">
          <LoginCarousel />
        </div>
      </div>
      
      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
