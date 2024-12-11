import { signOut } from "@/auth";
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
import { getCoverLetters } from "@/services/cover-letter";
import {
  CaretCircleDown,
  SignOut,
  Sparkle,
  UserSquare,
} from "@phosphor-icons/react/dist/ssr";
import { AddCoverLetterButton } from "./add-cover-letter-button";
import CoverLetterMenuItem from "./cover-letter-menu-item";
import { Logo } from "./logo";
import { SettingsMenuItem } from "./settings-menu-item";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const settingsMenuItems = [
  {
    label: "Resume",
    href: "/app/settings/resume",
    icon: <UserSquare className="size-4" weight="duotone" />,
  },
  {
    label: "LLM",
    href: "/app/settings/llm",
    icon: <Sparkle className="size-4" weight="duotone" />,
  },
];

export async function AppSidebar() {
  const coverLetters = await getCoverLetters();

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
                <SidebarMenu>
                  {settingsMenuItems.map(({ label, href, icon: Icon }) => (
                    <SettingsMenuItem
                      key={href}
                      label={label}
                      href={href}
                      icon={Icon}
                    />
                  ))}
                  <SidebarMenuItem>
                    <form
                      action={async () => {
                        "use server";
                        await signOut();
                      }}
                    >
                      <SidebarMenuButton type="submit">
                        <SignOut className="size-4" weight="duotone" />
                        <span>Sign Out</span>
                      </SidebarMenuButton>
                    </form>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarFooter>
    </Sidebar>
  );
}
