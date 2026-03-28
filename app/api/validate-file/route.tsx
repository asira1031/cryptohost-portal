import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { fileId } = await req.json();

  // STEP 1: set to in_progress
  await supabase
    .from("uploaded_files")
    .update({
      validation_status: "in_progress",
    })
    .eq("id", fileId);

  // STEP 2: simulate processing delay
  setTimeout(async () => {
    await supabase
      .from("uploaded_files")
      .update({
        validation_status: "validated",
      })
      .eq("id", fileId);
  }, 4000); // 4 seconds

  return NextResponse.json({ success: true });
}