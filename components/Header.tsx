"use client";

import { useState, useEffect } from "react";
import { storeInfo } from "@/data/store";
import { HeadingFont } from "@/lib/fonts";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#", label: "Beranda" },
    { href: "#menu", label: "Menu" },
    { href: "#tentang", label: "Tentang" },
    { href: "#kontak", label: "Kontak" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-stone-200/60"
          : "bg-white/70 backdrop-blur-md"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span
              className={`${HeadingFont.className} text-2xl md:text-3xl text-rose-700 group-hover:text-rose-600 transition-colors`}
            >
              {storeInfo.name}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Navigasi utama"
          >
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="relative block px-4 py-2 text-sm font-medium text-stone-600 hover:text-rose-700 transition-colors rounded-lg hover:bg-rose-50"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#menu"
              className="ml-3 px-5 py-2 text-sm font-semibold text-white bg-rose-700 hover:bg-rose-800 rounded-full transition-[background-color,box-shadow] hover:shadow-lg hover:shadow-rose-200"
            >
              Pesan Sekarang
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-stone-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-[color,background-color]"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-[max-height,opacity,visibility] duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-80 opacity-100 pb-4 visible"
              : "max-h-0 opacity-0 invisible"
          }`}
        >
          <nav
            className="flex flex-col gap-1 pt-2 border-t border-stone-100"
            aria-label="Navigasi seluler"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2.5 px-3 text-stone-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors font-medium text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#menu"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 py-2.5 px-3 text-center text-white bg-rose-700 hover:bg-rose-800 rounded-xl font-semibold text-sm transition-colors"
            >
              Pesan Sekarang
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
