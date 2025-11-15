// app/highlights/page.tsx - Video Highlights Page for Panthers Football Academy
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Video, Clock, Calendar, ChevronRight, Trophy } from 'lucide-react';
import Header from '../component/header';
import Footer from '../component/footer';

interface Highlight {
  id: number;
  title: string;
  videoUrl: string;
  duration: string;
  date: string;
  views: number;
  category: string;
}

export default function HighlightsPage() {
  const highlights: Highlight[] = [
    {
      id: 1,
      title: 'MD9 Goal Fest vs Valiant FC',
      videoUrl: 'https://www.youtube.com/embed/GYb3oEzlVXo?si=DuMADHKXLrcU71gr', // Replace with actual embed URL
      duration: '3:45',
      date: 'Nov 12, 2025',
      views: 12500,
      category: 'Match Highlights'
    },
    {
      id: 2,
      title: 'Training Montage: Panther Pride',
      videoUrl: 'https://www.youtube.com/embed/GYb3oEzlVXo?si=DuMADHKXLrcU71gr',
      duration: '2:30',
      date: 'Nov 10, 2025',
      views: 8900,
      category: 'Training'
    },
    {
      id: 3,
      title: 'Rising Star Skills Showcase',
      videoUrl: 'https://www.youtube.com/embed/GYb3oEzlVXo?si=DuMADHKXLrcU71gr',
      duration: '4:20',
      date: 'Nov 8, 2025',
      views: 21000,
      category: 'Player Spotlight'
    },
    {
      id: 4,
      title: 'Academy vs Rivals: Full Match Recap',
      videoUrl: 'https://www.youtube.com/embed/GYb3oEzlVXo?si=DuMADHKXLrcU71gr',
      duration: '6:15',
      date: 'Nov 5, 2025',
      views: 34000,
      category: 'Match Highlights'
    },
    {
      id: 5,
      title: 'Defensive Masterclass Training',
      videoUrl: 'https://www.youtube.com/embed/GYb3oEzlVXo?si=DuMADHKXLrcU71gr',
      duration: '1:55',
      date: 'Nov 3, 2025',
      views: 6700,
      category: 'Training'
    },
    {
      id: 6,
      title: 'Goal of the Month: Epic Strike',
      videoUrl: 'https://www.youtube.com/embed/GYb3oEzlVXo?si=DuMADHKXLrcU71gr',
      duration: '0:45',
      date: 'Oct 30, 2025',
      views: 45000,
      category: 'Awards'
    }
  ];

  const categories = [...new Set(highlights.map(h => h.category))];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-amber-900 text-white relative">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/groupphoto4.jpg" // Placeholder for highlights hero image
            alt="Panthers Academy Highlights"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <motion.div
            className="relative z-10 text-center px-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-6 bg-black/50 backdrop-blur-md px-6 py-3 rounded-full border border-amber-500/30"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Video className="w-6 h-6 text-amber-400" />
              <span className="text-amber-300 font-bold uppercase tracking-wide">Unmissable Moments</span>
            </motion.div>
            <motion.h1
              className="text-5xl md:text-7xl font-black mb-6 leading-tight bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 bg-clip-text text-transparent drop-shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Video Highlights
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Relive the magic: Epic goals, stunning saves, and unforgettable training sessions from Panthers Academy.
            </motion.p>
          </motion.div>
        </section>

        {/* Categories Filter */}
        <section className="py-12 px-6 max-w-6xl mx-auto">
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="#all"
              className="px-6 py-3 bg-amber-500/20 text-amber-300 font-semibold rounded-full hover:bg-amber-500/30 transition"
            >
              All Videos ({highlights.length})
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`#${cat.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-6 py-3 bg-white/10 text-gray-300 font-semibold rounded-full hover:bg-amber-500/20 hover:text-amber-300 transition"
              >
                {cat} ({highlights.filter(h => h.category === cat).length})
              </Link>
            ))}
          </motion.div>
        </section>

        {/* Highlights Grid */}
        <section className="px-6 pb-20 max-w-7xl mx-auto">
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
          >
            {highlights.map((highlight, idx) => (
              <motion.div
                key={highlight.id}
                className="group bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden shadow-xl hover:shadow-amber-500/30 transition-all duration-500 border border-amber-500/10 hover:border-amber-400/30"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <div className="relative h-96 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <iframe
                    src={highlight.videoUrl}
                    className="w-full h-full rounded-t-3xl"
                    allowFullScreen
                    title={highlight.title}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-12 h-12 text-amber-400 absolute -top-6 -right-4" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-amber-300 transition-colors line-clamp-2">
                    {highlight.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{highlight.date}</span>
                    <Clock className="w-4 h-4" />
                    <span>{highlight.duration}</span>
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span>{highlight.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{highlight.views.toLocaleString()} views</span>
                  </div>
                  <Link
                    href={`/highlights/${highlight.id}`}
                    className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-amber-500/20 text-amber-300 font-semibold rounded-full hover:bg-amber-500/30 transition-all duration-300"
                  >
                    Watch Now <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 text-center bg-black/20">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
              More Action Awaits
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Subscribe for exclusive highlights, behind-the-scenes footage, and player interviews.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/subscribe"
                className="bg-amber-500 hover:bg-amber-600 px-10 py-4 rounded-full text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-amber-500/25"
               
              >
                Subscribe Now
              </Link>
              <Link
                href="/contact"
                className="border-2 border-amber-500 hover:bg-amber-500 text-amber-400 hover:text-slate-900 px-10 py-4 rounded-full text-xl font-bold transition-all duration-300"
              
              
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}