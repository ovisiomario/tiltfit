import { NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";

type WaitlistPayload = {
  email?: string;
  riotId?: string;
  riotRegion?: string;
  weightedPercentile?: number;
  rank?: string;
};

export async function POST(request: Request) {
  let payload: WaitlistPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const email = payload.email?.trim();
  const riotId = payload.riotId?.trim();
  const riotRegion = payload.riotRegion?.trim();
  const weightedPercentile = payload.weightedPercentile;
  const rank = payload.rank?.trim();

  if (!email || !riotId || !riotRegion || !rank || weightedPercentile == null) {
    return NextResponse.json(
      { error: "Missing required waitlist fields." },
      { status: 400 }
    );
  }

  try {
    const entry = await prisma.waitlistEntry.create({
      data: {
        email,
        riotId,
        riotRegion,
        weightedPercentile,
        rank
      }
    });
    return NextResponse.json({ id: entry.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to save waitlist entry." },
      { status: 500 }
    );
  }
}
