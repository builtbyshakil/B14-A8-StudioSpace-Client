"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import AuthShell, { GoogleButton } from "./AuthShell";

function safeRedirect(value) {
  if (value && value.startsWith("/") && !value.startsWith("//")) return value;
  return "/";
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = safeRedirect(searchParams.get("redirect"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await signIn.email({ email, password });

    if (signInError) {
      const message = signInError.message || "Invalid email or password";
      setError(message);
      toast.error(message);
      setLoading(false);
      return;
    }

    toast.success("Welcome back to StudioSpace");
    router.replace(redirect);
  }

  async function handleGoogle() {
    await signIn.social({ provider: "google", callbackURL: redirect });
  }

  return (
    <AuthShell title="Login" subtitle="Welcome back. Login to book and manage studios.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="input input-bordered w-full"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Your password"
            className="input input-bordered w-full"
          />
        </label>

        <div className="text-right">
          <button
            type="button"
            onClick={() => toast("Password reset is coming soon")}
            className="text-sm font-semibold text-primary hover:underline"
          >
            Forgot password?
          </button>
        </div>

        {error && (
          <p role="alert" className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : null}
          Login
        </button>
      </form>

      <div className="divider my-6">or</div>

      <GoogleButton onClick={handleGoogle} disabled={loading} label="Continue with Google" />

      <p className="mt-6 text-center text-sm text-base-content/70">
        New to StudioSpace?{" "}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
