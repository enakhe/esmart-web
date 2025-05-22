
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import AppRoutes from "@/constants/appRoutes";

const Dashboard: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={AppRoutes.LOGIN} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-serif font-semibold text-hotel-primary">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Welcome back, {user?.name || "User"}
        </p>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Dashboard content will go here in future iterations */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-medium text-hotel-primary">Quick Stats</h2>
            <p className="text-gray-500 mt-2">Dashboard coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
