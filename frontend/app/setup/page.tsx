import type { Metadata } from "next";
import SetupPage from "@/components/SetupPage";

export const metadata: Metadata = {
  title: "Configure the Council | Elsewhen",
  description: "Choose your seat and configure six independent AI agents before entering the village.",
};

export default function SetupRoute() {
  return <SetupPage />;
}
