import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SessionProvider } from "next-auth/react";

export default function AppLayout(props: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1">{props.children}</div>
      </SidebarProvider>
    </SessionProvider>
  );
}
