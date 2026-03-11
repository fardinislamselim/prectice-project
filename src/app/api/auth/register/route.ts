import connectDb from "@/lib/db";
import User from "@/model/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // guard against malformed JSON early
  let name: string, email: string, password: string;
  try {
    const body = await request.json();
    ({ name, email, password } = body);
    
    // validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields: name, email, password" },
        { status: 400 },
      );
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { message: "Invalid JSON in request body", error: msg },
      { status: 400 },
    );
  }
  try {
    await connectDb();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          message: "User already exists!",
        },
        { status: 400 },
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long!" },
        { status: 400 },
      );
    }

    const hasedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hasedPassword,
    });
    return NextResponse.json(
      { user, message: "User created successfully!" },
      { status: 201 },
    );
  } catch (error: unknown) {
    // Serialize the error so clients see something useful.
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    return NextResponse.json(
      { message: "An error occurred", error: message, stack },
      { status: 500 },
    );
  }
}
