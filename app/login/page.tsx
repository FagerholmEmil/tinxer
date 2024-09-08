import { createClient } from "@/utils/supabase/server";

export default function Login() {
  const supabase = createClient();
  supabase.auth.signUp({ email: "test@test.com", password: "12345678" });

  return;
}
