
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AppRoutes from "@/constants/appRoutes";
import Login from "./Login";

// This component redirects to login or dashboard based on authentication status
const Index: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        navigate(AppRoutes.DASHBOARD);
      }
    }
  }, [isAuthenticated, isLoading, navigate]);

  // If still loading, show a simple loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-hotel-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-hotel-primary font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, render the Login page directly
  return <Login />;
};

export default Index;
