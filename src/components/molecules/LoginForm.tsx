
import React, { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { Eye, EyeOff, Lock, User } from "lucide-react";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full animate-slideUp">
      <div className="space-y-2">
        <div className="relative">
          <Input
            type="email"
            placeholder="Email Address"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            className="pl-10"
          />
          <User className="absolute left-3 top-[38px] transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            className="pl-10"
          />
          <Lock className="absolute left-3 top-[38px] transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] transform -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-hotel-primary border-gray-300 rounded focus:ring-hotel-secondary"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>
        
        <a href="#" className="text-sm font-medium text-hotel-primary hover:text-hotel-secondary">
          Forgot password?
        </a>
      </div>
      
      <Button type="submit" fullWidth isLoading={isLoading}>
        Sign in
      </Button>
    </form>
  );
};

export default LoginForm;
