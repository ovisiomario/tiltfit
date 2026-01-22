import { NextResponse } from "next/server";

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

  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_TABLE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME ?? "Waitlist";

  if (!apiKey || !baseId) {
    const missing = [
      !apiKey ? "AIRTABLE_API_KEY" : null,
      !baseId ? "AIRTABLE_BASE_ID" : null
    ].filter(Boolean);
    return NextResponse.json(
      { error: `Airtable is not configured. Missing ${missing.join(", ")}.` },
      { status: 500 }
    );
  }

  const tableRef = tableId ? tableId : encodeURIComponent(tableName);
  const url = `https://api.airtable.com/v0/${baseId}/${tableRef}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fields: {
          Email: email,
          "Riot ID": riotId,
          "Riot Region": riotRegion,
          "Weighted Percentile": weightedPercentile,
          Rank: rank
        }
      })
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { error: `Unable to save waitlist entry. ${text}`.trim() },
        { status: 500 }
      );
    }

    const record = (await response.json()) as { id?: string };
    return NextResponse.json({ id: record.id ?? "airtable" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to save waitlist entry." },
      { status: 500 }
    );
  }
}
