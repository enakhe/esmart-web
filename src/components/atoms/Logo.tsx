
import React from "react";
import logoSvg from "@/assets/logo.svg";

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
}

const Logo: React.FC<LogoProps> = ({ className = "", variant = "default" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img src={logoSvg} alt="HotelMS Logo" className="w-8 h-8" />
      <div className="font-medium">
        <span className={variant === "light" ? "text-white text-xl" : "text-primary text-xl"}>Hotel</span>
        <span className={variant === "light" ? "text-secondary text-xl" : "text-secondary text-xl"}>MS</span>
      </div>
    </div>
  );
};

export default Logo;
