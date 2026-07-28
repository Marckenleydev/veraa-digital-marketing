import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
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
   LOGIN USER
───────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const body: LoginRequest = await req.json();

    const { email, password, remember } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Find user by email
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Incorrect email or password" },
        { status: 401 }
      );
    }

    // Compare password with hashed password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Incorrect email or password" },
        { status: 401 }
      );
    }

    // Create a simple session token (in production, use JWT or proper session management)
    const sessionToken = Buffer.from(`${user._id}:${Date.now()}`).toString('base64');

    // Set session cookie
    const response = NextResponse.json(
      { 
        success: true, 
        user: { 
          id: user._id.toString(), 
          email: user.email, 
          name: user.name 
        }
      },
      { status: 200 }
    );

    // Set cookie with session token
    response.cookies.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 days if remember, else 1 day
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("[AUTH LOGIN]", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
