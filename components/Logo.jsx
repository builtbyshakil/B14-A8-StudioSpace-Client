import Link from "next/link";
import { TbAperture } from "react-icons/tb";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-content">
        <TbAperture size={22} />
      </span>
      <span className="font-display text-xl font-extrabold text-base-content">
        StudioSpace
      </span>
    </Link>
  );
}
