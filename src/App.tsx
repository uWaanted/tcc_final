import * as React from "react";
import { Route, useLocation } from "wouter";
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
      <Route path="/dashboard" children={<Dashboard />} />
      <Route path="/tasks" children={<Tasks />} />
      <Route path="/settings" children={<Settings />} />
      <Route path="/explore" children={<Explore />} />
      <Route path="/notifications" children={<Notifications />} />
      <Route path="/profile" children={<Profile />} />
      <Route path="/*" children={<NotFound />} />
    </>
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
