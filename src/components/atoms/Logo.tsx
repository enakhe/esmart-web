
import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-8 h-8 bg-hotel-secondary rounded-full flex items-center justify-center">
        <span className="text-hotel-primary font-serif font-bold text-lg">H</span>
      </div>
      <div className="font-serif text-xl font-medium text-hotel-primary">
        <span>Luxe</span>
        <span className="text-hotel-secondary">Stay</span>
      </div>
    </div>
  );
};

export default Logo;
