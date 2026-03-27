import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file received." },
        { status: 400 }
      );
    }

    // 👉 TEMP: just simulate upload success (SAFE TEST)
    console.log("Received file:", file.name);

    return NextResponse.json({
      message: "File uploaded successfully.",
      fileName: file.name,
    });

  } catch (error) {
    console.error("Upload error:", error);

    return NextResponse.json(
      { error: "Upload failed." },
      { status: 500 }
    );
  }
}