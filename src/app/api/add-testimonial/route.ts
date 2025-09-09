import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";

const client = createClient({
  projectId: process.env.PROJECT_ID,
  dataset: "production",
  token: process.env.CREATE_TOKEN, // must have create permissions
  useCdn: false,
  apiVersion: "2025-08-30", // or today’s date
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { valutazione, name, message, hiddenField } = body;

    // Simple validation
    if (!message || message.length > 500) {
      return NextResponse.json(
        { error: "Invalid testimonial" },
        { status: 400 }
      );
    }

    // Honeypot check
    if (hiddenField) {
      return NextResponse.json({ error: "Bot detected" }, { status: 400 });
    }

    const doc = {
      _type: "testimonianze",
      valutazione: valutazione || 5,
      name: name || "Anonymous",
      message,
      approved: false,
      date: new Date().toISOString(),
    };

    await client.create(doc);

    return NextResponse.json({ message: "Testimonial submitted for review" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to save testimonial" },
      { status: 500 }
    );
  }
}
