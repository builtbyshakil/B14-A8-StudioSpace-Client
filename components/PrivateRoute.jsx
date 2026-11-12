"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { PageSpinner } from "./Loaders";

export default function PrivateRoute({ children }) {
  const { data, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !data) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, data, pathname, router]);

  if (isPending || !data) {
    return <PageSpinner label="Checking your session" />;
  }

  return children;
}
