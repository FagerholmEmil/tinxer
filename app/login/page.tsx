"use client";
import { Button } from "@/components/ui/button";
import { createClientBrowser } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const useUser = () => {
  const supabase = createClientBrowser();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });
  }, [supabase.auth]);

  return user;
};

export default function Login() {
  const supabase = createClientBrowser();

  const handleSubmit = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (data.url) {
      redirect(data.url); // use the redirect API for your server framework
    }
  };

  const user = useUser();

  return (
    <div>
      <Button onClick={handleSubmit}>Login with Github</Button>
    </div>
  );
}
