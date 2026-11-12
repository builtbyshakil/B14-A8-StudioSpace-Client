"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import PrivateRoute from "@/components/PrivateRoute";
import StudioForm from "@/components/StudioForm";

function AddStudioContent() {
  const { data } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(values) {
    setSubmitting(true);

    try {
      await api("/studios", { method: "POST", body: values, auth: true });
      toast.success("Your studio is now listed");
      router.push("/my-listings");
    } catch (error) {
      toast.error(error.message);
      setSubmitting(false);
    }
  }

  return (
    <div className="container-page max-w-4xl py-10 md:py-14">
      <h1 className="section-title">Add a new studio</h1>
      <p className="section-subtitle">
        Share the details creators need to book your space with confidence.
      </p>
      <div className="mt-8">
        <StudioForm
          user={data.user}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitLabel="List my studio"
        />
      </div>
    </div>
  );
}

export default function AddStudioPage() {
  return (
    <PrivateRoute>
      <AddStudioContent />
    </PrivateRoute>
  );
}
