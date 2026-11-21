import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FitnessProvider } from "@/contexts/FitnessContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Workout from "./pages/Workout";
import Diet from "./pages/Diet";
import Calculators from "./pages/Calculators";
import Progress from "./pages/Progress";
import Motivation from "./pages/Motivation";
import PostureAnalysis from "./pages/PostureAnalysis";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Everything behind this gate needs a signed-in user.
const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-background" />;
  if (!session) return <Login />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <AuthGate>
    <FitnessProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/workout" element={<Workout />} />
            <Route path="/diet" element={<Diet />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/motivation" element={<Motivation />} />
            <Route path="/posture" element={<PostureAnalysis />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </FitnessProvider>
    </AuthGate>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
