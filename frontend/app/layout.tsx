import type { Metadata } from "next";
import "./globals.css";
import { PreferencesProvider } from "@/components/Preferences";
import { ProjectNav } from "@/components/ProjectNav";

export const metadata: Metadata = {
  title: "Elsewhen",
  description: "Enter a living multi-agent game where six AI minds and one human player reason, remember, deceive, and decide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><PreferencesProvider><ProjectNav />{children}</PreferencesProvider></body>
    </html>
  );
}
