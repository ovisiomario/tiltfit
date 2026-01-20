import { NextResponse } from "next/server";

const regionRouting: Record<string, string> = {
  NA1: "americas",
  BR1: "americas",
  LA1: "americas",
  LA2: "americas",
  OC1: "americas",
  EUW1: "europe",
  EUN1: "europe",
  TR1: "europe",
  RU: "europe",
  KR: "asia",
  JP1: "asia"
};

type RiotAccount = {
  puuid: string;
  gameName: string;
  tagLine: string;
};

export async function POST(request: Request) {
  const apiKey = process.env.RIOT_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing RIOT_API_KEY on the server." },
      { status: 500 }
    );
  }

  let payload: { riotId?: string; region?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const riotId = payload.riotId?.trim();
  const region = payload.region?.toUpperCase() ?? "";

  if (!riotId || !region) {
    return NextResponse.json(
      { error: "Riot ID and region are required." },
      { status: 400 }
    );
  }

  const [gameName, tagLine] = riotId.split("#");
  if (!gameName || !tagLine) {
    return NextResponse.json(
      { error: "Use the format Name#TAG for your Riot ID." },
      { status: 400 }
    );
  }

  const routing = regionRouting[region];
  if (!routing) {
    return NextResponse.json(
      { error: "Unsupported region selected." },
      { status: 400 }
    );
  }

  const baseUrl = `https://${routing}.api.riotgames.com`;

  const accountResponse = await fetch(
    `${baseUrl}/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
      gameName
    )}/${encodeURIComponent(tagLine)}`,
    {
      headers: { "X-Riot-Token": apiKey }
    }
  );

  if (!accountResponse.ok) {
    return NextResponse.json(
      { error: "Unable to find Riot account for that ID." },
      { status: accountResponse.status }
    );
  }

  const account = (await accountResponse.json()) as RiotAccount;

  const matchesResponse = await fetch(
    `${baseUrl}/lol/match/v5/matches/by-puuid/${account.puuid}/ids?count=10`,
    {
      headers: { "X-Riot-Token": apiKey }
    }
  );

  if (!matchesResponse.ok) {
    return NextResponse.json(
      { error: "Unable to fetch match history." },
      { status: matchesResponse.status }
    );
  }

  const matches = (await matchesResponse.json()) as string[];

  return NextResponse.json({
    gameName: account.gameName,
    tagLine: account.tagLine,
    matches
  });
}
