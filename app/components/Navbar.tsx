"use client";
import { createClientBrowser } from "@/utils/supabase/client";
import { useUser } from "@/app/login/useUser";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  const user = useUser();
  const supabase = createClientBrowser();

  return (
    <div className="flex items-center justify-between w-full h-16 px-4 py-2 bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <img src="/logo.png" alt="logo" className="h-8 w-8" />
        <h1 className="text-xl font-bold">Tinxer</h1>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <Button onClick={() => supabase.auth.signOut()}>Sign out</Button>
        ) : (
          <Link href="/login" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
}
