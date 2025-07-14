// src/app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { getAuth, signInWithEmailAndPassword, setPersistence, sendPasswordResetEmail, browserLocalPersistence } from "firebase/auth";
//import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  try {
    await setPersistence(auth, browserLocalPersistence);
    await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("adminEmail", email); // helpful for audit trails
    router.push("/admin/applications");
  } catch (err: any) {
    setError(err.message || "Login failed");
  }
};

  const handleLogini1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/applications");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  const handleResetPassword = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email to reset password");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Please check your inbox.");
    } catch (err: any) {
      setError(err.message || "Error sending reset email");
    }
  };

  return (
    <main className="max-w-md mx-auto py-20 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <button
        onClick={handleResetPassword}
        className="mt-4 text-sm text-blue-600 hover:underline"
      >
        Forgot password?
      </button>

      {error && <p className="mt-4 text-red-600 text-sm text-center">{error}</p>}
      {message && <p className="mt-4 text-green-600 text-sm text-center">{message}</p>}
    </main>
  );
}
