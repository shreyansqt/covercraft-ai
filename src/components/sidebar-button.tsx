"use client";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";

export const SidebarButton = () => {
  const { isMobile, open } = useSidebar();
  return (
    (!open || isMobile) && <SidebarTrigger className="top-4 left-4 absolute" />
  );
};
