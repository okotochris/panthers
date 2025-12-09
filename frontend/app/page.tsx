
"use client"
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Trophy, Newspaper, Users, Play, MapPin, Phone, Mail, Facebook, Instagram, Youtube, ChevronLeft, ChevronRight } from 'lucide-react';
import Footer from './component/footer';
import Header from './component/header';
import { useRef, useState, useEffect } from 'react';
import formatDate from './component/formatDate'
const server = process.env.NEXT_PUBLIC_API_URL


type Match = {
  id: number,
  league: string,
  date: string
  venue: string
  status: string
  time: string
  club_name: string
  club_logo: string
  our_goal: string
  club_goal: string
}
type Player = {
  id: number
  name: string
  position: string
  assists: number
  goal: number
  images: string[]
}
type News = {
  id: number
  title: string
  date: string
  excerpt: string
   content:string
  images: string[]
}
type Highlight = {
  id: number
  title: string
  video: string
}
export default function Home() {
  const [newsIndex, setNewsIndex] = useState(0);
  const [matches, setMatches] = useState<Match[]>([])
  const [ourPlayers, setOurPlayers] = useState<Player[]>([])
  const [latestNews, setLatestNews] = useState<News[]>([])
  const [highlights, setHighlights] = useState<Highlight[]>([])
  const [last5Matches, setLast5matches] = useState<Match[]>([])
  const [upcomingFixtures, setUpComingFixture] = useState<Match[]>([])
  const [recentMatch, setRecentMatch] = useState<Match | null>(null);
  const newsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${server}/api/home`)
      .then(result => {
        result.json()
          .then(data => {
            const { player, news, highlight, match, last5matches, upcoming } = data;
            setMatches(match)
            setOurPlayers(player)
            setLatestNews(news)
            setHighlights(highlight)
            setLast5matches(last5matches)
            setUpComingFixture(upcoming)
            setRecentMatch(last5matches[0])

          })
      })

      .catch(err => {
        console.log(err)
      })
  }, [])

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
      <Header />

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
            {
              recentMatch ?
                <div>
                  {/* League + Date */}
                  <div className="mb-4">
                    <p className="text-xs uppercase tracking-wider text-amber-300 opacity-70">
                      {recentMatch.league}
                    </p>
                    <p className="text-xs opacity-60">{formatDate(recentMatch.date)}</p>
                  </div>

                  {/* Opponent */}
                  <h3 className="text-2xl font-bold mb-3 tracking-wide">
                    {recentMatch.club_name}
                  </h3>

                  {/* Score */}
                  <div className="flex items-center gap-4 mb-6">
                    <p className="text-6xl font-black text-amber-400">{recentMatch.our_goal || "0"} - {recentMatch.club_goal || "0"}</p>
                    <span className="text-sm opacity-80 tracking-wider">FULL TIME</span>
                  </div>

                  {/* Win / Loss pill */}

                  {
                    Number(recentMatch.our_goal) >
                      Number(recentMatch.club_goal) ?
                      <span className="px-5 py-2 rounded-full text-sm font-semibold inline-block bg-green-500/25 text-green-300">Win</span> :
                      Number(recentMatch.our_goal) == Number(recentMatch.club_goal) ?
                        <span className="px-5 py-2 rounded-full text-sm font-semibold inline-block bg-yellow-500/25 text-yellow-300"> Draw</span> :
                        <span className="px-5 py-2 rounded-full text-sm font-semibold inline-blockbg-red-500/25 text-red-300">Lose</span>
                  }

                </div>
                :
                <h2>No update yet</h2>
            }

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
                {upcomingFixtures.length > 0 ? upcomingFixtures.map((fixture, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition"
                  >
                    <div>
                      <p className="font-medium">{fixture.club_name}</p>
                      <span className="text-xs opacity-60">{formatDate(fixture.date)}</span>
                    </div>
                    <span className="text-sm font-semibold opacity-80">
                      {fixture.time}
                    </span>
                  </li>
                ))
                  :
                  <h2>No match yet</h2>
                }
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
            {latestNews.length > 0 ? latestNews.map((article, index) => (
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
                    src={article.images[0]}
                    alt={article.title}
                    width={320}
                    height={200}
                    className="w-full h-40 sm:h-48 object-cover rounded-t-xl"
                  />
                  <h3 className="font-bold mb-2 text-sm leading-tight mt-3 sm:mt-4">{article.title}</h3>
                  <p className="text-xs opacity-80 mb-2">{article.content}</p>
                  <p className="text-xs opacity-70 mb-3 sm:mb-4">{article.date}</p>
                  <Link
                    href={`/news/${article.id}`}
                    className="text-amber-400 text-xs font-semibold hover:text-amber-300 transition"
                  >
                    Read More →
                  </Link>
                </motion.div>
              </motion.div>
            ))
              :
              <h2 className="bg-amber-500 hover:bg-amber-600 px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-amber-500/25">No file uploaded</h2>
            }
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
          {ourPlayers.length > 0 ? ourPlayers.map((player, i) => (
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
                  src={player.images[0]}
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
              <p className="text-sm opacity-80">Goals: {player.goal}</p>
            </motion.div>
          ))
            :
            <h2 className="bg-amber-500 hover:bg-amber-600 px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-amber-500/25">No file uploaded</h2>
          }
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
          {matches.length > 0 ? matches.map((match, i) => (
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
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${match.status === "Finished" ? "bg-green-500/20 text-green-300" :
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
                  <img src="/logo.png" alt="panthers" className="w-20 h-20 rounded-full" />
                  <span className="truncate">Panthers</span>
                </motion.div>
                <span className="font-bold text-white mx-2">vs</span>
                <motion.div
                  className="flex items-center gap-2 flex-1 justify-end"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="truncate text-right">{match.club_name}</span>
                  <img src={match.club_logo} alt={match.club_name} className="w-20 h-20 rounded-full" />
                </motion.div>
              </motion.div>
              <motion.div
                className="text-center font-bold text-amber-400 text-lg mt-2"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                whileHover={{ scale: 1.1, color: "#fbbf24" }}
              >
                {match.our_goal == "" ? "-" : match.our_goal} - {match.club_goal == "" ? "-" : match.club_goal}
              </motion.div>
            </motion.div>
          ))
            :
            <h2 className="bg-amber-500 hover:bg-amber-600 px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-amber-500/25">No file uploaded</h2>
          }
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
            {last5Matches ? last5Matches.map((match, i) => (
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
                  {formatDate(match.date)}
                </motion.div>

                {/* Opponent */}
                <motion.div
                  className="flex items-center gap-3 flex-1"
                  whileHover={{ x: 5 }}
                >
                  <motion.img
                    src="/logo.png"
                    alt="Pathen"
                    className="w-10 h-10 rounded-full border border-amber-500 object-cover"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.span
                    className="text-white font-semibold"
                    whileHover={{ color: "#fbbf24" }}
                  >
                    {match.club_name}
                  </motion.span>
                </motion.div>

                {/* Score */}
                <motion.div
                  className="text-amber-400 font-bold text-lg w-16 text-center"
                  whileHover={{ scale: 1.1 }}
                >
                  {match.our_goal} - {match.club_goal}
                </motion.div>

                {/* Result */}
                <motion.div whileHover={{ scale: 1.1 }}>
                  {
                    Number(match.our_goal) > Number(match.club_goal)
                      ? (
                        <span className="px-4 py-1 rounded-full text-sm font-semibold bg-green-500/30 text-green-300">
                          W
                        </span>
                      )
                      : Number(match.our_goal) === Number(match.club_goal)
                        ? (
                          <span className="px-4 py-1 rounded-full text-sm font-semibold bg-yellow-500/30 text-yellow-300">
                            D
                          </span>
                        )
                        : (
                          <span className="px-4 py-1 rounded-full text-sm font-semibold bg-red-500/30 text-red-300">
                            L
                          </span>
                        )
                  }
                </motion.div>

              </motion.div>
            ))
              :
              <h2 className="bg-amber-500 hover:bg-amber-600 px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-amber-500/25">No Match yet</h2>
            }
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
            {highlights.length > 0 ? highlights.map((item, i) => (
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
            ))
              :
              <h2 className="bg-amber-500 hover:bg-amber-600 px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-amber-500/25">No file uploaded</h2>
            }
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