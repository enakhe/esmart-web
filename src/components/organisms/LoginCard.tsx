
import React from "react";
import Logo from "../atoms/Logo";
import LoginForm from "../molecules/LoginForm";

interface LoginCardProps {
  onSubmit: (email: string, password: string) => void;
  isLoading?: boolean;
}

const LoginCard: React.FC<LoginCardProps> = ({ onSubmit, isLoading }) => {
  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg animate-fadeIn">
      <div className="text-center mb-8">
        <Logo className="mx-auto mb-6" />
        <h1 className="text-2xl font-serif font-medium text-hotel-primary">
          Welcome Back
        </h1>
        <p className="text-gray-500 mt-2">
          Sign in to access your hotel management dashboard
        </p>
      </div>

      <LoginForm onSubmit={onSubmit} isLoading={isLoading} />

      <div className="mt-6 text-center text-sm">
        <p className="text-gray-500">
          Don't have an account?{" "}
          <a href="#" className="text-hotel-primary font-medium hover:text-hotel-secondary">
            Contact administrator
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginCard;
