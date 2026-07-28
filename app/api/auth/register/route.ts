import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirm: string;
  agree: boolean;
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
   REGISTER USER
───────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const body: RegisterRequest = await req.json();

    const { name, email, password, confirm, agree } = body;

    // Validate required fields
    if (!name || name.length < 2) {
      return NextResponse.json(
        { message: "Name must be at least 2 characters" },
        { status: 400 }
      );
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { message: "Valid email is required" },
        { status: 400 }
      );
    }

    if (!password || password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    if (password !== confirm) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    if (!agree) {
      return NextResponse.json(
        { message: "You must agree to the terms and conditions" },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { 
        success: true, 
        id: result.insertedId,
        message: "Account created successfully" 
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[AUTH REGISTER]", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
