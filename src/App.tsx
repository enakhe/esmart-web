
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Guests from "./pages/Guests";
import { Suspense, lazy } from "react";

// Lazy load other routes for better performance
const Reservations = lazy(() => import("./pages/Reservations"));
const Rooms = lazy(() => import("./pages/Rooms"));
const Booking = lazy(() => import("./pages/Booking"));
const Reports = lazy(() => import("./pages/Reports"));
const CardMaintenance = lazy(() => import("./pages/CardMaintenance"));
const Settings = lazy(() => import("./pages/Settings"));

// Loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Dashboard Layout with nested routes */}
            <Route path="/" element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/guests" element={<Guests />} />
              
              {/* Lazy loaded routes */}
              <Route path="/reservations" element={
                <Suspense fallback={<LoadingFallback />}>
                  <Reservations />
                </Suspense>
              } />
              <Route path="/rooms" element={
                <Suspense fallback={<LoadingFallback />}>
                  <Rooms />
                </Suspense>
              } />
              <Route path="/booking" element={
                <Suspense fallback={<LoadingFallback />}>
                  <Booking />
                </Suspense>
              } />
              <Route path="/reports" element={
                <Suspense fallback={<LoadingFallback />}>
                  <Reports />
                </Suspense>
              } />
              <Route path="/cards" element={
                <Suspense fallback={<LoadingFallback />}>
                  <CardMaintenance />
                </Suspense>
              } />
              <Route path="/settings" element={
                <Suspense fallback={<LoadingFallback />}>
                  <Settings />
                </Suspense>
              } />
            </Route>
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
