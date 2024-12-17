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
  CaretCircleUp,
  Coffee,
  Envelope,
  SignOut,
  Sparkle,
  UserSquare,
} from "@phosphor-icons/react/dist/ssr";
import type { User } from "@prisma/client";
import Link from "next/link";
import { AddCoverLetterButton } from "./add-cover-letter-button";
import CoverLetterMenuItem from "./cover-letter-menu-item";
import { Logo } from "./logo";
import { SettingsMenuItem } from "./settings-menu-item";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
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
    icon: <UserSquare className="size-4" weight="duotone" />,
  },
  {
    label: "Prompts",
    href: "/app/settings/llm",
    icon: <Sparkle className="size-4" weight="duotone" />,
  },
];

export async function AppSidebar({ user }: { user: User }) {
  const coverLetters = await getCoverLetters();

  return (
    <Sidebar className="border-r">
      <SidebarHeader>
        <div className="flex justify-between items-center">
          <Logo href="/app" size="sm" />
          <SidebarTrigger />
        </div>
        <AddCoverLetterButton className="w-full" />
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
        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <div className="flex items-center min-w-0">
                  <Avatar className="bg-gray-200 size-8">
                    <AvatarImage src={user.image || ""} />
                    <AvatarFallback className="bg-gray-200">
                      {user.name
                        ?.split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col px-2 min-w-0 text-left">
                    <span className="text-sm">{user.name}</span>
                    <span className="font-normal text-muted-foreground text-xs truncate">
                      {user.email}
                    </span>
                  </div>
                </div>
                <CaretCircleUp
                  className="group-data-[state=open]/collapsible:rotate-180 ml-auto text-muted-foreground"
                  weight="bold"
                />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent className="mt-4">
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
        <div className="flex flex-row gap-1 pt-2 border-t">
          <Button variant="outline" className="w-full" asChild size="sm">
            <Link
              href="mailto:hello@covercraftai.com?subject=Feedback on CoverCraft AI"
              target="_blank"
            >
              <Envelope weight="duotone" />
              Feedback
            </Link>
          </Button>
          <Button variant="ghost" className="w-full" asChild size="sm">
            <Link
              href="https://www.buymeacoffee.com/shreyansqt"
              target="_blank"
            >
              <Coffee weight="duotone" />
              Buy me a coffee
            </Link>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
