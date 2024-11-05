import { useCoverLetter } from "@/hooks/use-cover-letter";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

export const CoverLetterMenuItem = ({ id }: { id: string }) => {
  const params = useParams();
  const router = useRouter();
  const { coverLetter, deleteCoverLetter } = useCoverLetter(id);
  const href = `/cover-letter/${id}/${coverLetter.currentStep}`;
  const onDelete = () => {
    deleteCoverLetter();
    router.push("/");
  };
  return (
    <SidebarMenuItem key={id} className="relative group/item">
      <SidebarMenuButton
        isActive={params.id === id}
        asChild
        className="items-start p-4 h-auto leading-none"
      >
        <Link href={href} className="flex flex-col gap-0.5">
          <strong className="font-bold">
            {coverLetter.roleName || "Unknown role"}
          </strong>
          <span className="text-muted-foreground text-xs">
            {coverLetter.companyName || "Unknown company"}
          </span>
        </Link>
      </SidebarMenuButton>
      <Button
        variant="ghost"
        size="icon"
        className="top-1/2 right-2 absolute bg-white opacity-0 group-hover/item:opacity-100 transition-opacity -translate-y-1/2"
        onClick={onDelete}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </SidebarMenuItem>
  );
};
