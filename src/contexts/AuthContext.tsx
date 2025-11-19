import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  fullName: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("medtech_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const signup = async (fullName: string, email: string, password: string) => {
    // Mock signup - in production, connect to real API
    // TODO: Replace with real API call to /api/auth/signup
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const newUser = { fullName, email };
    localStorage.setItem("medtech_user", JSON.stringify(newUser));
    setUser(newUser);
    setIsAuthenticated(true);
  };

  const login = async (email: string, password: string) => {
    // Mock login - in production, connect to real API
    // TODO: Replace with real API call to /api/auth/login
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const user = { fullName: email.split("@")[0], email };
    localStorage.setItem("medtech_user", JSON.stringify(user));
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("medtech_user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
