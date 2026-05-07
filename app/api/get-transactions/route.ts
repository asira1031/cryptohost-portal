import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  const updatedData = data.map((row) => {
    const createdAt = new Date(row.created_at).getTime();
    const now = Date.now();
    const hoursPassed = (now - createdAt) / (1000 * 60 * 60);

    if (hoursPassed >= 72) {
      row.status = "INVALID_PROTOCOL_CODE";
      row.result = "Invalid Protocol Code";
    }

    return row;
  });

  return NextResponse.json(updatedData);
}