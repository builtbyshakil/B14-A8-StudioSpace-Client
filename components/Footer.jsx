"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { CATEGORIES } from "@/lib/constants";
import Logo from "./Logo";

const SOCIAL_LINKS = [
  { label: "X", href: "https://x.com", icon: FaXTwitter },
  { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { label: "YouTube", href: "https://youtube.com", icon: FaYoutube },
  { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedinIn },
];

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
  { href: "/add-studio", label: "Host Your Space" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  function handleSubscribe(event) {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    toast.success("You are subscribed. Watch your inbox for new studios.");
    setEmail("");
  }

  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-base-content/70">
            StudioSpace helps creators rent photo studios, sound stages,
            podcast rooms and workshops by the hour, and helps hosts earn from
            spaces that would otherwise sit empty.
          </p>
          <div className="mt-5 flex gap-2">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-base-300 text-base-content/80 hover:border-primary hover:text-primary"
              >
                <social.icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold">Quick links</h4>
          <ul className="mt-4 space-y-2 text-sm text-base-content/70">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold">Popular categories</h4>
          <ul className="mt-4 space-y-2 text-sm text-base-content/70">
            {CATEGORIES.map((category) => (
              <li key={category.value}>
                <Link
                  href={`/studios?category=${encodeURIComponent(category.value)}`}
                  className="hover:text-primary"
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold">Newsletter</h4>
          <p className="mt-4 text-sm text-base-content/70">
            Get new studio listings and booking tips once a month.
          </p>
          <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-primary">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-base-300">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-sm text-base-content/60 sm:flex-row">
          <p>© {new Date().getFullYear()} StudioSpace. All rights reserved.</p>
          <p>
  By using StudioSpace you agree to our{" "}
  <Link href="/terms" className="underline hover:text-primary">
    Terms of Service
  </Link>{" "}
  and{" "}
  <Link href="/privacy" className="underline hover:text-primary">
    Privacy Policy
  </Link>
  .
</p>
        </div>
      </div>
    </footer>
  );
}
