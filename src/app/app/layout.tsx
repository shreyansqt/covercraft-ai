import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { prisma } from "@/prisma";
import { Toaster } from "@/components/ui/toaster"


export const runtime = "nodejs";

export default async function AppLayout(props: { children: React.ReactNode }) {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? undefined,
    },
  });
  if (!session || !user) return <div>Not authenticated</div>;
  return (
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1">{props.children}</div>
        <Toaster />
      </SidebarProvider>
  );
}
