import { NextResponse } from "next/server";

export async function getToken() {

  const clientId = process.env.API_CLIENT_ID;
  const clientSecret = process.env.API_CLIENT_SECRET;
  const tokenUrl =
   `${process.env.API_SABRE_BASE_URL}/v2/auth/token` || "https://api.cert.platform.sabre.com/v3/auth/token";

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "Missing API credentials" },
      { status: 500 },
    );
  }

  const encodedClientId = Buffer.from(clientId).toString("base64");
  const encodedClientSecret = Buffer.from(clientSecret).toString("base64");
  const credentials = Buffer.from(`${encodedClientId}:${encodedClientSecret}`).toString("base64");

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${credentials}`,
      },
      body: "grant_type=client_credentials",
      // body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "Token request failed", details: errorText, credentials: credentials },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data.access_token);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch token", details: String(error), credentials: credentials },
      { status: 500 },
    );
  }
}
