"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "./BrandMark";
import { usePreferences } from "./Preferences";

export function ProjectNav() {
  const pathname = usePathname();
  const { language } = usePreferences();
  if (pathname === "/" || pathname === "/explore") return null;
  return (
    <nav className="ew-toolbar" aria-label="Elsewhen navigation">
      <Link className="ew-wordmark" href="/"><BrandMark size={27} />Elsewhen</Link>
      <span>{language === "zh" ? "每个选择，都有另一种可能。" : "Every choice has an elsewhere."}</span>
      <Link href="/how-to-play">{language === "zh" ? "玩法指南" : "Field guide"}</Link>
    </nav>
  );
}
