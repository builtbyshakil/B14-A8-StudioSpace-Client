"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiInbox } from "react-icons/fi";
import { api } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import { STATUS_BADGES } from "@/lib/constants";
import { formatDate, formatTime, money } from "@/lib/format";
import EmptyState from "@/components/EmptyState";
import { RowsSkeleton } from "@/components/Loaders";
import PrivateRoute from "@/components/PrivateRoute";

function StatCard({ label, value }) {
  return (
    <div className="card-surface p-5">
      <p className="text-sm text-base-content/70">{label}</p>
      <p className="mt-2 text-3xl font-extrabold text-primary">{value}</p>
    </div>
  );
}

function DashboardContent() {
  const { data } = useSession();
  const [studios, setStudios] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");

  useEffect(() => {
    Promise.all([
      api("/studios/mine", { auth: true }),
      api("/bookings/mine", { auth: true }),
      api("/bookings/requests", { auth: true }),
    ])
      .then(([studioList, bookingList, requestList]) => {
        setStudios(studioList);
        setMyBookings(bookingList);
        setRequests(requestList);
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, []);

  async function changeStatus(booking, status) {
    setBusyId(booking._id);

    try {
      const result = await api(`/bookings/${booking._id}/status`, {
        method: "PATCH",
        auth: true,
        body: { status },
      });
      setRequests((current) =>
        current.map((item) => (item._id === booking._id ? { ...item, status } : item))
      );
      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
    }

    setBusyId("");
  }

  const pendingCount = requests.filter((item) => item.status === "Pending").length;
  const confirmedCount = requests.filter((item) => item.status === "Confirmed").length;

  return (
    <div className="container-page py-10 md:py-14">
      <h1 className="section-title">Hello, {data.user.name}</h1>
      <p className="section-subtitle">
        Here is what is happening with your studios and bookings.
      </p>

      {loading ? (
        <div className="mt-8">
          <RowsSkeleton />
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Studios you host" value={studios.length} />
            <StatCard label="Requests waiting for you" value={pendingCount} />
            <StatCard label="Confirmed guest bookings" value={confirmedCount} />
            <StatCard label="Studios you booked" value={myBookings.length} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/add-studio" className="btn btn-primary btn-sm">
              Add New Studio
            </Link>
            <Link href="/my-listings" className="btn btn-outline btn-sm">
              My Studio Listings
            </Link>
            <Link href="/my-bookings" className="btn btn-outline btn-sm">
              My Bookings
            </Link>
          </div>

          <h2 className="mt-12 text-2xl font-bold">Booking requests for your studios</h2>

          <div className="mt-5">
            {requests.length === 0 ? (
              <EmptyState
                icon={<FiInbox size={28} />}
                title="No booking requests yet"
                text="When creators book your studios, their requests will appear here for you to confirm."
              >
                <Link href="/my-listings" className="btn btn-primary">
                  View my listings
                </Link>
              </EmptyState>
            ) : (
              <div className="card-surface overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Guest</th>
                      <th>Studio</th>
                      <th>When</th>
                      <th>Rent</th>
                      <th>Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((booking) => (
                      <tr key={booking._id}>
                        <td className="min-w-44">
                          <p className="font-bold">{booking.userName}</p>
                          <p className="text-sm text-base-content/70">{booking.userEmail}</p>
                        </td>
                        <td className="min-w-40">{booking.studioTitle}</td>
                        <td className="min-w-44">
                          <p>{formatDate(booking.date)}</p>
                          <p className="text-sm text-base-content/70">
                            {formatTime(booking.startTime)} to {formatTime(booking.endTime)}
                          </p>
                        </td>
                        <td className="font-semibold">{money(booking.totalPrice)}</td>
                        <td>
                          <span className={`badge ${STATUS_BADGES[booking.status]}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td>
                          <div className="flex justify-end gap-2">
                            {booking.status === "Pending" && (
                              <>
                                <button
                                  type="button"
                                  disabled={busyId === booking._id}
                                  onClick={() => changeStatus(booking, "Confirmed")}
                                  className="btn btn-success btn-sm"
                                >
                                  Confirm
                                </button>
                                <button
                                  type="button"
                                  disabled={busyId === booking._id}
                                  onClick={() => changeStatus(booking, "Cancelled")}
                                  className="btn btn-error btn-outline btn-sm"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            {booking.status === "Confirmed" && (
                              <>
                                <button
                                  type="button"
                                  disabled={busyId === booking._id}
                                  onClick={() => changeStatus(booking, "Completed")}
                                  className="btn btn-info btn-sm"
                                >
                                  Mark completed
                                </button>
                                <button
                                  type="button"
                                  disabled={busyId === booking._id}
                                  onClick={() => changeStatus(booking, "Cancelled")}
                                  className="btn btn-error btn-outline btn-sm"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <DashboardContent />
    </PrivateRoute>
  );
}
