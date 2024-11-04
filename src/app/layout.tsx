import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const avenirNext = localFont({
  src: [
    {
      path: "./fonts/AvenirNextLTPro-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/AvenirNextLTPro-It.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/AvenirNextLTPro-Bold.otf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-avenir-next",
});

export const metadata: Metadata = {
  title: "Cover Letter Wizard",
  description: "Generate cover letters with AI",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${avenirNext.variable} antialiased`}>
        <SidebarProvider>
          <AppSidebar />
          <div className="flex-1">{props.children}</div>
        </SidebarProvider>
      </body>
    </html>
  );
}
