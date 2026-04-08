import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const formData = await req.formData();
    const fileId = formData.get("fileId")?.toString();

    if (!fileId) {
      return NextResponse.redirect(new URL("/dashboard/my-files", req.url));
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Missing Supabase environment variables");
      return NextResponse.redirect(new URL("/dashboard/my-files", req.url));
    }

    const adminSupabase = createAdminClient(supabaseUrl, serviceRoleKey);

    // First verify that the file really belongs to the logged-in user
    const { data: file, error: fileError } = await adminSupabase
      .from("uploaded_files")
      .select("*")
      .eq("id", fileId)
      .eq("user_id", user.id)
      .single();

    console.log("DELETE file lookup:", { file, fileError });

    if (fileError || !file) {
      console.error("File not found or not owned by user");
      return NextResponse.redirect(new URL("/dashboard/my-files", req.url));
    }

    // Try deleting physical file from storage
    if (file.file_path) {
      const { error: storageError } = await adminSupabase.storage
        .from("client-files")
        .remove([file.file_path]);

      console.log("DELETE storage result:", storageError);
    }

    // Delete DB record using admin client
    const { error: deleteDbError } = await adminSupabase
      .from("uploaded_files")
      .delete()
      .eq("id", fileId)
      .eq("user_id", user.id);

    console.log("DELETE db result:", deleteDbError);

    return NextResponse.redirect(new URL("/dashboard/my-files", req.url));
  } catch (error) {
    console.error("DELETE ROUTE ERROR:", error);
    return NextResponse.redirect(new URL("/dashboard/my-files", req.url));
  }
}