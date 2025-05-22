
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import LoginCard from "@/components/organisms/LoginCard";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/hooks/useAuth";
import AppRoutes from "@/constants/appRoutes";

const roles = [
  "Administrator",
  "Manager",
  "Receptionist",
  "Housekeeping",
  "Accountant",
  "Bar",
  "Restaurant",
  "StoreKeeper",
  "Auditor",
];

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Receptionist");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
      navigate(AppRoutes.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        toast.success(`Welcome to HotelMS! Logged in as ${selectedRole}`);
        navigate(AppRoutes.DASHBOARD);
      }
    } catch (error) {
      toast.error("Invalid email or password");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <LoginCard 
        onSubmit={handleLogin} 
        isLoading={isLoading}
        roles={roles}
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
      />
    </AuthLayout>
  );
};

export default Login;
