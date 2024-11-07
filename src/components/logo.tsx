import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import LogoIcon from "../../public/cover-craft-ai.svg";
export const Logo = ({
  href,
  className,
  size = "lg",
}: {
  href: string;
  className?: string;
  size?: "sm" | "lg";
}) => {
  return (
    <div
      className={cn(
        "flex items-center",
        size === "lg" ? "gap-2" : "gap-1",
        className
      )}
    >
      <Link href={href}>
        <Image
          src={LogoIcon}
          alt="CoverCraft AI Logo"
          width={size === "lg" ? 40 : 24}
          height={size === "lg" ? 40 : 24}
        />
      </Link>

      <div
        className={cn("flex items-baseline", size === "lg" ? "gap-2" : "gap-1")}
      >
        <Link href={href}>
          <span className={cn("font-semibold", size === "lg" ? "text-lg" : "")}>
            CoverCraft AI
          </span>
        </Link>
        <span
          className={cn(
            "text-muted-foreground",
            size === "lg" ? "text-sm" : "text-xs"
          )}
        >
          by{" "}
          <a
            href="https://shreyans.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:underline"
          >
            Shreyans
          </a>
        </span>
      </div>
    </div>
  );
};
