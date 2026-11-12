"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiCamera } from "react-icons/fi";
import { api } from "@/lib/api";
import useWishlist from "@/lib/useWishlist";
import StudioCard from "./StudioCard";
import EmptyState from "./EmptyState";
import { StudioGridSkeleton } from "./Loaders";

export default function FeaturedStudios() {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const { savedIds, toggleSaved } = useWishlist();

  useEffect(() => {
    api("/studios/featured")
      .then(setStudios)
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-space">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="section-title">Featured studios</h2>
            <p className="section-subtitle">
              Top-rated spaces that creators keep coming back to.
            </p>
          </div>
          <Link href="/studios" className="btn btn-outline">
            View all studios
          </Link>
        </div>

        <div className="mt-10">
          {loading ? (
            <StudioGridSkeleton />
          ) : studios.length === 0 ? (
            <EmptyState
              icon={<FiCamera size={28} />}
              title="No studios listed yet"
              text="Be the first host to list a creative space on StudioSpace."
            >
              <Link href="/add-studio" className="btn btn-primary">
                Add a studio
              </Link>
            </EmptyState>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {studios.map((studio) => (
                <StudioCard
                  key={studio._id}
                  studio={studio}
                  saved={savedIds.includes(studio._id)}
                  onToggleSaved={toggleSaved}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
