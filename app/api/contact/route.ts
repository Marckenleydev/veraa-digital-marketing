import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

interface ContactSubmission {
  services: string[];
  desc: string;
  budget: string;
  name: string;
  email: string;
  company: string;
  timeline: string;
  extra: string;
  createdAt: Date;
}

/* ─── Mongo Singleton ─── */
let client: MongoClient | null = null;

async function getDb() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing");
  }

  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
  }

  return client.db("codeveraa");
}

/* ─────────────────────────────
   SUBMIT CONTACT FORM
───────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const body: ContactSubmission = await req.json();

    const { services, desc, budget, name, email, company, timeline, extra } = body;

    // Validate required fields
    if (!services || services.length === 0) {
      return NextResponse.json(
        { error: "Services are required" },
        { status: 400 }
      );
    }

    if (!desc || desc.length < 10) {
      return NextResponse.json(
        { error: "Project description is required (min 10 characters)" },
        { status: 400 }
      );
    }

    if (!budget) {
      return NextResponse.json(
        { error: "Budget range is required" },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    if (!timeline) {
      return NextResponse.json(
        { error: "Timeline is required" },
        { status: 400 }
      );
    }

    const db = await getDb();

    const result = await db.collection("contacts").insertOne({
      services,
      desc,
      budget,
      name,
      email,
      company: company || "",
      timeline,
      extra: extra || "",
      createdAt: new Date(),
    });

    return NextResponse.json(
      { 
        success: true, 
        id: result.insertedId,
        message: "Contact form submitted successfully" 
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[CONTACT POST]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ─────────────────────────────
   GET ALL CONTACT SUBMISSIONS
───────────────────────────── */
export async function GET() {
  try {
    const db = await getDb();

    const contacts = await db
      .collection("contacts")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ contacts }, { status: 200 });
  } catch (err) {
    console.error("[CONTACT GET]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
