import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase admin environment variables.");
  }

  return createClient(url, key);
}

export async function GET() {
  try {
    const supabase = getAdminClient();

    const { data, error } = await supabase
      .from("deposits")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ ok: true, deposits: data ?? [] });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message || "Failed to load deposits." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const supabase = getAdminClient();
    const body = await req.json();

    const id = body.id as string | undefined;
    const status = body.status as string | undefined;
    const note = body.note as string | undefined;

    if (!id) {
      return NextResponse.json(
        { ok: false, error: "Deposit ID is required." },
        { status: 400 }
      );
    }

    if (!status) {
      return NextResponse.json(
        { ok: false, error: "Status is required." },
        { status: 400 }
      );
    }

    const allowed = ["Pending", "Credited", "Rejected"];
    if (!allowed.includes(status)) {
      return NextResponse.json(
        { ok: false, error: "Invalid status." },
        { status: 400 }
      );
    }

    const updatePayload: Record<string, any> = {
      status,
    };

    if (typeof note === "string") {
      updatePayload.note = note;
    }

    const { data, error } = await supabase
      .from("deposits")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ ok: true, deposit: data });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message || "Failed to update deposit." },
      { status: 500 }
    );
  }
}