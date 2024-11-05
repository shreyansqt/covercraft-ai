import { cn } from "@/lib/utils";
import type { BadgeProps } from "./ui/badge";
import { Badge } from "./ui/badge";

type MyBadgeProps = BadgeProps;

export const MyBadge = ({ className, onClick, ...props }: MyBadgeProps) => {
  return (
    <Badge
      className={cn(
        "rounded-full py-1.5 px-2.5 flex items-center gap-1",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      {...props}
    />
  );
};
