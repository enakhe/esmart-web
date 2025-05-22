
import React from "react";
import logoSvg from "@/assets/logo.svg";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img src={logoSvg} alt="HotelMS Logo" className="w-10 h-10" />
      <div className="font-medium">
        <span className="text-primary text-xl">Hotel</span>
        <span className="text-secondary text-xl">MS</span>
      </div>
    </div>
  );
};

export default Logo;
