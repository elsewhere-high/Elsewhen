import type { Metadata } from "next";
import { GameArchive } from "@/components/GameArchive";

export const metadata: Metadata = {
  title: "Game Archive | Elsewhen",
  description: "Private operator archive for Elsewhen sessions.",
};

export default function HistoryPage() {
  return <GameArchive />;
}
