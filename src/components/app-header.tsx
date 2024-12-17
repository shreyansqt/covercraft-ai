"use client";
import { cn } from "@/lib/utils";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";

export const AppHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { open, isMobile } = useSidebar();
  return (
    <header className={cn("px-6 py-4 border-b", className)}>
      <div className="flex items-center">
        {(!open || isMobile) && <SidebarTrigger className="mr-2" />}
        <div className="flex-1">{children}</div>
      </div>
    </header>
  );
};
