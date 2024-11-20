import { cn } from "@/lib/utils";
import type { BadgeProps } from "./ui/badge";
import { Badge } from "./ui/badge";

type MyBadgeProps = BadgeProps & {
  size?: "sm" | "md";
};

export const MyBadge = ({
  className,
  onClick,
  size = "md",
  ...props
}: MyBadgeProps) => {
  return (
    <Badge
      className={cn(
        "rounded-full flex items-center gap-1",
        size === "sm" && "text-xs py-0.5 px-1.5",
        size === "md" && "text-sm py-1.5 px-2.5",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      {...props}
    />
  );
};
