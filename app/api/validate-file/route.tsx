import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { fileId } = await req.json();

  await supabase
    .from("uploaded_files")
    .update({
      validation_status: "in_progress",
    })
    .eq("id", fileId);

  setTimeout(async () => {
    await supabase
      .from("uploaded_files")
      .update({
        validation_status: "validated",
      })
      .eq("id", fileId);
  }, 4000);

  return NextResponse.json({ success: true });
}