"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

export const SettingsMenuItem = ({
  label,
  href,
  icon,
}: {
  label: string;
  href: string;
  icon: React.ReactNode;
}) => {
  const pathname = usePathname();

  return (
    <SidebarMenuItem key={href}>
      <SidebarMenuButton isActive={pathname === href} asChild>
        <Link href={href} className="flex items-center gap-2">
          {icon}
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
