// src/app/auth/callback/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient();

  const [newPassword, setNewPassword] = useState("");
  const [isRecovery, setIsRecovery] = useState(false);
  const [message, setMessage] = useState("");
  const [errorDescription, setErrorDescription] = useState<string | null>(null);

  useEffect(() => {
  const handleAuth = async () => {
    const code = searchParams.get("code");
    const errorDesc = searchParams.get("error_description");
    const type = searchParams.get("type");

    if (errorDesc) {
      setErrorDescription(decodeURIComponent(errorDesc));
      return;
    }

    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        console.error("Session exchange failed:", error.message);
        setErrorDescription("Failed to sign in. Please try again.");
        return;
      }
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      if (type === "recovery") {
        setIsRecovery(true);
      } else {
        router.push("/admin/applications");
      }
    }
  };

  handleAuth();
}, [searchParams, supabase, router]);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Password updated. Redirecting...");
      setTimeout(() => router.push("/admin/applications"), 1500);
    }
  };

  if (errorDescription) {
    return (
      <main className="text-center py-20">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700">{errorDescription}</p>
      </main>
    );
  }

  if (isRecovery) {
    return (
      <main className="max-w-md mx-auto py-20">
        <h2 className="text-xl font-semibold mb-4">Set a New Password</h2>
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Update Password
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </main>
    );
  }

  return (
    <main className="text-center py-20">
      <h2 className="text-xl">Finishing sign in...</h2>
    </main>
  );
}
