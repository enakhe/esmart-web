
import React from "react";
import Logo from "../atoms/Logo";
import LoginForm from "../molecules/LoginForm";

interface LoginCardProps {
  onSubmit: (email: string, password: string) => void;
  isLoading?: boolean;
}

const LoginCard: React.FC<LoginCardProps> = ({ onSubmit, isLoading }) => {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-soft animate-fadeIn">
      <div className="p-8">
        <div className="text-center mb-6">
          <Logo className="mx-auto mb-4" />
          <h1 className="text-xl font-medium text-gray-800">
            Login to start your session
          </h1>
        </div>

        <LoginForm onSubmit={onSubmit} isLoading={isLoading} />

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>
            Powered by HotelMS: Online Hotel Management Software
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
