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
    const { fullName, email, password, companyName, walletAddress } = body;

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: "Full name, email, and password are required." },
        { status: 400 }
      );
    }

    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "clients.json");

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let clients: ClientRecord[] = [];

    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      clients = fileData ? JSON.parse(fileData) : [];
    }

    const alreadyExists = clients.find(
      (client) => client.email.toLowerCase() === email.toLowerCase()
    );

    if (alreadyExists) {
      return NextResponse.json(
        { error: "Email already registered." },
        { status: 409 }
      );
    }

    const newClient: ClientRecord = {
      fullName,
      email,
      password,
      companyName,
      walletAddress,
      createdAt: new Date().toISOString(),
    };

    clients.push(newClient);
    fs.writeFileSync(filePath, JSON.stringify(clients, null, 2));

    return NextResponse.json({
      success: true,
      message: "Client registered successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error during registration." },
      { status: 500 }
    );
  }
}