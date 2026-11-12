"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import PrivateRoute from "@/components/PrivateRoute";
import StudioForm from "@/components/StudioForm";
import { RowsSkeleton } from "@/components/Loaders";

function EditStudioContent() {
  const { id } = useParams();
  const { data } = useSession();
  const router = useRouter();
  const [studio, setStudio] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api(`/studios/${id}`)
      .then((found) => {
        if (found.ownerEmail !== data.user.email) {
          toast.error("You can only edit your own studios");
          router.replace("/my-listings");
          return;
        }
        setStudio(found);
      })
      .catch((error) => {
        toast.error(error.message);
        router.replace("/my-listings");
      });
  }, [id, data.user.email, router]);

  async function handleSubmit(values) {
    setSubmitting(true);

    try {
      await api(`/studios/${id}`, { method: "PUT", body: values, auth: true });
      toast.success("Studio updated successfully");
      router.push("/my-listings");
    } catch (error) {
      toast.error(error.message);
      setSubmitting(false);
    }
  }

  return (
    <div className="container-page max-w-4xl py-10 md:py-14">
      <h1 className="section-title">Update studio</h1>
      <p className="section-subtitle">Change any detail and save to update your listing.</p>
      <div className="mt-8">
        {studio ? (
          <StudioForm
            initial={studio}
            user={{ name: studio.ownerName, email: studio.ownerEmail }}
            onSubmit={handleSubmit}
            submitting={submitting}
            submitLabel="Save changes"
          />
        ) : (
          <RowsSkeleton rows={5} />
        )}
      </div>
    </div>
  );
}

export default function EditStudioPage() {
  return (
    <PrivateRoute>
      <EditStudioContent />
    </PrivateRoute>
  );
}
