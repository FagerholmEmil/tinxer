"use client";
import { Button } from "@/components/ui/button";
import { createClientBrowser } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useUser } from "./useUser";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
    <div className="flex flex-col items-center justify-center flex-grow">
      <Card className="max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold mb-4">Sign in</h1>
        </CardHeader>
        <CardContent>
          <Button onClick={handleSubmit}>
            Login with Github
            <GitHubLogoIcon className="ml-2 h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
