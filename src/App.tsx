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
  if (!user) {
    return (
      <>
        <Route path="/signup" children={<Signup />} />
        <Route path="/*" children={<Login />} />
      </>
    );
  }

  return (
    <>
      <Route path="/" children={<Home />} />
      <Route path="/events" children={<Events />} />
      <Route path="/tasks" children={<Tasks />} />
      <Route path="/profile" children={<Profile />} />

      {/* 🔒 Proteção extra */}
      <Route path="/*" children={<Home />} />
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
