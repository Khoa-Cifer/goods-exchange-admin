import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Listings from "./pages/Listings";
import Disputes from "./pages/Disputes";
import Charts from "./pages/Charts";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/auth-context";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ""}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/disputes" element={<Disputes />} />
              <Route path="/charts" element={<Charts />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </QueryClientProvider>
);

export default App;
