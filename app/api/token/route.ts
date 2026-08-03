import { NextResponse } from "next/server";

export async function getToken(): Promise<string> {

  const clientId = process.env.API_CLIENT_ID;
  const clientSecret = process.env.API_CLIENT_SECRET;
  const tokenUrl =
   `${process.env.API_SABRE_BASE_URL}/v2/auth/token` || "https://api.cert.platform.sabre.com/v3/auth/token";

  if (!clientId || !clientSecret) {
    throw new Error("Missing API credentials");
  }

  const encodedClientId = Buffer.from(clientId).toString("base64");
  const encodedClientSecret = Buffer.from(clientSecret).toString("base64");
  const credentials = Buffer.from(`${encodedClientId}:${encodedClientSecret}`).toString("base64");

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Token request failed: ${errorText}`);
  }

  const data = await response.json();
  return data.access_token as string;
}

// Exposed as a GET endpoint for debugging/direct use. Next.js also requires a
// route.ts file to export at least one HTTP handler.
export async function GET() {
  try {
    const token = await getToken();
    return NextResponse.json({ access_token: token });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch token", details: String(error) },
      { status: 500 },
    );
  }
}
