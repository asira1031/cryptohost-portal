import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";

export default async function SetupPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 🔒 Not logged in
  if (!user) {
    redirect("/login");
  }

  // ✅ Get profile safely
  const { data: profile } = await supabase
    .from("clients")
    .select("profile_completed")
    .eq("id", user.id)
    .single();

  // 🔒 If not completed → stay here (NO redirect loop)
  if (profile?.profile_completed) {
    redirect("/dashboard");
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Complete Your Profile</h1>
      <p>Please finish your setup before accessing the dashboard.</p>
    </div>
  );
}