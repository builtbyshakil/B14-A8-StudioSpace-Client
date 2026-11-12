"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiEdit2, FiPlus, FiTrash2, FiCamera } from "react-icons/fi";
import { api } from "@/lib/api";
import { money } from "@/lib/format";
import ConfirmModal from "@/components/ConfirmModal";
import EmptyState from "@/components/EmptyState";
import { RowsSkeleton } from "@/components/Loaders";
import PrivateRoute from "@/components/PrivateRoute";
import StudioImage from "@/components/StudioImage";
import { RatingBadge } from "@/components/StudioCard";

function MyListingsContent() {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    api("/studios/mine", { auth: true })
      .then(setStudios)
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, []);

  async function confirmDelete() {
    setDeleting(true);

    try {
      await api(`/studios/${toDelete._id}`, { method: "DELETE", auth: true });
      setStudios((current) => current.filter((studio) => studio._id !== toDelete._id));
      toast.success("Studio deleted successfully");
      setToDelete(null);
    } catch (error) {
      toast.error(error.message);
    }

    setDeleting(false);
  }

  return (
    <div className="container-page py-10 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="section-title">My studio listings</h1>
          <p className="section-subtitle">Update or remove the spaces you host.</p>
        </div>
        <Link href="/add-studio" className="btn btn-primary">
          <FiPlus />
          Add new studio
        </Link>
      </div>

      <div className="mt-8">
        {loading ? (
          <RowsSkeleton />
        ) : studios.length === 0 ? (
          <EmptyState
            icon={<FiCamera size={28} />}
            title="You have not listed any studios yet"
            text="List your first space and start receiving booking requests from creators."
          >
            <Link href="/add-studio" className="btn btn-primary">
              Add your first studio
            </Link>
          </EmptyState>
        ) : (
          <div className="card-surface overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Studio</th>
                  <th>Category</th>
                  <th>Rate</th>
                  <th>Location</th>
                  <th>Rating</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {studios.map((studio) => (
                  <tr key={studio._id}>
                    <td>
                      <div className="flex min-w-56 items-center gap-3">
                        <StudioImage
                          src={studio.image}
                          alt={studio.title}
                          className="h-14 w-20 shrink-0 rounded-lg"
                        />
                        <Link
                          href={`/studios/${studio._id}`}
                          className="font-bold hover:text-primary"
                        >
                          {studio.title}
                        </Link>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-primary badge-outline whitespace-nowrap">
                        {studio.category}
                      </span>
                    </td>
                    <td className="whitespace-nowrap font-semibold">
                      {money(studio.hourlyRate)} / hr
                    </td>
                    <td className="min-w-40">{studio.location}</td>
                    <td>
                      <RatingBadge rating={studio.rating} />
                    </td>
                    <td>
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/studios/edit/${studio._id}`}
                          className="btn btn-outline btn-sm"
                        >
                          <FiEdit2 />
                          Update
                        </Link>
                        <button
                          type="button"
                          onClick={() => setToDelete(studio)}
                          className="btn btn-error btn-outline btn-sm"
                        >
                          <FiTrash2 />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {toDelete && (
        <ConfirmModal
          title="Delete this studio?"
          message={`"${toDelete.title}" will be removed permanently and creators will no longer be able to book it.`}
          confirmText="Yes, delete studio"
          loading={deleting}
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </div>
  );
}

export default function MyListingsPage() {
  return (
    <PrivateRoute>
      <MyListingsContent />
    </PrivateRoute>
  );
}
