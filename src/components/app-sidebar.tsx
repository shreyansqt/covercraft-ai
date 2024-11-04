"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useCoverLetters } from "@/hooks/use-cover-letters";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";
import { CoverLetterMenuItem } from "./cover-letter-menu-item";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const AppSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { coverLetterIds, createCoverLetter } = useCoverLetters();
  const [apiKey, setApiKey] = useLocalStorage("apiKey", "");

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
      <div className="mt-auto p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive={pathname === "/resume"} asChild>
              <Link href="/resume">Resume</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <Label htmlFor="apiKey">OpenAI API Key</Label>
        <Input
          id="apiKey"
          type="password"
          placeholder="OpenAI API Key"
          className="px-3 py-2 border rounded-md w-full text-sm"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </div>
    </Sidebar>
  );
};
