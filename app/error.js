"use client";

import Link from "next/link";

export default function Error({ reset }) {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-extrabold">Something went wrong</h1>
      <p className="mt-3 max-w-md text-base-content/70">
        This page hit an unexpected problem. Try again, or go back to the home page.
      </p>
      <div className="mt-6 flex gap-3">
        <button type="button" onClick={reset} className="btn btn-primary">
          Try again
        </button>
        <Link href="/" className="btn btn-outline">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
