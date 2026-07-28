import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

// Work interface
interface Work {
  id?: string;
  title: string;
  sub: string;
  year: string;
  tags: string[];
  desc: string;
  bg: string;
  acc: string;
  link?: string;
  createdAt?: Date;
}

// MongoDB singleton
let client: MongoClient | null = null;

async function getDb() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
  }

  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
  }

  return client.db(process.env.MONGODB_DB ?? "codeveraa");
}

//
// POST - Create work
//
export async function POST(req: NextRequest) {
  try {
    const body: Work = await req.json();

    const { title, sub, year, desc, bg, acc } = body;

    if (!title || !sub || !year || !desc) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = await getDb();

    const result = await db.collection("works").insertOne({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, id: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (err) {
    console.error("[works/POST]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

//
// GET - Fetch all works
//
export async function GET() {
  try {
    const db = await getDb();

    const works = await db
      .collection("works")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ works }, { status: 200 });
  } catch (err) {
    console.error("[works/GET]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

//
// PUT - Update work
//
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
       
           const result = await db.collection("works").updateOne(
             { _id: new ObjectId(id) },
             { $set: updateData }
           );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Work not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[works/PUT]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

//
// DELETE - Remove work
//
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Work ID is required" },
        { status: 400 }
      );
    }

    const db = await getDb();

    const result = await db
      .collection("works")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Work not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[works/DELETE]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}