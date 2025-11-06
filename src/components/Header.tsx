import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import logo from "@/assets/medtech-logo.png";

interface HeaderProps {
  onLoginClick: () => void;
  isLoggedIn: boolean;
  doctorName?: string;
}

/**
 * Header Component
 * 
 * Displays the MediTech Innov logo and doctor login/profile button.
 * - Logo is positioned on the left
 * - Login/Profile button is positioned on the right
 */
const Header = ({ onLoginClick, isLoggedIn, doctorName }: HeaderProps) => {
  return (
    <header className="border-b border-border bg-card shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section - Left */}
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="MediTech Innov Logo" 
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Doctor Login/Profile Section - Right */}
          <div className="flex items-center gap-3">
            {isLoggedIn && doctorName && (
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Dr. {doctorName}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={onLoginClick}
              className="gap-2"
            >
              <UserCircle className="w-4 h-4" />
              {isLoggedIn ? "Profile" : "Doctor Login"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
