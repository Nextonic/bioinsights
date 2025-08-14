"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { name: "home", href: "/" },
  { name: "how it works", href: "/how-it-works" },
  { name: "use cases", href: "/use-cases" },
  { name: "data sets", href: "/datasets" },
  { name: "examples", href: "/example-queries" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="bg-black text-white border-b border-white/10">
      {/* top bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <span
              className="h-8 w-8 rounded-xl"
              style={{
                background:
                  "linear-gradient(135deg, var(--ns-primary, #0A66FF), var(--ns-accent, #00E0FF))",
              }}
              aria-hidden
            />
            <span className="text-base font-semibold tracking-wide">Bioinsights</span>
          </Link>
        </div>

        {/* desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`capitalize transition-colors ${
                isActive(link.href)
                  ? "text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

      
        {/* mobile menu button */}
        <button
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg hover:bg-white/10"
          aria-label="toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            className="h-5 w-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur">
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block w-full px-3 py-2 rounded-lg capitalize ${
                      isActive(link.href)
                        ? "bg-white/10 text-white"
                        : "text-white/85 hover:bg-white/5 hover:text-white"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="mt-2 flex gap-2">
                <Link
                  href="/contact"
                  className="flex-1 h-10 rounded-lg border border-white/20 text-center leading-10 text-white/90 hover:text-white hover:bg-white/5 transition-colors text-sm"
                  onClick={() => setOpen(false)}
                >
                  contact
                </Link>
                <Link
                  href="/results"
                  className="flex-1 h-10 rounded-lg text-center leading-10 text-sm font-medium text-white"
                  style={{ background: "var(--ns-primary, #0A66FF)" }}
                  onClick={() => setOpen(false)}
                >
                  try it
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* subtle sub-bar (optional) */}
      <div className="hidden lg:block border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between text-xs text-white/60">
         
         
        </div>
      </div>
    </header>
  );
}
