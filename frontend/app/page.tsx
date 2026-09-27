import type { Metadata } from "next";
import { HomeExperience } from "@/components/HomeExperience";

export const metadata: Metadata = {
  title: "Elsewhen — A different choice. Another story.",
  description: "Join six independent AI agents in a game of hidden roles, inspect what each mind knew, and revisit the choices that changed the story.",
};

export default function HomePage() {
  return <HomeExperience />;
}
