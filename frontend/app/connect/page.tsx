import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Project details | Elsewhen",
  description: "Explore the game, its rules, and the agent experiment tools.",
};

export default function ConnectPage() {
  return (
    <main className="app">
      <header className="setup-card">
        <p>Elsewhen</p>
        <h1>Continue the experiment</h1>
        <p>Configure a council, follow the agents, and compare the evidence after each game.</p>
      </header>
      <nav className="setup-card" aria-label="Project resources">
        <p><Link href="/setup">Configure a game</Link></p>
        <p><Link href="/how-to-play">Read the rules and feature guide</Link></p>
        <p><Link href="/presentation">Explore the agent architecture</Link></p>
        <p><Link href="/share">Share this installation</Link></p>
      </nav>
      <Link href="/">Return home</Link>
    </main>
  );
}
