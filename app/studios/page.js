import { Suspense } from "react";
import StudiosExplorer from "@/components/StudiosExplorer";
import { StudioGridSkeleton } from "@/components/Loaders";

export const metadata = { title: "Explore Studios" };

export default function StudiosPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-14">
          <StudioGridSkeleton />
        </div>
      }
    >
      <StudiosExplorer />
    </Suspense>
  );
}
