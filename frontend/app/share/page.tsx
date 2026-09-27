import type { Metadata } from "next";
import Link from "next/link";
import { InstallationLink } from "@/components/InstallationLink";

export const metadata: Metadata = {
  title: "Share | Elsewhen",
  description: "Share the current installation with other players.",
};

export default function SharePage() {
  return (
    <main className="app">
      <section className="setup-card">
        <p>Elsewhen</p>
        <h1>Invite someone to play</h1>
        <p>Use this installation’s address to open the game on another device.</p>
        <InstallationLink />
        <p>A local address is reachable only from devices that can access this server.</p>
        <p>Private multiplayer rooms provide their own seat-specific invitation links.</p>
        <Link href="/setup">Configure a council</Link>
      </section>
      <Link href="/">Return home</Link>
    </main>
  );
}
