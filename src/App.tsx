import { Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { useEffect, useState } from "react";

// Components
import PWAHeader from "./components/PWAHeader";
import BottomNavigation from "./components/BottomNavigation";
import OfflineMessage from "./components/OfflineMessage";

// Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Events from "./pages/events";
import Tasks from "./pages/tasks";
import Profile from "./pages/profile";

function Router({ user }: { user: any }) {
  // 🔐 Rotas públicas
  if (!user) {
    return (
      <>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Login} />
      </>
    );
  }

  // 🔓 Rotas privadas
  return (
    <>
      <Route path="/" component={Home} />
      <Route path="/events" component={Events} />
      <Route path="/tasks" component={Tasks} />
      <Route path="/profile" component={Profile} />
    </>
  );
}

export default function App() {
  const [location, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);

  // Recupera usuário salvo
  useEffect(() => {
    const savedUser = localStorage.getItem("facilita-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const isAuthPage = location === "/login" || location === "/signup";

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          {/* Header apenas quando logado */}
          {user && !isAuthPage && <PWAHeader />}

          <OfflineMessage />

          <Router user={user} />

          {/* Navegação inferior apenas quando logado */}
          {user && !isAuthPage && <BottomNavigation onNavigate={setLocation} />}

          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
