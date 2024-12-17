import { cn } from "@/lib/utils";
import Link from "next/link";

export const SiteFooter = (props: { className?: string }) => {
  return (
    <footer className={cn("border-t text-sm", props.className)}>
      <div className="flex justify-between items-center mx-auto py-4 container">
        <p>© {new Date().getFullYear()} CoverCraft AI. All rights reserved.</p>
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/terms">Terms of Service</Link>
          </li>
          <li>
            <Link href="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/imprint">Imprint</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
