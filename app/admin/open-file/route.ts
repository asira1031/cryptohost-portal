import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json({ error: "No file path" }, { status: 400 });
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 🔒 admin only
  if (!user || user.email !== "jans103174@gmail.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data } = await supabase.storage
    .from("client-files")
    .createSignedUrl(path, 60);

  if (!data?.signedUrl) {
    return NextResponse.json({ error: "Cannot open file" }, { status: 500 });
  }

  return NextResponse.redirect(data.signedUrl);
}