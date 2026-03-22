import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { createAdminClient } from "../../../../lib/supabase/admin";
import { isAdminEmail } from "../../../../lib/supabase/is-admin";

const ALLOWED = ["pending", "processing", "completed"] as const;

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user || !isAdminEmail(user.email)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await context.params;
    const body = await request.json();
    const status = String(body?.status || "").toLowerCase();

    if (!ALLOWED.includes(status as (typeof ALLOWED)[number])) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const admin = createAdminClient();

    const { data, error } = await admin
      .from("uploaded_files")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, file: data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update status";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}