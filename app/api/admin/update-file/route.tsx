import { createClient } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { fileId, clientId, action } = await req.json();
  const supabase = await createClient();

  let updateData: any = {};

  if (action === "under_validation") {
    updateData = {
      status: "under_validation",
      transaction_status: "Under Validation",
      validation_result: "File is currently under validation.",
    };
  }

  if (action === "validated") {
    updateData = {
      status: "validated",
      transaction_status: "Validated",
      validation_result: "File successfully validated.",
    };
  }

  if (action === "hold") {
    updateData = {
      status: "on_hold",
      transaction_status: "On Hold",
      validation_result: "This file is on hold.",
    };
  }

  if (action === "push") {
    updateData = {
      transaction_status: "Result Available",
    };
  }

  await supabase
    .from("uploaded_files")
    .update(updateData)
    .eq("id", fileId)
    .eq("user_id", clientId);

  return NextResponse.json({ success: true });
}