import { Button } from "@/components/ui/button";
import { LogOut, UserCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/medtech-logo.png";

interface HeaderProps {
  onProfileClick: () => void;
}

/**
 * Header Component
 * 
 * Displays the MediTech Innov logo, app name, slogan, and user profile/logout buttons.
 * - Logo and branding are positioned on the left
 * - User actions are positioned on the right
 */
const Header = ({ onProfileClick }: HeaderProps) => {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-border bg-card shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Branding Section - Left */}
          <div className="flex items-center gap-4">
            <img 
              src={logo} 
              alt="MediTech Innov Logo" 
              className="h-12 w-auto object-contain"
            />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-foreground">MedTech Innovation</h1>
              <p className="text-xs text-muted-foreground">Detect, Diagnose, and Defend</p>
            </div>
          </div>

          {/* User Actions Section - Right */}
          <div className="flex items-center gap-3">
            {user && (
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {user.fullName}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={onProfileClick}
              className="gap-2"
            >
              <UserCircle className="w-4 h-4" />
              Profile
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
