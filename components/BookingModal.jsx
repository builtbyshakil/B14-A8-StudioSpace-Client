"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { formatTime, hoursBetween, money, todayString } from "@/lib/format";
import Modal from "./Modal";

export default function BookingModal({ studio, onClose }) {
  const router = useRouter();
  const [date, setDate] = useState(todayString());
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("12:00");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!date) return;

    api(`/bookings/availability/${studio._id}?date=${date}`)
      .then(setBookedSlots)
      .catch(() => setBookedSlots([]));
  }, [date, studio._id]);

  const hours = hoursBetween(startTime, endTime);
  const rent = hours * studio.hourlyRate;

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (hours <= 0) {
      setError("End time must be after start time");
      return;
    }

    setSubmitting(true);

    try {
      await api("/bookings", {
        method: "POST",
        auth: true,
        body: { studioId: studio._id, date, startTime, endTime },
      });
      toast.success("Booking request sent. The host will confirm it soon.");
      onClose();
      router.push("/my-bookings");
    } catch (requestError) {
      setError(requestError.message);
      toast.error(requestError.message);
      setSubmitting(false);
    }
  }

  return (
    <Modal title="Book this workspace" onClose={onClose}>
      <p className="mb-5 text-sm text-base-content/70">{studio.title}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Date</span>
          <input
            type="date"
            required
            min={todayString()}
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="input input-bordered w-full"
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Start time</span>
            <input
              type="time"
              required
              value={startTime}
              onChange={(event) => setStartTime(event.target.value)}
              className="input input-bordered w-full"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">End time</span>
            <input
              type="time"
              required
              value={endTime}
              onChange={(event) => setEndTime(event.target.value)}
              className="input input-bordered w-full"
            />
          </label>
        </div>

        <div className="rounded-xl bg-base-200 p-4 text-sm">
          <p className="font-semibold">Already booked on this date</p>
          {bookedSlots.length === 0 ? (
            <p className="mt-1 text-base-content/70">
              No confirmed bookings yet. The whole day is open.
            </p>
          ) : (
            <ul className="mt-2 flex flex-wrap gap-2">
              {bookedSlots.map((slot) => (
                <li key={slot._id} className="badge badge-error badge-outline">
                  {formatTime(slot.startTime)} to {formatTime(slot.endTime)}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-2 rounded-xl border border-base-300 p-4 text-sm">
          <div className="flex justify-between">
            <span>
              {money(studio.hourlyRate)} x {hours} {hours === 1 ? "hour" : "hours"}
            </span>
            <span className="font-semibold">{money(rent)}</span>
          </div>
          <div className="flex justify-between">
            <span>Refundable security deposit</span>
            <span className="font-semibold">{money(studio.securityDeposit)}</span>
          </div>
          <div className="flex justify-between border-t border-base-300 pt-2 text-base font-bold">
            <span>Total due</span>
            <span className="text-primary">{money(rent + studio.securityDeposit)}</span>
          </div>
        </div>

        {error && (
          <p role="alert" className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="btn btn-ghost">
            Cancel
          </button>
          <button type="submit" disabled={submitting} className="btn btn-primary">
            {submitting ? <span className="loading loading-spinner loading-sm" /> : null}
            Send booking request
          </button>
        </div>
      </form>
    </Modal>
  );
}
