import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export const runtime = "nodejs";

export default async function AppLayout(props: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1">{props.children}</div>
    </SidebarProvider>
  );
}
