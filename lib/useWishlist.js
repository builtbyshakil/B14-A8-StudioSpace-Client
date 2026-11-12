"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "./auth-client";
import { api } from "./api";

export default function useWishlist() {
  const { data } = useSession();
  const router = useRouter();
  const [savedIds, setSavedIds] = useState([]);
  const email = data?.user?.email;

  useEffect(() => {
    if (!email) {
      setSavedIds([]);
      return;
    }

    api("/wishlist/ids", { auth: true })
      .then(setSavedIds)
      .catch(() => setSavedIds([]));
  }, [email]);

  async function toggleSaved(studioId) {
    if (!data) {
      toast.error("Please login to save studios");
      router.push("/login");
      return;
    }

    try {
      const result = await api(`/wishlist/${studioId}`, {
        method: "POST",
        auth: true,
      });

      setSavedIds((current) =>
        result.saved
          ? [...current, studioId]
          : current.filter((id) => id !== studioId)
      );

      toast.success(
        result.saved ? "Saved to your wishlist" : "Removed from your wishlist"
      );
    } catch (error) {
      toast.error(error.message);
    }
  }

  return { savedIds, toggleSaved };
}
