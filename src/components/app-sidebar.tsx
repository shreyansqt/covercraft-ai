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
} from "@/components/ui/sidebar";
import { useCoverLetters } from "@/hooks/use-cover-letters";
import { ChevronDown, FileText, PlusCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CoverLetterMenuItem } from "./cover-letter-menu-item";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const settingsMenuItems = [
  {
    label: "Resume",
    href: "/settings/resume",
    icon: FileText,
  },
  {
    label: "LLM",
    href: "/settings/llm",
    icon: Sparkles,
  },
];

export const AppSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { coverLetterIds, createCoverLetter } = useCoverLetters();

  const handleCreateCoverLetter = () => {
    const id = createCoverLetter();
    const currentStep = "job-description";
    router.push(`/cover-letter/${id}/${currentStep}`);
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader>
        <Button onClick={handleCreateCoverLetter} className="w-full">
          <PlusCircle className="mr-2 w-4 h-4" /> New Cover Letter
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {coverLetterIds.map((id) => (
            <CoverLetterMenuItem id={id} key={id} />
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Settings
                <ChevronDown className="group-data-[state=open]/collapsible:rotate-180 ml-auto transition-transform" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {settingsMenuItems.map(({ href, label, icon: Icon }) => (
                    <SidebarMenuItem key={href}>
                      <SidebarMenuButton isActive={pathname === href} asChild>
                        <Link href={href} className="flex items-center gap-2">
                          <Icon className="size-4" />
                          <span>{label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarFooter>
    </Sidebar>
  );
};
