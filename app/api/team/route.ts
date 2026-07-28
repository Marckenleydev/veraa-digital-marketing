import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

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

  return client.db("codeveraa"); // change if needed
}

/* ─────────────────────────────
   CREATE TEAM MEMBER
───────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, role, exp, ini, color } = body;

    if (!name || !role || !exp || !ini || !color) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = await getDb();

    const result = await db.collection("team").insertOne({
      name,
      role,
      exp,
      ini,
      color,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, id: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (err) {
    console.error("[TEAM POST]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ─────────────────────────────
   GET ALL TEAM MEMBERS
───────────────────────────── */
export async function GET() {
  try {
    const db = await getDb();

    const team = await db
      .collection("team")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ team }, { status: 200 });
  } catch (err) {
    console.error("[TEAM GET]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ─────────────────────────────
   UPDATE TEAM MEMBER
───────────────────────────── */
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const { id, _id, ...updateData } = body; 
    // 👆 remove BOTH id and _id safely

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    const db = await getDb();

    const result = await db.collection("team").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[TEAM PUT]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ─────────────────────────────
   DELETE TEAM MEMBER
───────────────────────────── */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    const db = await getDb();

    const result = await db.collection("team").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[TEAM DELETE]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}