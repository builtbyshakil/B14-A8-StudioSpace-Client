"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiCalendar, FiDownload } from "react-icons/fi";
import { api } from "@/lib/api";
import { STATUS_BADGES } from "@/lib/constants";
import { formatDate, formatTime, money } from "@/lib/format";
import { downloadInvoice } from "@/lib/invoice";
import ConfirmModal from "@/components/ConfirmModal";
import EmptyState from "@/components/EmptyState";
import { RowsSkeleton } from "@/components/Loaders";
import PrivateRoute from "@/components/PrivateRoute";
import StudioImage from "@/components/StudioImage";

function MyBookingsContent() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toCancel, setToCancel] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    api("/bookings/mine", { auth: true })
      .then(setBookings)
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, []);

  async function confirmCancel() {
    setCancelling(true);

    try {
      await api(`/bookings/${toCancel._id}/cancel`, { method: "PATCH", auth: true });
      setBookings((current) =>
        current.map((booking) =>
          booking._id === toCancel._id ? { ...booking, status: "Cancelled" } : booking
        )
      );
      toast.success("Booking cancelled");
      setToCancel(null);
    } catch (error) {
      toast.error(error.message);
    }

    setCancelling(false);
  }

  async function handleInvoice(booking) {
    try {
      await downloadInvoice(booking);
      toast.success("Invoice downloaded");
    } catch {
      toast.error("Could not create the invoice. Please try again.");
    }
  }

  return (
    <div className="container-page py-10 md:py-14">
      <h1 className="section-title">My bookings</h1>
      <p className="section-subtitle">Track every studio you have booked.</p>

      <div className="mt-8">
        {loading ? (
          <RowsSkeleton />
        ) : bookings.length === 0 ? (
          <EmptyState
            icon={<FiCalendar size={28} />}
            title="You have no bookings yet"
            text="Find a studio that fits your next project and book your hours."
          >
            <Link href="/studios" className="btn btn-primary">
              Explore studios
            </Link>
          </EmptyState>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="card-surface flex flex-col gap-4 p-4 md:flex-row md:items-center"
              >
                <StudioImage
                  src={booking.studioImage}
                  alt={booking.studioTitle}
                  className="h-32 w-full shrink-0 rounded-xl md:w-48"
                />

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-bold">{booking.studioTitle}</h2>
                    <span className={`badge ${STATUS_BADGES[booking.status]}`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-base-content/70">{booking.location}</p>
                  <p className="mt-3 text-sm">
                    <span className="font-semibold">{formatDate(booking.date)}</span>,{" "}
                    {formatTime(booking.startTime)} to {formatTime(booking.endTime)} (
                    {booking.hours} {booking.hours === 1 ? "hour" : "hours"})
                  </p>
                  <p className="mt-1 text-sm text-base-content/70">
                    Rent {money(booking.totalPrice)} + refundable deposit{" "}
                    {money(booking.securityDeposit)}
                  </p>
                </div>

                <div className="flex gap-2 md:flex-col">
                  {booking.status === "Pending" && (
                    <button
                      type="button"
                      onClick={() => setToCancel(booking)}
                      className="btn btn-error btn-outline btn-sm"
                    >
                      Cancel Booking
                    </button>
                  )}
                  {(booking.status === "Confirmed" || booking.status === "Completed") && (
                    <button
                      type="button"
                      onClick={() => handleInvoice(booking)}
                      className="btn btn-outline btn-sm"
                    >
                      <FiDownload />
                      Invoice PDF
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {toCancel && (
        <ConfirmModal
          title="Cancel this booking?"
          message={`Your pending booking for "${toCancel.studioTitle}" on ${formatDate(toCancel.date)} will be cancelled.`}
          confirmText="Yes, cancel booking"
          loading={cancelling}
          onConfirm={confirmCancel}
          onCancel={() => setToCancel(null)}
        />
      )}
    </div>
  );
}

export default function MyBookingsPage() {
  return (
    <PrivateRoute>
      <MyBookingsContent />
    </PrivateRoute>
  );
}
