"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FiSearch } from "react-icons/fi";
import { api } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import { CATEGORIES } from "@/lib/constants";
import useWishlist from "@/lib/useWishlist";
import StudioCard from "./StudioCard";
import EmptyState from "./EmptyState";
import { StudioGridSkeleton } from "./Loaders";

export default function StudiosExplorer() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category") || "All";

  const [category, setCategory] = useState(urlCategory);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [savedOnly, setSavedOnly] = useState(false);
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const { savedIds, toggleSaved } = useWishlist();

  useEffect(() => {
    setCategory(urlCategory);
  }, [urlCategory]);

  useEffect(() => {
    const timer = setTimeout(() => setQuery(search.trim()), 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams();
    if (category !== "All") params.set("category", category);
    if (query) params.set("search", query);
    params.set("sort", sort);

    api(`/studios?${params.toString()}`)
      .then(setStudios)
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, [category, query, sort]);

  const visibleStudios = savedOnly
    ? studios.filter((studio) => savedIds.includes(studio._id))
    : studios;

  function clearFilters() {
    setCategory("All");
    setSearch("");
    setQuery("");
    setSort("newest");
    setSavedOnly(false);
  }

  return (
    <div className="container-page py-10 md:py-14">
      <h1 className="section-title">Explore studios</h1>
      <p className="section-subtitle">
        Search creative spaces by name or location, then filter by type.
      </p>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row">
        <label className="input input-bordered flex flex-1 items-center gap-2">
          <FiSearch className="text-base-content/60" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by studio name or location"
            className="grow"
          />
        </label>

        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          aria-label="Sort studios"
          className="select select-bordered w-full lg:w-60"
        >
          <option value="newest">Newest first</option>
          <option value="rating">Top rated</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
        </select>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setCategory("All")}
          className={`btn btn-sm ${category === "All" ? "btn-primary" : "btn-outline"}`}
        >
          All
        </button>
        {CATEGORIES.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setCategory(item.value)}
            className={`btn btn-sm ${category === item.value ? "btn-primary" : "btn-outline"}`}
          >
            {item.label}
          </button>
        ))}

        {session && (
          <label className="ml-auto flex cursor-pointer items-center gap-2 text-sm font-semibold">
            <input
              type="checkbox"
              checked={savedOnly}
              onChange={(event) => setSavedOnly(event.target.checked)}
              className="checkbox checkbox-primary checkbox-sm"
            />
            Saved only
          </label>
        )}
      </div>

      <div className="mt-8">
        {loading ? (
          <StudioGridSkeleton />
        ) : visibleStudios.length === 0 ? (
          <EmptyState
            icon={<FiSearch size={28} />}
            title="No studios match your search"
            text="Try a different keyword, pick another studio type, or clear your filters to see every space."
          >
            <button type="button" onClick={clearFilters} className="btn btn-primary">
              Clear filters
            </button>
          </EmptyState>
        ) : (
          <>
            <p className="mb-4 text-sm text-base-content/70">
              {visibleStudios.length} {visibleStudios.length === 1 ? "studio" : "studios"} found
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleStudios.map((studio) => (
                <StudioCard
                  key={studio._id}
                  studio={studio}
                  saved={savedIds.includes(studio._id)}
                  onToggleSaved={toggleSaved}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
