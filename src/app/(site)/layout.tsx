import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function SiteLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto container">{props.children}</div>
      <SiteFooter className="mt-auto" />
    </>
  );
}
