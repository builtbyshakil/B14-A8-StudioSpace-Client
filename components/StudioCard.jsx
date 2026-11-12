import Link from "next/link";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import StudioImage from "./StudioImage";

export function RatingBadge({ rating }) {
  if (!rating) {
    return <span className="badge badge-ghost shrink-0">New</span>;
  }

  return (
    <span className="badge badge-secondary shrink-0 gap-1 font-bold">
      <FaStar size={11} />
      {Number(rating).toFixed(1)}
    </span>
  );
}

export default function StudioCard({ studio, saved = false, onToggleSaved }) {
  return (
    <div className="card-surface flex h-full flex-col overflow-hidden">
      <div className="relative h-52 w-full">
        <StudioImage
          src={studio.image}
          alt={studio.title}
          className="h-full w-full"
        />
        <span className="badge badge-primary absolute left-3 top-3">
          {studio.category}
        </span>
        <button
          type="button"
          onClick={() => onToggleSaved(studio._id)}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-base-100 text-error shadow"
        >
          {saved ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-lg font-bold">{studio.title}</h3>
          <RatingBadge rating={studio.rating} />
        </div>

        <p className="mt-2 flex items-center gap-1 text-sm text-base-content/70">
          <FiMapPin className="shrink-0" />
          <span className="line-clamp-1">{studio.location}</span>
        </p>

        <div className="mt-auto flex items-center justify-between pt-5">
          <p>
            <span className="text-xl font-extrabold text-primary">
              ${studio.hourlyRate}
            </span>
            <span className="text-sm text-base-content/60"> / hr</span>
          </p>
          <Link href={`/studios/${studio._id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
