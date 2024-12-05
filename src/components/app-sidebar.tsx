import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getCoverLetters } from "@/services/cover-letter";
import { getCurrentUser } from "@/services/user";
import { CaretCircleDown } from "@phosphor-icons/react/dist/ssr";
import { AddCoverLetterButton } from "./add-cover-letter-button";
import CoverLetterMenuItem from "./cover-letter-menu-item";
import { Logo } from "./logo";
import { SettingsMenu } from "./settings-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

export async function AppSidebar() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not authenticated");
  }
  const coverLetters = await getCoverLetters(user);

  return (
    <Sidebar className="border-r">
      <SidebarHeader>
        <div className="flex justify-between items-center">
          <Logo href="/app" size="sm" />
          <SidebarTrigger />
        </div>
        <AddCoverLetterButton />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {coverLetters.map((coverLetter) => (
            <CoverLetterMenuItem
              key={coverLetter.id}
              coverLetter={coverLetter}
            />
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
                <SettingsMenu />
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarFooter>
    </Sidebar>
  );
}
