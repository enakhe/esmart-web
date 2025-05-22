
import React, { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { Eye, EyeOff, Globe, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading?: boolean;
  roles?: string[];
  selectedRole?: string;
  onRoleChange?: (role: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSubmit, 
  isLoading = false,
  roles = [],
  selectedRole = '',
  onRoleChange = () => {},
}) => {
  const [email, setEmail] = useState("administrator@localhost");
  const [password, setPassword] = useState("Administrator1!");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [rememberMe, setRememberMe] = useState(false);

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
    <form onSubmit={handleSubmit} className="space-y-5 w-full">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Input
            type="email"
            id="email"
            placeholder="youremail@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            className={cn(
              "pl-3 h-12 bg-blue-50/30 border border-gray-200 rounded-md shadow-sm",
              errors.email ? "border-red-500" : "focus:border-primary focus:ring-primary"
            )}
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            className={cn(
              "pl-3 h-12 bg-blue-50/30 border border-gray-200 rounded-md shadow-sm",
              errors.password ? "border-red-500" : "focus:border-primary focus:ring-primary"
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {roles.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role <span className="text-red-500">*</span>
          </label>
          <Select value={selectedRole} onValueChange={onRoleChange}>
            <SelectTrigger className="w-full h-12 bg-blue-50/30 border border-gray-200">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-secondary border-gray-300 rounded focus:ring-primary"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
            Remember Me
          </label>
        </div>
        
        <a href="#" className="text-sm font-medium text-primary hover:text-primary/80">
          I forgot my password
        </a>
      </div>
      
      <Button 
        type="submit" 
        fullWidth 
        isLoading={isLoading}
        className="bg-secondary hover:bg-secondary/90 text-white py-3 h-12"
      >
        Login
      </Button>

      <div className="relative flex items-center justify-center mt-6">
        <div className="border-t border-gray-200 absolute w-full"></div>
        <span className="bg-white px-4 text-sm text-gray-500 relative">OR SIGN IN</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          className="flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        >
          <Globe size={18} />
          <span>with Google</span>
        </Button>
        
        <Button
          type="button"
          variant="outline"
          className="flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        >
          <MessageSquare size={18} />
          <span>with Microsoft</span>
        </Button>
      </div>
      
      <div className="text-center">
        <a href="#" className="text-sm text-primary hover:underline">
          Create new account
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
