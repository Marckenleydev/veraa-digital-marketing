import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

interface ContentProduction {
  _id?: string;
  title: string;
  type: "photo" | "video" | "other";
  url: string;
  thumbnail?: string;
  description?: string;
  tags: string[];
  createdAt?: Date;
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
   CREATE CONTENT PRODUCTION
───────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const body: ContentProduction = await req.json();

    const { title, type, url, thumbnail, description, tags } = body;

    // Validate required fields
    if (!title || title.length < 2) {
      return NextResponse.json(
        { error: "Title is required (min 2 characters)" },
        { status: 400 }
      );
    }

    if (!type || !["photo", "video", "other"].includes(type)) {
      return NextResponse.json(
        { error: "Valid type is required (photo, video, or other)" },
        { status: 400 }
      );
    }

    if (!url || url.length < 5) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    const db = await getDb();

    const result = await db.collection("contentProduction").insertOne({
      title,
      type,
      url,
      thumbnail: thumbnail || "",
      description: description || "",
      tags: tags || [],
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        id: result.insertedId,
        message: "Content created successfully"
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[CONTENT PRODUCTION POST]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ─────────────────────────────
   GET ALL CONTENT PRODUCTION
───────────────────────────── */
export async function GET() {
  try {
    const db = await getDb();

    const contentProduction = await db
      .collection("contentProduction")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ contentProduction }, { status: 200 });
  } catch (err) {
    console.error("[CONTENT PRODUCTION GET]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ─────────────────────────────
   UPDATE CONTENT PRODUCTION
───────────────────────────── */
export async function PUT(req: NextRequest) {
  try {
    const body: ContentProduction & { id: string } = await req.json();

    const { id, title, type, url, thumbnail, description, tags } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    const db = await getDb();

    const updateData: any = {};
    if (title) updateData.title = title;
    if (type) updateData.type = type;
    if (url) updateData.url = url;
    if (thumbnail !== undefined) updateData.thumbnail = thumbnail;
    if (description !== undefined) updateData.description = description;
    if (tags) updateData.tags = tags;

    const result = await db.collection("contentProduction").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Content not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Content updated successfully"
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[CONTENT PRODUCTION PUT]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ─────────────────────────────
   DELETE CONTENT PRODUCTION
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

    const result = await db.collection("contentProduction").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Content not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Content deleted successfully"
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[CONTENT PRODUCTION DELETE]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
