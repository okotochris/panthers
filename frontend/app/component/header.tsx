"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "News", href: "/news" },
    { name: "Highlights", href: "/highlights" },
    { name: "Players", href: "/players" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-lg">
      <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-3">
          <motion.img
            src="/groupphoto.jpg"
            alt="Panthers Logo"
            className="w-12 h-12 rounded-full border border-amber-500 shadow-md object-cover"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
          <motion.h1
            className="text-xl md:text-2xl font-extrabold text-amber-400 tracking-wide uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Panthers FA
          </motion.h1>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item, i) => (
            <motion.li
              key={item.name}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={item.href}
                className="relative group text-white/90 hover:text-amber-400 transition"
              >
                {item.name}
                <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Button */}
        <button
          className="md:hidden text-amber-400"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/5 shadow-xl"
          >
            <ul className="flex flex-col p-6 gap-4 font-medium">
              {navItems.map((item) => (
                <motion.li
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <Link
                    href={item.href}
                    className="block py-3 text-white/90 hover:text-amber-400 transition"
                    onClick={() => setOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
