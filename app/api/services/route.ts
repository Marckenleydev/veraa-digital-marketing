import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

// Service interface
interface Service {
  n: string;
  icon: string;
  title: string;
  tagline: string;
  desc: string;
  features: string[];
  tech: string[];
  tiers: { n: string; p: string; d: string }[];
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
// POST - Create service
//
export async function POST(req: NextRequest) {
  try {
    const body: Service = await req.json();

    const {
      n,
      icon,
      title,
      tagline,
      desc,
      features,
      tech,
      tiers,
    } = body;

    if (!n || !icon || !title || !tagline || !desc) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = await getDb();

    const result = await db.collection("services").insertOne({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, id: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (err) {
    console.error("[services/POST]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

//
// GET - Fetch all services
//
export async function GET() {
  try {
    const db = await getDb();

    const services = await db
      .collection("services")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ services }, { status: 200 });
  } catch (err) {
    console.error("[services/GET]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

//
// PUT - Update service
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
   
       const result = await db.collection("services").updateOne(
         { _id: new ObjectId(id) },
         { $set: updateData }
       );

    if (!id) {
      return NextResponse.json(
        { error: "Service ID is required" },
        { status: 400 }
      );
    }

  

    

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[services/PUT]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

//
// DELETE - Remove service
//
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Service ID is required" },
        { status: 400 }
      );
    }

    const db = await getDb();

    const result = await db
      .collection("services")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[services/DELETE]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}