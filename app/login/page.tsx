import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";

export default function Login() {
  const supabase = createClient();
  supabase.auth.signUp({ email: "test@test.com", password: "12345678" });

  return (
    <form>
      <Input type="email" placeholder="test@test.com" />
      <Input type="password" placeholder="12345678" />
    </form>
  );
}
