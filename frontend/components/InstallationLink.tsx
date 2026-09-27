"use client";

import { useEffect, useState } from "react";

export function InstallationLink() {
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    queueMicrotask(() => setAddress(`${window.location.origin}/`));
  }, []);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(address);
      setStatus("Address copied.");
    } catch {
      setStatus("Select the address above and copy it.");
    }
  }

  return (
    <div>
      <p><a href={address || "/"}>{address || "Loading the installation address…"}</a></p>
      <button type="button" className="btn btn-primary" disabled={!address} onClick={copyAddress}>
        Copy address
      </button>
      <p role="status">{status}</p>
    </div>
  );
}
