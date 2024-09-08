"use client";
import { createClientBrowser } from "@/utils/supabase/client";
import { User } from "@supabase/auth-js";
import { useState, useEffect } from "react";

export const useUser = () => {
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
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, [supabase.auth]);

  return user;
};
