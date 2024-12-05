"use client";

import { House, Sparkle, UserSquare } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

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

export const SettingsMenu = () => {
  const pathname = usePathname();
  return (
    <SidebarMenu>
      {settingsMenuItems.map(({ label, href, icon: Icon }) => (
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
  );
};
