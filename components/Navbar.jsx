"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiMenu, FiX } from "react-icons/fi";
import { authClient, useSession } from "@/lib/auth-client";
import { clearToken } from "@/lib/api";
import Logo from "./Logo";
import Avatar from "./Avatar";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
];

const MENU_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/add-studio", label: "Add New Studio" },
  { href: "/my-listings", label: "My Studio Listings" },
  { href: "/my-bookings", label: "My Bookings" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data, isPending } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  function isActive(href) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  async function handleLogout() {
    await authClient.signOut();
    await clearToken();
    toast.success("You have been logged out");
    setMenuOpen(false);
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 text-sm font-semibold transition-colors ${
                isActive(link.href)
                  ? "text-primary after:absolute after:inset-x-4 after:-bottom-[13px] after:h-0.5 after:bg-primary"
                  : "text-base-content/70 hover:text-base-content"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isPending ? (
            <div className="skeleton h-10 w-10 rounded-full" />
          ) : data ? (
            <div className="dropdown dropdown-hover dropdown-end">
              <div tabIndex={0} role="button" className="cursor-pointer">
                <Avatar src={data.user.image} name={data.user.name} size={40} />
              </div>
              <div
                tabIndex={0}
                className="dropdown-content z-50 w-64 rounded-xl border border-base-300 bg-base-100 p-2 shadow-xl"
              >
                <div className="border-b border-base-300 px-3 py-3">
                  <p className="font-bold">{data.user.name}</p>
                  <p className="truncate text-sm text-base-content/60">
                    {data.user.email}
                  </p>
                </div>
                <ul className="py-2">
                  {MENU_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-base-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-error hover:bg-base-200"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link href="/login" className="btn btn-ghost btn-sm">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </div>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            className="btn btn-ghost btn-circle lg:hidden"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-base-300 bg-base-100 lg:hidden">
          <nav className="container-page flex flex-col py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-3 font-semibold ${
                  isActive(link.href) ? "bg-primary/10 text-primary" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            {!isPending && !data && (
              <div className="mt-3 flex gap-3 sm:hidden">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-outline flex-1"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-primary flex-1"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
