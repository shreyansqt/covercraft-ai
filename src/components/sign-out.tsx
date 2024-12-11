import { signOut } from "@/auth";
import { SignOut as SignOutIcon } from "@phosphor-icons/react";
import { SidebarMenuButton } from "./ui/sidebar";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <SidebarMenuButton type="submit">
        <SignOutIcon className="size-4" weight="duotone" />
        <span>Sign Out</span>
      </SidebarMenuButton>
    </form>
  );
}
