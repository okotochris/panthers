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
import { useRef, useState, useEffect } from 'react';

// Mock data - Replace with API/CMS
const recentMatch = {
  league: "Charmpions",
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
   {
    id: 4,
    title: 'Player Spotlight: Rising Star Signs Pro Contract',
    date: 'Nov 10, 2025',
    excerpt: '18-year-old midfielder joins European club after standout season.',
    image: '/image2.jpg',
    slug: 'pro-contract-signing',
  },
];

const ourPlayers = [
  {
    id: 1,
    name: 'John Doe',
    position: 'Forward',
    goals: 8,
    image: '/player2.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    position: 'Midfielder',
    assists: 5,
    image: '/player3.jpg',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    position: 'Defender',
    tackles: 12,
    image: '/player4.jpg',
  },
];

const last5Matches = [
  { date: 'Nov 12', opponent: 'Valiant FC', score: '2-1', logo: "/logo.png", result: 'W' },
  { date: 'Nov 9', opponent: 'Team B', score: '1-1', logo: "/logo.png", result: 'D' },
  { date: 'Nov 5', opponent: 'Team C', score: '3-0', logo: "/logo.png", result: 'W' },
  { date: 'Nov 2', opponent: 'Team D', score: '0-2', logo: "/logo.png", result: 'L' },
  { date: 'Oct 29', opponent: 'Team E', score: '4-1', logo: "/logo.png", result: 'W' },
];

const highlights = [
  {
    id: 1,
    title: 'MD9 Goal Fest vs Valiant FC',
    thumbnail: 'https://via.placeholder.com/400x225?text=Highlight+1',
    video: 'https://www.youtube.com/embed/GYb3oEzlVXo?si=DuMADHKXLrcU71gr',
  },
  {
    id: 2,
    title: 'Training Montage: Panther Pride',
    thumbnail: 'https://via.placeholder.com/400x225?text=Highlight+2',
    video: 'https://www.youtube.com/embed/GYb3oEzlVXo?si=DuMADHKXLrcU71gr',
  },
   {
    id: 3,
    title: 'Training Montage: Panther Pride',
    thumbnail: 'https://via.placeholder.com/400x225?text=Highlight+2',
    video: 'https://www.youtube.com/embed/GYb3oEzlVXo?si=DuMADHKXLrcU71gr',
  },
];


const matches = [
  {
    id: "match-001",
    league: "TCC",
    date: "2025-11-13T19:00:00Z",
    venue: "National Stadium",
    status: "Finished",
    teams: [
      { name: "Lagos United", logo: "/logo.png", score: 0 },
      { name: "Barca", logo: "/logo.png", score: 2 }
    ],
    highlightsUrl: "/highlights/match-001"
  },
  {
    id: "match-002",
    league: "TCC",
    date: "2025-11-14T17:00:00Z",
    venue: "Warri Stadium",
    status: "Finished",
    teams: [
      { name: "Warri United", logo: "/logo.png", score: 0 },
      { name: "Benin Fighter", logo: "/logo.png", score: 2 }
    ],
    highlightsUrl: "/highlights/match-002"
  },
];

export default function Home() {
  const [newsIndex, setNewsIndex] = useState(0);
  const newsRef = useRef<HTMLDivElement>(null);

  // Auto-scroll for news carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % latestNews.length);
    }, 4000); // Change slide every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    if (newsRef.current) newsRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };
  const scrollRight = () => {
    if (newsRef.current) newsRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-amber-900 text-white relative overflow-x-hidden">
      {/* Header */}
      <Header/>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/groupphoto2.jpg" // Placeholder - Replace with your image
          alt="Panthers Academy Hero"
          fill
          className="object-cover brightness-50"
          priority
        />
        <motion.div
          className="text-center z-10 px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Panthers Football Academy
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            Unleashing the Roar: Nurturing Africa's Fiercest Talents Since 2022
          </motion.p>
          <motion.button
            className="bg-amber-500 hover:bg-amber-600 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-amber-500/25"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            Join the Pride
          </motion.button>
        </motion.div>
      </section>

<section className="py-20 px-6 max-w-7xl mx-auto">
  <motion.h2
    className="text-3xl md:text-4xl font-bold text-center mb-14 text-amber-400"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <Calendar className="inline mr-2 mb-1" /> Recent Match
  </motion.h2>

  {/* Equal height grid */}
  <div className="grid md:grid-cols-2 gap-12 items-stretch">
    
    {/* --- Recent Match Card --- */}
    <motion.div
      className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-amber-500/20 shadow-xl hover:shadow-amber-500/20 transition-shadow flex flex-col justify-between"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        {/* League + Date */}
        <div className="mb-4">
          <p className="text-xs uppercase tracking-wider text-amber-300 opacity-70">
            {recentMatch.league}
          </p>
          <p className="text-xs opacity-60">{recentMatch.date}</p>
        </div>

        {/* Opponent */}
        <h3 className="text-2xl font-bold mb-3 tracking-wide">
          {recentMatch.opponent}
        </h3>

        {/* Score */}
        <div className="flex items-center gap-4 mb-6">
          <p className="text-6xl font-black text-amber-400">{recentMatch.score}</p>
          <span className="text-sm opacity-80 tracking-wider">FULL TIME</span>
        </div>

        {/* Win / Loss pill */}
        <span
          className={`px-5 py-2 rounded-full text-sm font-semibold inline-block
            ${
              recentMatch.result === "Win"
                ? "bg-green-500/25 text-green-300"
                : recentMatch.result === "Draw"
                ? "bg-yellow-500/25 text-yellow-300"
                : "bg-red-500/25 text-red-300"
            }`}
        >
          {recentMatch.result}
        </span>
      </div>

      {/* Watermark */}
      <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
        <Trophy size={120} />
      </div>
    </motion.div>

    {/* --- Upcoming Fixtures Box --- */}
    <div className="rounded-2xl bg-slate-900 p-8 border border-amber-500/10 shadow-xl flex flex-col justify-between">
      <div>
        <h4 className="text-xl font-bold mb-6 text-amber-400 flex items-center gap-2">
          <Calendar size={20} /> Upcoming Fixtures
        </h4>

        <ul className="space-y-4">
          {upcomingFixtures.map((fixture, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition"
            >
              <div>
                <p className="font-medium">{fixture.opponent}</p>
                <span className="text-xs opacity-60">{fixture.date}</span>
              </div>
              <span className="text-sm font-semibold opacity-80">
                {fixture.time}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>

  </div>

  {/* Button */}
  <div className="text-center mt-12">
    <Link
      href="/matches"
      className="bg-amber-500 hover:bg-amber-600 px-8 py-3 rounded-full font-semibold transition shadow-lg hover:shadow-amber-500/25"
    >
      View More Matches
    </Link>
  </div>
</section>
      
{/* 2. Latest News Section - Sliding Animation Carousel */}
{/* 2. Latest News Section - Sliding Animation Carousel */}
<section className="relative py-16 px-6 bg-white/5 overflow-hidden">
  <motion.h2 
    className="text-3xl font-bold text-center mb-12 text-amber-400"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    <Newspaper className="inline mr-2" /> Latest News
  </motion.h2>

  {/* Left Arrow */}
  <motion.button
    onClick={scrollLeft}
    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-slate-900/70 hover:bg-slate-900 p-3 rounded-full shadow-lg text-white hidden sm:block"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2 }}
  >
    <ChevronLeft size={24} />
  </motion.button>

  {/* Right Arrow */}
  <motion.button
    onClick={scrollRight}
    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-slate-900/70 hover:bg-slate-900 p-3 rounded-full shadow-lg text-white hidden sm:block"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2 }}
  >
    <ChevronRight size={24} />
  </motion.button>

  {/* Scroll Container with Framer Motion for smooth sliding */}
  <div
    ref={newsRef}
    className="flex gap-4 sm:gap-8 scroll-smooth no-scrollbar" 
    style={{ 
      overflowX: "auto", 
      overflowY: "hidden",
      scrollbarWidth: "none", /* Firefox */
      msOverflowStyle: "none" /* IE and Edge */
    }}
  >
    <AnimatePresence mode="wait">
      {latestNews.map((article, index) => (
        <motion.div
          key={article.id}
          className="w-64 sm:w-80 md:w-96 flex-shrink-0 bg-white/10 rounded-xl overflow-hidden border border-amber-500/20"
          initial={{ opacity: 0, x: 100 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            scale: index === newsIndex ? 1.02 : 1
          }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ 
            duration: 0.6, 
            ease: "easeInOut",
            scale: { duration: 0.3 }
          }}
        >
          <motion.div
            className="p-4 sm:p-6"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={article.image}
              alt={article.title}
              width={320}
              height={200}
              className="w-full h-40 sm:h-48 object-cover rounded-t-xl"
            />
            <h3 className="font-bold mb-2 text-sm leading-tight mt-3 sm:mt-4">{article.title}</h3>
            <p className="text-xs opacity-80 mb-2">{article.excerpt}</p>
            <p className="text-xs opacity-70 mb-3 sm:mb-4">{article.date}</p>
            <Link
              href={`/news/${article.slug}`}
              className="text-amber-400 text-xs font-semibold hover:text-amber-300 transition"
            >
              Read More →
            </Link>
          </motion.div>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>

  <style jsx>{`
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
  `}</style>
</section>


      {/* 3. Our Players Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-amber-400"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Users className="inline mr-2" /> Our Players
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {ourPlayers.map((player, i) => (
            <motion.div
              key={player.id}
              className="text-center bg-white/10 rounded-xl p-6 border border-amber-500/20 overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                boxShadow: "0 20px 40px rgba(245, 158, 11, 0.3)"
              }}
            >
             <motion.div
            className="relative overflow-hidden rounded-lg mb-4"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            <Image 
              src={player.image} 
              alt={player.name} 
              width={300} 
              height={400} 
              className="w-full h-96 object-top object-cover" 
            />
          </motion.div>

              <motion.h3 
                className="text-xl font-bold mb-2"
                whileHover={{ color: "#fbbf24" }}
                transition={{ duration: 0.3 }}
              >
                {player.name}
              </motion.h3>
              <motion.p 
                className="text-amber-400 mb-2"
                whileHover={{ scale: 1.05 }}
              >
                {player.position}
              </motion.p>
              <p className="text-sm opacity-80">Goals: {player.goals || 'N/A'}</p>
            </motion.div>
          ))}
        </div>
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Link 
            href="/players" 
            className="bg-amber-500 hover:bg-amber-600 px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-amber-500/25"
          >
            View All Players
          </Link>
        </motion.div>
      </section>
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      
      {/* Mobile Card Alternative - Optional: Toggle via JS if needed, but here using hidden on sm+ */}
      <motion.h2
                className="text-3xl font-bold text-center mb-12 text-amber-400"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <Trophy className="inline mr-2" /> League Matches
              </motion.h2>
      <div className="block mt-4 space-y-4">
        {matches.map((match, i) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-white/10 rounded-xl p-4 border border-amber-500/20 overflow-hidden"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 30px rgba(245, 158, 11, 0.2)"
            }}
          >
            <motion.div 
              className="flex justify-between items-start mb-2"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xs font-medium text-amber-400">{new Date(match.date).toLocaleDateString()}</span>
              <motion.span 
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  match.status === "Finished" ? "bg-green-500/20 text-green-300" :
                  match.status === "Upcoming" ? "bg-yellow-500/20 text-yellow-300" :
                  "bg-red-500/20 text-red-300"
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {match.status}
              </motion.span>
            </motion.div>
            <div className="text-xs mb-2">{match.league}</div>
            <motion.div 
              className="flex items-center justify-between"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div 
                className="flex items-center gap-2 flex-1"
                whileHover={{ scale: 1.05 }}
              >
                <img src={match.teams[0].logo} alt={match.teams[0].name} className="w-20 h-20 rounded-full" />
                <span className="truncate">{match.teams[0].name}</span>
              </motion.div>
              <span className="font-bold text-white mx-2">vs</span>
              <motion.div 
                className="flex items-center gap-2 flex-1 justify-end"
                whileHover={{ scale: 1.05 }}
              >
                <span className="truncate text-right">{match.teams[1].name}</span>
                <img src={match.teams[1].logo} alt={match.teams[1].name} className="w-20 h-20 rounded-full" />
              </motion.div>
            </motion.div>
            <motion.div 
              className="text-center font-bold text-amber-400 text-lg mt-2"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ scale: 1.1, color: "#fbbf24" }}
            >
              {match.teams[0].score} - {match.teams[1].score}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
    <div className='h-10'></div>
      {/* 4. League Table (Last 5 Matches) Section - Modernized Design */}
      <section className="py-16 px-6 bg-slate-900/80">
  <motion.div 
    className="max-w-4xl mx-auto"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <motion.h2
      className="text-3xl font-bold text-center mb-12 text-amber-400"
      initial={{ y: 30 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Trophy className="inline mr-2" /> Last 5 Matches
    </motion.h2>

    <div className="space-y-4">
      {last5Matches.map((match, i) => (
        <motion.div
          key={i}
          className="flex items-center justify-between bg-white/10 backdrop-blur-md border border-amber-500/30 rounded-xl p-4 shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          whileHover={{ 
            scale: 1.02,
            x: 10,
            boxShadow: "0 20px 40px rgba(245, 158, 11, 0.2)"
          }}
        >
          {/* Date */}
          <motion.div 
            className="text-white/90 font-medium w-20"
            whileHover={{ scale: 1.05 }}
          >
            {match.date}
          </motion.div>

          {/* Opponent */}
          <motion.div 
            className="flex items-center gap-3 flex-1"
            whileHover={{ x: 5 }}
          >
            <motion.img
              src={match.logo}
              alt={match.opponent}
              className="w-10 h-10 rounded-full border border-amber-500 object-cover"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.4 }}
            />
            <motion.span 
              className="text-white font-semibold"
              whileHover={{ color: "#fbbf24" }}
            >
              {match.opponent}
            </motion.span>
          </motion.div>

          {/* Score */}
          <motion.div 
            className="text-amber-400 font-bold text-lg w-16 text-center"
            whileHover={{ scale: 1.1 }}
          >
            {match.score}
          </motion.div>

          {/* Result */}
          <motion.div
            whileHover={{ scale: 1.1 }}
          >
            <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
              match.result === 'W' ? 'bg-green-500/30 text-green-300' :
              match.result === 'D' ? 'bg-yellow-500/30 text-yellow-300' :
              'bg-red-500/30 text-red-300'
            }`}>
              {match.result}
            </span>
          </motion.div>
        </motion.div>
      ))}
    </div>

    <motion.div 
      className="text-center mt-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      viewport={{ once: true }}
    >
      <Link 
        href="/league" 
        className="bg-amber-500 hover:bg-amber-600 px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-amber-500/25"
      >
        View Full League Table
      </Link>
    </motion.div>
  </motion.div>
</section>



      {/* 5. Our Highlights Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-amber-400"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Play className="inline mr-2" /> Our Highlights
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          {highlights.map((highlight, i) => (
            <motion.div
              key={highlight.id}
              className="relative bg-white/10 rounded-xl overflow-hidden border border-amber-500/20 group cursor-pointer"
              initial={{ opacity: 0, scale: 0.95, rotateY: 90 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 20px 40px rgba(245, 158, 11, 0.3)"
              }}
            >
              <motion.div
                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <Play className="w-12 h-12 text-amber-400" />
              </motion.div>
              <Image 
                src={highlight.thumbnail} 
                alt={highlight.title} 
                fill 
                className="object-cover group-hover:brightness-110 transition-all duration-500" 
              />
              <motion.div 
                className="absolute bottom-4 left-4 right-4"
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-bold bg-white/20 backdrop-blur-sm p-2 rounded">{highlight.title}</h3>
              </motion.div>
            </motion.div>
          ))}
        </div>
<div
  id="our-highlights"
  className="bg-slate-900/40 py-10 px-5 rounded-lg my-5 shadow-md border border-amber-500/20"
>
  <motion.h2 
    className="text-2xl font-bold text-amber-400 mb-6 text-center"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    Match Highlights
  </motion.h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    { highlights.map((item, i) => (
      <motion.div
        key={i}
        className="bg-slate-800 p-4 rounded-lg shadow-sm hover:shadow-lg hover:border-amber-400 border border-slate-700 transition-all overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
        whileHover={{ 
          scale: 1.02,
          y: -5,
          boxShadow: "0 15px 30px rgba(245, 158, 11, 0.2)"
        }}
      >
        {/* Video Placeholder */}
       <iframe
           src={item.video}
            className="w-full h-full rounded-t-3xl"
            allowFullScreen
                    
        />
        {/* Title */}
        <motion.h3 
          className="text-amber-400 font-semibold mt-4"
          whileHover={{ color: "#fbbf24" }}
        >
          Highlight {i}
        </motion.h3>

        {/* Description */}
        <motion.p 
          className="text-gray-300 text-sm mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Relive the key moments — goals, skills, and match-winning plays.
        </motion.p>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-4">
          <motion.button 
            className="text-slate-900 bg-amber-400 px-4 py-1.5 rounded-md text-sm hover:bg-amber-300 transition"
            whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(245, 158, 11, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            View
          </motion.button>

          <motion.button 
            className="text-amber-400 text-sm hover:text-amber-300"
            whileHover={{ x: 5 }}
          >
            See more...
          </motion.button>
        </div>
      </motion.div>
    ))}
  </div>
</div>


        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <Link 
            href="/highlights" 
            className="bg-amber-500 hover:bg-amber-600 px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-amber-500/25"
          >
            View More Highlights
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
    <Footer />
    </main>
  );
}