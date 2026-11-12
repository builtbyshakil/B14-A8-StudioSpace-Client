"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
import { FiCheck, FiMapPin, FiSearch, FiUsers } from "react-icons/fi";
import { api } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import { money } from "@/lib/format";
import Avatar from "@/components/Avatar";
import BookingModal from "@/components/BookingModal";
import EmptyState from "@/components/EmptyState";
import { DetailsSkeleton } from "@/components/Loaders";
import StudioImage from "@/components/StudioImage";
import { RatingBadge } from "@/components/StudioCard";

export default function StudioDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [studio, setStudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    api(`/studios/${id}`)
      .then(setStudio)
      .catch(() => setMissing(true))
      .finally(() => setLoading(false));
  }, [id]);

  function handleBookClick() {
    if (!session) {
      toast.error("Please login to book this workspace");
      router.push(`/login?redirect=${encodeURIComponent(`/studios/${id}`)}`);
      return;
    }

    if (session.user.email === studio.ownerEmail) {
      toast.error("You cannot book your own studio");
      return;
    }

    setBookingOpen(true);
  }

  if (loading) return <DetailsSkeleton />;

  if (missing || !studio) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={<FiSearch size={28} />}
          title="Studio not found"
          text="This studio may have been removed or the link is incorrect."
        >
          <Link href="/studios" className="btn btn-primary">
            Explore studios
          </Link>
        </EmptyState>
      </div>
    );
  }

  const gallery = studio.gallery?.length ? studio.gallery : [studio.image];
  const reviews = studio.reviews || [];

  return (
    <div className="container-page py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="badge badge-primary">{studio.category}</span>
          <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">{studio.title}</h1>
          <p className="mt-2 flex items-center gap-1 text-base-content/70">
            <FiMapPin />
            {studio.location}
          </p>
        </div>
        <RatingBadge rating={studio.rating} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-base-300">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              className="h-80 md:h-[26rem]"
            >
              {gallery.map((image, index) => (
                <SwiperSlide key={image + index}>
                  <StudioImage
                    src={image}
                    alt={`${studio.title} photo ${index + 1}`}
                    className="h-full w-full"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <section className="card-surface p-6">
            <h2 className="text-2xl font-bold">Overview</h2>
            <p className="mt-3 whitespace-pre-line text-base-content/80">{studio.overview}</p>
          </section>

          <section className="card-surface p-6">
            <h2 className="text-2xl font-bold">Amenities</h2>
            {studio.amenities?.length ? (
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {studio.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success/15 text-success">
                      <FiCheck size={14} />
                    </span>
                    {amenity}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-base-content/70">The host has not listed any amenities.</p>
            )}
          </section>

          <section className="card-surface p-6">
            <h2 className="text-2xl font-bold">Reviews</h2>
            {reviews.length === 0 ? (
              <p className="mt-3 text-base-content/70">
                No reviews yet. Be the first creator to book this space.
              </p>
            ) : (
              <ul className="mt-4 space-y-5">
                {reviews.map((review, index) => (
                  <li key={index} className="flex gap-4">
                    <Avatar name={review.name} size={44} />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-bold">{review.name}</p>
                        <span className="flex items-center gap-1 text-sm font-semibold text-secondary">
                          <FaStar size={12} />
                          {review.rating}
                        </span>
                      </div>
                      <p className="mt-1 text-base-content/80">{review.comment}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="card-surface p-6">
            <p>
              <span className="text-3xl font-extrabold text-primary">
                {money(studio.hourlyRate)}
              </span>
              <span className="text-base-content/60"> / hr</span>
            </p>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-base-content/70">Security deposit</dt>
                <dd className="font-semibold">{money(studio.securityDeposit)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="flex items-center gap-1 text-base-content/70">
                  <FiUsers /> Max capacity
                </dt>
                <dd className="font-semibold">{studio.maxCapacity} people</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={handleBookClick}
              className="btn btn-primary mt-6 w-full"
            >
              Book Workspace Now
            </button>
          </div>

          <div className="card-surface p-6">
            <h2 className="text-lg font-bold">Hosted by</h2>
            <div className="mt-4 flex items-center gap-3">
              <Avatar src={studio.ownerImage} name={studio.ownerName} size={52} />
              <div className="min-w-0">
                <p className="font-bold">{studio.ownerName}</p>
                <p className="truncate text-sm text-base-content/70">{studio.ownerEmail}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {bookingOpen && (
        <BookingModal studio={studio} onClose={() => setBookingOpen(false)} />
      )}
    </div>
  );
}
