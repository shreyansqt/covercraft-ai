"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useCoverLetters } from "@/hooks/use-cover-letters";
import {
  CaretCircleDown,
  FilePlus,
  House,
  Sparkle,
  UserSquare,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CoverLetterMenuItem } from "./cover-letter-menu-item";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const settingsMenuItems = [
  {
    label: "Resume",
    href: "/app/settings/resume",
    icon: UserSquare,
  },
  {
    label: "LLM",
    href: "/app/settings/llm",
    icon: Sparkle,
  },
];

export const AppSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { coverLetterIds, createCoverLetter } = useCoverLetters();

  const handleCreateCoverLetter = () => {
    const id = createCoverLetter();
    router.push(`/app/cover-letter/${id}/job-description`);
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader>
        <div className="flex justify-between items-center">
          <Logo href="/app" size="sm" />
          <SidebarTrigger />
        </div>
        <Button onClick={handleCreateCoverLetter} className="w-full">
          <FilePlus className="mr-2 w-4 h-4" weight="duotone" /> New Cover
          Letter
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {coverLetterIds.map((id) => (
            <CoverLetterMenuItem key={id} id={id} />
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="text-muted-foreground">
                Settings
                <CaretCircleDown
                  className="group-data-[state=open]/collapsible:rotate-180 ml-auto text-muted-foreground transition-transform"
                  weight="bold"
                />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {settingsMenuItems.map(({ href, label, icon: Icon }) => (
                    <SidebarMenuItem key={href}>
                      <SidebarMenuButton isActive={pathname === href} asChild>
                        <Link href={href} className="flex items-center gap-2">
                          <Icon className="size-4" weight="duotone" />
                          <span>{label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/" className="flex items-center gap-2">
                        <House className="size-4" weight="duotone" />
                        <span>Return to Home Page</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarFooter>
    </Sidebar>
  );
};
