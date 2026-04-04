import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = `${user.id}/${Date.now()}-${file.name}`;

    // Upload to Supabase storage
    const { error: uploadError } = await supabase.storage
      .from("client-files")
      .upload(filePath, buffer, {
        contentType: file.type,
      });

    if (uploadError) {
      throw uploadError;
    }

    // Save record to database
    const { error: insertError } = await supabase
      .from("uploaded_files")
      .insert({
        user_id: user.id,
        file_name: file.name,
        file_path: filePath,
        file_size: file.size,
        mime_type: file.type,
        status: "uploaded",
      });

    if (insertError) {
      throw insertError;
    }

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
    });
  } catch (error: any) {
    console.error("Upload error:", error);

    return NextResponse.json(
      {
        error: error.message || "Upload failed",
      },
      { status: 500 }
    );
  }
}