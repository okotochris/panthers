"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-amber-500/20">
      <nav className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/groupphoto.jpg"
            alt="Panthers Logo"
            className="w-10 h-10 rounded-full object-cover border border-amber-500"
          />
          <h1 className="text-xl md:text-2xl font-bold text-amber-400">
            Panthers FA
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-sm font-medium">
          {["Home", "News", "Fixtures", "Players", "About"].map((item) => (
            <li key={item}>
              <Link
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="hover:text-amber-400 transition-colors duration-200"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-amber-400"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-slate-900/95 border-t border-amber-500/20 backdrop-blur-md">
          <ul className="flex flex-col space-y-4 p-6 text-sm font-medium">
            {["Home", "News", "Fixtures", "Players", "About"].map((item) => (
              <li key={item}>
                <Link
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="block hover:text-amber-400 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
