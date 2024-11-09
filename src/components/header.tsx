"use client";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";

export const Header = ({ children }: { children: React.ReactNode }) => {
  const { open, isMobile } = useSidebar();
  return (
    <header className="px-6 py-4 border-b">
      <div className="flex items-start">
        {(!open || isMobile) && <SidebarTrigger className="mr-2" />}
        <div className="flex-1">{children}</div>
      </div>
    </header>
  );
};
