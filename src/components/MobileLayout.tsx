import { ReactNode } from "react";
import { BottomNavigation } from "./BottomNavigation";

interface MobileLayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
}

export const MobileLayout = ({ children, showNavigation = true }: MobileLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 pb-16">
        {children}
      </main>
      {showNavigation && <BottomNavigation />}
    </div>
  );
};