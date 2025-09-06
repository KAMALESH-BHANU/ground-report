import { Link, useLocation } from "react-router-dom";
import { Home, FileText, MessageSquare, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/report", icon: FileText, label: "Report" },
  { href: "/complaints", icon: MessageSquare, label: "My Issues" },
  { href: "/notifications", icon: Bell, label: "Alerts" },
  { href: "/profile", icon: User, label: "Profile" },
];

export const BottomNavigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t z-50">
      <div className="grid grid-cols-5 max-w-md mx-auto">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = location.pathname === href;
          
          return (
            <Link
              key={href}
              to={href}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-1 transition-colors",
                "min-h-[60px] text-xs font-medium",
                isActive 
                  ? "text-primary bg-primary/5" 
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <Icon 
                size={20} 
                className={cn(
                  "mb-1 transition-colors",
                  isActive && "text-primary"
                )} 
              />
              <span className="leading-none">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};