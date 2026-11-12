"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn, signUp } from "@/lib/auth-client";
import AuthShell, { GoogleButton } from "./AuthShell";

function checkPassword(password) {
  if (password.length < 6) return "Password must be at least 6 characters long";
  if (!/[A-Z]/.test(password)) return "Password must have at least one uppercase letter";
  if (!/[a-z]/.test(password)) return "Password must have at least one lowercase letter";
  return "";
}

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  function handlePasswordChange(event) {
    const value = event.target.value;
    setPassword(value);
    setPasswordError(value ? checkPassword(value) : "");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const problem = checkPassword(password);
    if (problem) {
      setPasswordError(problem);
      toast.error(problem);
      return;
    }

    setLoading(true);

    const { error } = await signUp.email({
      name,
      email,
      password,
      image: photoUrl.trim() || undefined,
    });

    if (error) {
      toast.error(error.message || "Registration failed. Please try again.");
      setLoading(false);
      return;
    }

    toast.success("Account created. Please login to continue.");
    router.push("/login");
  }

  async function handleGoogle() {
    await signIn.social({ provider: "google", callbackURL: "/" });
  }

  return (
    <AuthShell title="Create your account" subtitle="Join StudioSpace to book studios or host your own.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Name</span>
          <input
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your full name"
            className="input input-bordered w-full"
          />
        </label>

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
          <span className="mb-1 block text-sm font-semibold">Photo URL</span>
          <input
            type="url"
            value={photoUrl}
            onChange={(event) => setPhotoUrl(event.target.value)}
            placeholder="https://example.com/your-photo.jpg"
            className="input input-bordered w-full"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={handlePasswordChange}
            placeholder="Uppercase, lowercase and 6+ characters"
            className={`input input-bordered w-full ${passwordError ? "input-error" : ""}`}
          />
          {passwordError && (
            <span role="alert" className="mt-1 block text-sm text-error">
              {passwordError}
            </span>
          )}
        </label>

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : null}
          Register
        </button>
      </form>

      <div className="divider my-6">or</div>

      <GoogleButton onClick={handleGoogle} disabled={loading} label="Sign up with Google" />

      <p className="mt-6 text-center text-sm text-base-content/70">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Login
        </Link>
      </p>
    </AuthShell>
  );
}
