// app/page.tsx - Updated Homepage for Panthers Football Academy
// Changes: 
// - Latest News: Added horizontal sliding animation (infinite carousel using Framer Motion + CSS keyframes for smooth loop).
// - Table (Last 5 Matches): Modernized with striped rows, gradient headers, better spacing, hover glow, and responsive design.
// Retained vibrant navy-gold theme, placeholders, and football essentials.
"use client"
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Trophy, Newspaper, Users, Play, MapPin, Phone, Mail, Facebook, Instagram, Youtube, ChevronLeft, ChevronRight } from 'lucide-react';
import Footer from './component/footer';
import Header from './component/header';
import { useRef } from 'react';

// Mock data - Replace with API/CMS
const recentMatch = {
  date: 'Nov 12, 2025',
  opponent: 'Valiant FC',
  score: '2-1',
  result: 'Win',
  highlights: '/highlights/recent.jpg', // Placeholder
};

const upcomingFixtures = [
  { date: 'Nov 15, 2025', opponent: 'Dakkada FC (A)', time: '7:00 PM' },
  { date: 'Nov 18, 2025', opponent: 'Team X (H)', time: '4:00 PM' },
];

const latestNews = [
  {
    id: 1,
    title: 'Panthers Academy Secures Thrilling Victory in TCC League MD9',
    date: 'Nov 12, 2025',
    excerpt: 'Our young lions roared to a 2-1 win against Valiant FC, climbing to 2nd in the standings.',
    image: '/image1.jpg',
    slug: 'tcc-md9-victory',
  },
  {
    id: 2,
    title: 'Academy Accredited as Junior Secondary School – A New Era Begins',
    date: 'Nov 8, 2025',
    excerpt: 'Integrating elite training with academics to nurture complete athletes.',
    image: '/image2.jpg',
    slug: 'accreditation-milestone',
  },
  {
    id: 3,
    title: 'Player Spotlight: Rising Star Signs Pro Contract',
    date: 'Nov 10, 2025',
    excerpt: '18-year-old midfielder joins European club after standout season.',
    image: '/image2.jpg',
    slug: 'pro-contract-signing',
  },
  // Duplicate for seamless loop in carousel
    {
      id: 4,
      title: 'Panthers Academy Secures Thrilling Victory in TCC League MD9',
      date: 'Nov 12, 2025',
      excerpt: 'Our young lions roared to a 2-1 win against Valiant FC, climbing to 2nd in the standings.',
      image: '/image2.jpg',
      slug: 'tcc-md9-victory',
    },
  
];

const ourPlayers = [
  {
    id: 1,
    name: 'John Doe',
    position: 'Forward',
    goals: 8,
    image: '/image2.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    position: 'Midfielder',
    assists: 5,
    image: '/image2.jpg',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    position: 'Defender',
    tackles: 12,
    image: '/image2.jpg',
  },
];

const last5Matches = [
  { date: 'Nov 12', opponent: 'Valiant FC', score: '2-1', result: 'W' },
  { date: 'Nov 9', opponent: 'Team B', score: '1-1', result: 'D' },
  { date: 'Nov 5', opponent: 'Team C', score: '3-0', result: 'W' },
  { date: 'Nov 2', opponent: 'Team D', score: '0-2', result: 'L' },
  { date: 'Oct 29', opponent: 'Team E', score: '4-1', result: 'W' },
];

const highlights = [
  {
    id: 1,
    title: 'MD9 Goal Fest vs Valiant FC',
    thumbnail: 'https://via.placeholder.com/400x225?text=Highlight+1',
    videoId: 'abc123',
  },
  {
    id: 2,
    title: 'Training Montage: Panther Pride',
    thumbnail: 'https://via.placeholder.com/400x225?text=Highlight+2',
    videoId: 'def456',
  },
];

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };
  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-amber-900 text-white relative overflow-x-hidden">
      {/* Header */}
      <Header/>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/groupphoto.jpg" // Placeholder - Replace with your image
          alt="Panthers Academy Hero"
          fill
          className="object-cover brightness-50"
          priority
        />
        <motion.div
          className="text-center z-10 px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
            Panthers Football Academy
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 opacity-90">
            Unleashing the Roar: Nurturing Africa's Fiercest Talents Since 2022
          </p>
          <motion.button
            className="bg-amber-500 hover:bg-amber-600 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-amber-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join the Pride
          </motion.button>
        </motion.div>
      </section>

      {/* 1. Recent Match Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-amber-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Calendar className="inline mr-2" /> Recent Match
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-amber-500/20"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-bold mb-4">{recentMatch.opponent}</h3>
            <p className="text-4xl font-black text-amber-400 mb-2">{recentMatch.score}</p>
            <p className="text-lg mb-4">Final Score</p>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              recentMatch.result === 'Win' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
            }`}>
              {recentMatch.result}
            </span>
          </motion.div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Upcoming Fixtures</h4>
            <ul className="space-y-2">
              {upcomingFixtures.map((fixture, i) => (
                <li key={i} className="flex justify-between text-sm opacity-80">
                  <span>{fixture.date} - {fixture.opponent}</span>
                  <span>{fixture.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link href="/matches" className="bg-amber-500 hover:bg-amber-600 px-6 py-3 rounded-full font-semibold transition">
            View More Matches
          </Link>
        </div>
      </section>

      {/* 2. Latest News Section - Sliding Animation Carousel */}
{/* 2. Latest News Section - Sliding Animation Carousel */}
<section className="relative py-16 px-6 bg-white/5 scrollbar-none">
      <h2 className="text-3xl font-bold text-center mb-12 text-amber-400">
        <Newspaper className="inline mr-2" /> Latest News
      </h2>

      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-slate-900/70 hover:bg-slate-900 p-3 rounded-full shadow-lg text-white"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-slate-900/70 hover:bg-slate-900 p-3 rounded-full shadow-lg text-white"
      >
        <ChevronRight size={24} />
      </button>

      {/* Scroll Container */}
      <div ref={scrollRef} className=" whitespace-nowrap scroll-smooth no-scrollbar ">
        <motion.div
          className="inline-flex gap-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 50, repeat: Infinity }}
        >
          {latestNews.map((article) => (
            <div
              key={article.id}
              className="inline-block w-80 bg-white/10 rounded-xl overflow-hidden border border-amber-500/20"
            >
              <Image
                src={article.image}
                alt={article.title}
                width={320}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold mb-2 text-sm leading-tight">{article.title}</h3>
                <p className="text-xs opacity-80 mb-4">{article.excerpt}</p>
                <p className="text-xs opacity-70 mb-4">{article.date}</p>
                <Link
                  href={`/news/${article.slug}`}
                  className="text-amber-400 text-xs font-semibold hover:text-amber-300 transition"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

      {/* 3. Our Players Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-amber-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Users className="inline mr-2" /> Our Players
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {ourPlayers.map((player, i) => (
            <motion.div
              key={player.id}
              className="text-center bg-white/10 rounded-xl p-6 border border-amber-500/20"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Image src={player.image} alt={player.name} width={300} height={400} className="w-full h-64 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-bold mb-2">{player.name}</h3>
              <p className="text-amber-400 mb-2">{player.position}</p>
              <p className="text-sm opacity-80">Goals: {player.goals || 'N/A'}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/players" className="bg-amber-500 hover:bg-amber-600 px-6 py-3 rounded-full font-semibold transition">
            View All Players
          </Link>
        </div>
      </section>

      {/* 4. League Table (Last 5 Matches) Section - Modernized Design */}
      <section className="py-16 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-amber-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Trophy className="inline mr-2" /> Last 5 Matches
          </motion.h2>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-amber-500/20 shadow-lg">
            <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 border-b border-amber-500/30">
              <table className="w-full text-sm">
                <thead>
                  <tr className="divide-x divide-amber-500/30">
                    <th className="p-4 text-left font-semibold text-white/90">Date</th>
                    <th className="p-4 text-left font-semibold text-white/90">Opponent</th>
                    <th className="p-4 text-center font-semibold text-white/90">Score</th>
                    <th className="p-4 text-center font-semibold text-white/90">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-500/10">
                  {last5Matches.map((match, i) => (
                    <motion.tr
                      key={i}
                      className={`hover:bg-amber-500/10 transition-all duration-200 ease-in-out ${
                        i % 2 === 0 ? 'bg-white/5' : 'bg-transparent'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.01, boxShadow: '0 4px 20px rgba(245, 158, 11, 0.2)' }}
                    >
                      <td className="p-4 font-medium">{match.date}</td>
                      <td className="p-4">{match.opponent}</td>
                      <td className="p-4 text-center font-bold text-amber-400">{match.score}</td>
                      <td className="p-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                          match.result === 'W' ? 'bg-green-500/20 text-green-300' :
                          match.result === 'D' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-red-500/20 text-red-300'
                        }`}>
                          {match.result}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/league" className="bg-amber-500 hover:bg-amber-600 px-6 py-3 rounded-full font-semibold transition">
              View Full League Table
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Our Highlights Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-amber-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Play className="inline mr-2" /> Our Highlights
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          {highlights.map((highlight, i) => (
            <motion.div
              key={highlight.id}
              className="relative bg-white/10 rounded-xl overflow-hidden border border-amber-500/20 group cursor-pointer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Image src={highlight.thumbnail} alt={highlight.title} fill className="object-cover group-hover:brightness-110 transition" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <Play className="w-12 h-12 text-amber-400" />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-bold">{highlight.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
        <div id="our-highlights" className="bg-gray-50 py-10 px-5 rounded-lg my-5 shadow-md">
  <h2 className="text-center text-gray-800 mb-8 font-sans">Our Highlights</h2>
  <div className="flex flex-wrap justify-around gap-5">
    <div className="flex-1 min-w-[300px] bg-white p-5 rounded-md text-center shadow-sm">
      <h3 className="text-blue-500 mb-2.5">Achievement 1</h3>
      <p>A brief description of your first highlight. This could include key metrics, dates, or impacts.</p>
    </div>
    <div className="flex-1 min-w-[300px] bg-white p-5 rounded-md text-center shadow-sm">
      <h3 className="text-blue-500 mb-2.5">Achievement 2</h3>
      <p>Details on the second highlight to showcase your successes and milestones.</p>
    </div>
    <div className="flex-1 min-w-[300px] bg-white p-5 rounded-md text-center shadow-sm">
      <h3 className="text-blue-500 mb-2.5">Achievement 3</h3>
      <p>The third highlight, highlighting innovation, growth, or unique accomplishments.</p>
    </div>
  </div>
</div>
        <div className="text-center mt-8">
          <Link href="/highlights" className="bg-amber-500 hover:bg-amber-600 px-6 py-3 rounded-full font-semibold transition">
            View More Highlights
          </Link>
        </div>
      </section>

      {/* Footer */}
    <Footer />
    </main>
  );
}