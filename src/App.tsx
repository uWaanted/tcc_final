import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { useState, useEffect } from "react";

// Components
import PWAHeader from "./components/PWAHeader";
import BottomNavigation from "./components/BottomNavigation";
import InstallPrompt from "./components/InstallPrompt";
import QRCodeModal from "./components/QRCodeModal";
import OfflineMessage from "./components/OfflineMessage";

// Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Events from "./pages/events";
import Dashboard from "./pages/dashboard";
import Tasks from "./pages/tasks";
import Settings from "./pages/settings";
import Explore from "./pages/explore";
import Notifications from "./pages/notifications";
import Profile from "./pages/profile";
import NotFound from "./pages/not-found";

// Hooks
import { usePWA } from "./hooks/use-pwa";
import React from "react";

function Router({ user }: { user: any }) {
  if (!user) {
    return (
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route component={Login} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/events" component={Events} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/tasks" component={Tasks} />
      <Route path="/settings" component={Settings} />
      <Route path="/explore" component={Explore} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [, setLocation] = useLocation();
  const { isInstallable, installApp } = usePWA();
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("facilita-user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    if (isInstallable) {
      const timer = setTimeout(() => setShowInstallPrompt(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [isInstallable]);

  const handleInstall = async () => {
    await installApp();
    setShowInstallPrompt(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <PWAHeader onShowQRCode={() => setShowQRModal(true)} />
          <OfflineMessage />

          <Router user={user} />

          <BottomNavigation onNavigate={setLocation} />

          <InstallPrompt
            isVisible={showInstallPrompt && isInstallable}
            onInstall={handleInstall}
            onDismiss={() => setShowInstallPrompt(false)}
          />

          <QRCodeModal
            isOpen={showQRModal}
            onClose={() => setShowQRModal(false)}
          />

          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
