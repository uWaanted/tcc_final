import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";

const queryClient = new QueryClient();

const Toaster = () => (
  <div
    style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      background: "#333",
      color: "white",
      padding: "10px",
      borderRadius: "5px",
      zIndex: 1000,
    }}
  >
    Toasts aparecerão aqui
  </div>
);
const TooltipProvider = ({ children }) => <>{children}</>;

const usePWA = () => ({
  isInstallable: false,
  installApp: () => console.log("Instalar aplicativo PWA"),
});

const PlaceholderComponent = ({ name }) => (
  <div
    style={{
      padding: "2rem",
      textAlign: "center",
      width: "100%",
      height: "calc(100vh - 150px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <h1 style={{ fontSize: "2rem", color: "#555" }}>{name}</h1>
  </div>
);

const PWAHeader = ({ onShowQRCode }) => (
  <header
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    }}
  >
    <h1 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Facilita Horas</h1>
    <button
      onClick={onShowQRCode}
      style={{
        padding: "0.5rem 1rem",
        background: "#3b82f6",
        color: "white",
        border: "none",
        borderRadius: "0.25rem",
      }}
    >
      Mostrar QR
    </button>
  </header>
);

const BottomNavigation = ({ onNavigate }) => (
  <nav
    style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "space-around",
      padding: "0.5rem",
      boxShadow: "0 -2px 4px rgba(0,0,0,0.1)",
      background: "white",
    }}
  >
    <button onClick={() => onNavigate("/")}>Home</button>
    <button onClick={() => onNavigate("/tasks")}>Tasks</button>
    <button onClick={() => onNavigate("/profile")}>Profile</button>
  </nav>
);

const InstallPrompt = ({ isVisible, onInstall, onDismiss }) => {
  if (!isVisible) return null;
  return (
    <div
      style={{
        position: "fixed",
        bottom: "80px",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "1rem",
        background: "#2563eb",
        color: "white",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <p>Instale o app em seu dispositivo!</p>
      <button
        onClick={onInstall}
        style={{
          padding: "0.5rem 1rem",
          background: "white",
          color: "#2563eb",
          border: "none",
          borderRadius: "0.25rem",
        }}
      >
        Instalar
      </button>
      <button onClick={onDismiss}>&times;</button>
    </div>
  );
};

const QRCodeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{ background: "white", padding: "2rem", borderRadius: "0.5rem" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>QR Code</h2>
        <div
          style={{
            width: "160px",
            height: "160px",
            background: "#e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          [QR Code Placeholder]
        </div>
        <button
          onClick={onClose}
          style={{
            marginTop: "1rem",
            width: "100%",
            padding: "0.5rem",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "0.25rem",
          }}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

const OfflineMessage = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  useEffect(() => {
    const goOnline = () => setIsOffline(false);
    const goOffline = () => setIsOffline(true);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  if (!isOffline) return null;
  return (
    <div
      style={{
        padding: "0.5rem",
        background: "#f59e0b",
        textAlign: "center",
        color: "black",
      }}
    >
      Você está offline.
    </div>
  );
};

// Mocks para as Páginas
const Home = () => <PlaceholderComponent name="Home Page" />;
const Login = () => <PlaceholderComponent name="Login Page" />;
const Signup = () => <PlaceholderComponent name="Signup Page" />;
const Events = () => <PlaceholderComponent name="Events Page" />;
const Dashboard = () => <PlaceholderComponent name="Dashboard Page" />;
const Tasks = () => <PlaceholderComponent name="Tasks Page" />;
const Settings = () => <PlaceholderComponent name="Settings Page" />;
const Explore = () => <PlaceholderComponent name="Explore Page" />;
const Notifications = () => <PlaceholderComponent name="Notifications Page" />;
const Profile = () => <PlaceholderComponent name="Profile Page" />;
const NotFound = () => <PlaceholderComponent name="404 - Not Found" />;

// --- FIM: Implementações de Espaço Reservado ---

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

  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("facilita-user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Falha ao ler o usuário do localStorage", error);
      localStorage.removeItem("facilita-user");
    } finally {
      setIsLoadingAuth(false);
    }
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

  if (isLoadingAuth) {
    return null;
  }

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
