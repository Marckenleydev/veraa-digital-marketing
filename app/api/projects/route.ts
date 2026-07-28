import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

// Project interface
interface Project {
  id?: string;
  title: string;
  sub: string;
  cat: string;
  year: string;
  tags: string[];
  desc: string;
  bg: string;
  acc: string;
  challenge: string;
  solution: string;
  results: string[];
  services: string[];
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
// POST - Create project
//
export async function POST(req: NextRequest) {
  try {
    const body: Project = await req.json();

    const {
      title,
      sub,
      cat,
      year,
      desc,
      bg,
      acc,
      challenge,
      solution,
    } = body;

    if (!title || !sub || !cat || !year || !desc) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = await getDb();

    const result = await db.collection("projects").insertOne({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, id: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (err) {
    console.error("[projects/POST]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

//
// GET - Fetch all projects
//
export async function GET() {
  try {
    const db = await getDb();

    const projects = await db
      .collection("projects")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ projects }, { status: 200 });
  } catch (err) {
    console.error("[projects/GET]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

//
// PUT - Update project
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
       
           const result = await db.collection("projects").updateOne(
             { _id: new ObjectId(id) },
             { $set: updateData }
           );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[projects/PUT]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

//
// DELETE - Remove project
//
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    const db = await getDb();

    const result = await db
      .collection("projects")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[projects/DELETE]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}