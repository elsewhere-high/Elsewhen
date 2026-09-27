import Link from "next/link";
export default function NotFound() {
  return <main className="app"><section className="setup-card"><p>Elsewhen · 404</p><h1>This path has no story yet.</h1><p>Return to the council and choose another way in.</p><Link className="btn btn-primary" href="/">Return to Elsewhen</Link></section></main>;
}
