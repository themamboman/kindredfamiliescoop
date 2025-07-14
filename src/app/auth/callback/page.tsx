// src/app/auth/callback/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthCallbackPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [newPassword, setNewPassword] = useState("");
  const [isRecovery, setIsRecovery] = useState(false);
  const [message, setMessage] = useState("");
  const [errorDescription, setErrorDescription] = useState<string | null>(null);

  useEffect(() => {
    const checkRecovery = async () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.slice(1));

      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");
      const type = params.get("type");
      const errorDesc = params.get("error_description");

      console.log("Auth callback params:", {
        access_token,
        refresh_token,
        type,
        errorDesc,
      });

      if (errorDesc) {
        setErrorDescription(decodeURIComponent(errorDesc));
        return;
      }

      if (access_token && refresh_token) {
        try {
          const { error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });

          if (error) {
            console.error("Session restore error:", error);
            setErrorDescription("Failed to restore session.");
            return;
          }

          if (type === "recovery") {
            setIsRecovery(true);
            return; // Stop here — let user reset password
          }

          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (session?.user) {
            router.push("/admin/applications");
          }
        } catch (err) {
          console.error("Unexpected error setting session:", err);
          setErrorDescription("Unexpected error.");
        }
      }
    };

    checkRecovery();
  }, [router, supabase]);

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
