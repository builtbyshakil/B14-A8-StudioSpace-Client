"use client";

import { useState } from "react";
import { TbAperture } from "react-icons/tb";

export default function StudioImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center bg-linear-to-br from-primary/30 to-secondary/30 text-primary ${className}`}
      >
        <TbAperture size={48} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
