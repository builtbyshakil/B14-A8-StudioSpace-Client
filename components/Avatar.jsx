"use client";

import { useState } from "react";

export default function Avatar({ src, name, size = 40 }) {
  const [broken, setBroken] = useState(false);
  const initial = (name || "?").trim().charAt(0).toUpperCase();
  const boxStyle = { width: size, height: size };

  if (!src || broken) {
    return (
      <span
        style={boxStyle}
        className="flex shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-content"
      >
        {initial}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={name || "User avatar"}
      style={boxStyle}
      referrerPolicy="no-referrer"
      onError={() => setBroken(true)}
      className="shrink-0 rounded-full object-cover"
    />
  );
}
