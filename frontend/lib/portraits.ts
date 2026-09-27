import type { Role } from "./types";

const PORTRAIT_BY_SEAT: Record<string, string> = {
  seat_0: "/portraits/seat-0.webp",
  seat_1: "/portraits/seat-1.webp",
  seat_2: "/portraits/seat-2.webp",
  seat_3: "/portraits/seat-3.webp",
  seat_4: "/portraits/seat-4.webp",
  seat_5: "/portraits/seat-5.webp",
  seat_6: "/portraits/seat-6.webp",
};

const FULL_CHARACTER_BY_SEAT: Record<string, string> = {
  seat_0: "/characters/full/seat-0.webp",
  seat_1: "/characters/full/seat-1.webp",
  seat_2: "/characters/full/seat-2.webp",
  seat_3: "/characters/full/seat-3.webp",
  seat_4: "/characters/full/seat-4.webp",
  seat_5: "/characters/full/seat-5.webp",
  seat_6: "/characters/full/seat-6.webp",
};

const ROLE_ARTIFACT_BY_ROLE: Record<Role, string> = {
  werewolf: "/roles/werewolf.webp",
  seer: "/roles/seer.webp",
  doctor: "/roles/doctor.webp",
  villager: "/roles/villager.webp",
  hunter: "/roles/doctor.webp",
  mayor: "/roles/villager.webp",
  jester: "/roles/seer.webp",
};

/** Portrait identity belongs to the seat, not its editable display name.
 * A player can rename Lyra without accidentally inheriting another face. */
export function portraitForSeat(seatId: string): string | null {
  return PORTRAIT_BY_SEAT[seatId] ?? null;
}

/** Full-length, identity-matched character art for the cinematic village.
 * Kept separate from close portraits so cards remain sharp at small sizes. */
export function fullCharacterForSeat(seatId: string): string | null {
  return FULL_CHARACTER_BY_SEAT[seatId] ?? null;
}

export function roleArtifactFor(role: Role): string {
  return ROLE_ARTIFACT_BY_ROLE[role];
}

export function portraitAnimationDelay(seatId: string): string {
  const index = Number.parseInt(seatId.replace("seat_", ""), 10);
  return `${Number.isFinite(index) ? index * -0.73 : 0}s`;
}
