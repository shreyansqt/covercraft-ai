import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { getCurrentUser } from "@/services/user";

export default async function AppLayout(props: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) return <div>Not authenticated</div>;
  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <div className="flex-1">{props.children}</div>
      <Toaster />
    </SidebarProvider>
  );
}
