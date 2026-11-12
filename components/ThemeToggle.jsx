"use client";

import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeToggle() {
  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "studiodark" ? "studiolight" : "studiodark";
    document.documentElement.setAttribute("data-theme", next);

    try {
      localStorage.setItem("studiospace-theme", next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Switch between light and dark theme"
      className="btn btn-ghost btn-circle"
    >
      <FiMoon size={20} className="block [[data-theme=studiodark]_&]:hidden" />
      <FiSun size={20} className="hidden [[data-theme=studiodark]_&]:block" />
    </button>
  );
}
