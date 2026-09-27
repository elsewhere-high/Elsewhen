import type { Metadata } from "next";
import { RelationshipArchive } from "@/components/RelationshipArchive";

export const metadata: Metadata = { title: "Relationship Archive | Elsewhen" };

export default function RelationshipsPage() { return <RelationshipArchive />; }
