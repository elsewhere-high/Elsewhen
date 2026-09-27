import type { Metadata } from "next";
import PresentationContent from "./PresentationContent";

export const metadata: Metadata = {
  title: "Elsewhen | Agent Experiments",
  description:
    "Elsewhen is a playable multi-agent AI learning lab where learners predict, participate, inspect, explain, and replay agent behavior.",
};

export default function PresentationPage() {
  return <PresentationContent />;
}
