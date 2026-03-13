import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type ClientRecord = {
  fullName: string;
  email: string;
  password: string;
  companyName?: string;
  walletAddress?: string;
  createdAt: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "data", "clients.json");

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "No registered clients found." },
        { status: 404 }
      );
    }

    const fileData = fs.readFileSync(filePath, "utf-8");
    const clients: ClientRecord[] = fileData ? JSON.parse(fileData) : [];

    const client = clients.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password
    );

    if (!client) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Login successful.",
      client: {
        fullName: client.fullName,
        email: client.email,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error during login." },
      { status: 500 }
    );
  }
}
