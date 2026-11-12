import Link from "next/link";
import { FiCamera, FiFilm, FiMic, FiMusic } from "react-icons/fi";
import { MdBrush } from "react-icons/md";
import { CATEGORIES } from "@/lib/constants";

const ICONS = {
  "Photo Studio": FiCamera,
  "Film Stage": FiFilm,
  "Podcast Lounge": FiMic,
  "Music Suite": FiMusic,
  Workshop: MdBrush,
};

export default function CategoriesSection() {
  return (
    <section className="section-space bg-base-100">
      <div className="container-page">
        <h2 className="section-title">Browse by studio type</h2>
        <p className="section-subtitle">
          Pick the kind of space you need and we will show only matching studios.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((category) => {
            const Icon = ICONS[category.value];

            return (
              <Link
                key={category.value}
                href={`/studios?category=${encodeURIComponent(category.value)}`}
                className="group flex h-full flex-col rounded-2xl border border-base-300 bg-base-200 p-6 transition-colors hover:border-primary hover:bg-primary hover:text-primary-content"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-content group-hover:bg-primary-content group-hover:text-primary">
                  <Icon size={24} />
                </span>
                <h3 className="mt-5 text-lg font-bold">{category.label}</h3>
                <p className="mt-2 text-sm opacity-75">{category.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
