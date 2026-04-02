import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { listUserSftpFiles } from "@/app/lib/sftp/listUserSftpFiles";

export const dynamic = "force-dynamic";

function getMimeType(filename: string) {
  const lower = filename.toLowerCase();

  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".doc")) return "application/msword";
  if (lower.endsWith(".docx")) {
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }
  if (lower.endsWith(".xls")) return "application/vnd.ms-excel";
  if (lower.endsWith(".xlsx")) {
    return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  }
  if (lower.endsWith(".txt")) return "text/plain";
  if (lower.endsWith(".json")) return "application/json";
  if (lower.endsWith(".csv")) return "text/csv";
  if (lower.endsWith(".zip")) return "application/zip";

  return "application/octet-stream";
}

function getAdminSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase admin environment variables.");
  }

  return createAdminClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function POST() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          ok: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const admin = getAdminSupabase();

    const remoteFiles = await listUserSftpFiles(user.id);

    if (!remoteFiles.length) {
      return NextResponse.json({
        ok: true,
        inserted: 0,
        skipped: 0,
        files: [],
      });
    }

    const remotePaths = remoteFiles.map((file) => `sftp:${file.path}`);

    const { data: existingRows, error: existingError } = await admin
      .from("uploaded_files")
      .select("file_path")
      .eq("user_id", user.id)
      .in("file_path", remotePaths);

    if (existingError) {
      throw existingError;
    }

    const existingSet = new Set(
      (existingRows || []).map((row) => row.file_path)
    );

    const rowsToInsert = remoteFiles
      .filter((file) => !existingSet.has(`sftp:${file.path}`))
      .map((file) => ({
        user_id: user.id,
        file_name: file.name,
        file_path: `sftp:${file.path}`,
        file_size: file.size,
        mime_type: getMimeType(file.name),
        status: "uploaded",
      }));

    let inserted = 0;

    if (rowsToInsert.length > 0) {
      const { error: insertError } = await admin
        .from("uploaded_files")
        .insert(rowsToInsert);

      if (insertError) {
        throw insertError;
      }

      inserted = rowsToInsert.length;
    }

    return NextResponse.json({
      ok: true,
      inserted,
      skipped: remoteFiles.length - inserted,
      files: remoteFiles,
    });
  } catch (error: any) {
    console.error("SFTP sync route error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: error?.message || "SFTP sync failed",
      },
      { status: 500 }
    );
  }
}