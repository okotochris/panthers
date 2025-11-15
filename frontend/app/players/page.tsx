"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Users, Trophy, MapPin, Award } from "lucide-react";
import Header from "../component/header";
import Footer from "../component/footer";

interface Player {
  id: number;
  name: string;
  position: string;
  image: string;
  slug: string;
  stats: { goals?: number; assists?: number; appearances?: number };
}

export default function PlayersPage() {
  const players: Player[] = [
    { 
      id: 1, 
      name: "John Doe", 
      position: "Forward", 
      image: "/player6.jpg", 
      slug: "john-doe",
      stats: { goals: 12, assists: 5, appearances: 25 }
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      position: "Midfielder", 
      image: "/player2.jpg", 
      slug: "jane-smith",
      stats: { goals: 3, assists: 15, appearances: 28 }
    },
    { 
      id: 3, 
      name: "Mike Johnson", 
      position: "Defender", 
      image: "/player3.jpg", 
      slug: "mike-johnson",
      stats: { goals: 1, assists: 2, appearances: 30 }
    },
    { 
      id: 4, 
      name: "Alice Brown", 
      position: "Goalkeeper", 
      image: "/player4.jpg", 
      slug: "alice-brown",
      stats: { goals: 0, assists: 0, appearances: 22 }
    },
    { 
      id: 5, 
      name: "Chris Adams", 
      position: "Forward", 
      image: "/player5.jpg", 
      slug: "chris-adams",
      stats: { goals: 8, assists: 7, appearances: 20 }
    },
  ];

  const academyStats = {
    totalPlayers: 150,
    proContracts: 25,
    successRate: "95%",
    location: "Lagos, Nigeria"
  };

  const testimonials = [
    {
      quote: "Panthers Academy transformed my game and life. The coaching is world-class!",
      author: "John Doe, Pro Forward",
      image: "/testimonial1.jpg"
    },
    {
      quote: "From raw talent to ready professional – that's the Panthers difference.",
      author: "Coach Maria Lopez",
      image: "/testimonial2.jpg"
    }
  ];

  return (
    <>
      <Header />

      <main className="bg-gradient-to-br from-slate-900 via-black to-amber-900 text-white relative overflow-hidden">
        {/* Hero Section */}
        
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden mt-15">
          <div className="absolute inset-0">
            <Image
              src="/groupphoto1.jpg" // Use a dynamic team hero image
              alt="Panthers Academy Players"
              fill
              className="object-cover brightness-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
          </div>
          <motion.div
            className="relative z-10 text-center px-6 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-6 bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-amber-500/30"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Users className="w-5 h-5 text-amber-400" />
              <span className="text-amber-300 font-semibold uppercase tracking-wide">Our Rising Stars</span>
            </motion.div>
            <motion.h1
              className="text-5xl md:text-7xl font-black mb-6 leading-tight bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 bg-clip-text text-transparent drop-shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Elite Talent Pipeline
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Nurturing Africa's future football legends with world-class training, holistic development, and unbreakable spirit.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Link href="#players" className="bg-amber-500 hover:bg-amber-600 px-10 py-4 rounded-full text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-amber-500/25">
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Meet the Squad
                </motion.span>
              </Link>
              <Link href="/academy" className="border-2 border-amber-500 hover:bg-amber-500 text-amber-400 hover:text-slate-900 px-10 py-4 rounded-full text-xl font-bold transition-all duration-300">
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Join Us
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Overview */}
        <section className="py-20 px-6 max-w-6xl mx-auto" id="stats">
          <motion.div
            className="grid md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-amber-500/20"
              whileHover={{ scale: 1.05 }}
            >
              <Users className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-amber-300 mb-2">{academyStats.totalPlayers}+</h3>
              <p className="text-gray-400">Active Players</p>
            </motion.div>
            <motion.div
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-amber-500/20"
              whileHover={{ scale: 1.05 }}
            >
              <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-amber-300 mb-2">{academyStats.proContracts}</h3>
              <p className="text-gray-400">Pro Contracts Signed</p>
            </motion.div>
            <motion.div
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-amber-500/20"
              whileHover={{ scale: 1.05 }}
            >
              <Award className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-amber-300 mb-2">{academyStats.successRate}</h3>
              <p className="text-gray-400">Success Rate</p>
            </motion.div>
            <motion.div
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-amber-500/20"
              whileHover={{ scale: 1.05 }}
            >
              <MapPin className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-amber-300 mb-2">{academyStats.location}</h3>
              <p className="text-gray-400">Based In</p>
            </motion.div>
          </motion.div>
        </section>

        {/* Players Gallery */}
        <section className="max-w-7xl mx-auto px-6 py-20" id="players">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
              Meet Our Stars
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover the young talents shaping tomorrow's game. Each player embodies dedication, skill, and the Panthers spirit.
            </p>
          </motion.div>
          <motion.div
            className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
          >
            {players.map((player, idx) => (
              <motion.div
                key={player.id}
                className="group bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden shadow-xl hover:shadow-amber-500/30 transition-all duration-500 border border-amber-500/10 hover:border-amber-400/30"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  rotateX: 5
                }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <div className="relative h-80 w-full overflow-hidden">
                 <Image
                      src={player.image}
                        alt={player.name}
                        fill
                        className=" object-cover md:object-cover object-top sm:object-contain "
                      />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-amber-400 font-bold text-sm uppercase tracking-wide mb-1">{player.position}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-amber-300 transition-colors">{player.name}</h3>
                  <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-gray-400">
                    <div className="text-center">
                      <div className="font-bold text-amber-400">{player.stats.goals || 0}</div>
                      <div>Goals</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-amber-400">{player.stats.assists || 0}</div>
                      <div>Assists</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-amber-400">{player.stats.appearances || 0}</div>
                      <div>Apps</div>
                    </div>
                  </div>
                  <Link
                    href={`/players/${player.slug}`}
                    className="mt-auto inline-flex items-center gap-2 px-6 py-3 bg-amber-500/20 text-amber-300 font-semibold rounded-full hover:bg-amber-500/30 transition-all duration-300 w-full justify-center"
                  >
                    <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      View Profile <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-6 bg-black/20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-4xl md:text-5xl font-black mb-12 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              What They Say
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-amber-500/10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-amber-500"
                  />
                  <blockquote className="text-gray-300 italic mb-4 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <p className="text-amber-400 font-semibold">{testimonial.author}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 text-center">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
              Ready to Join the Pride?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Become part of a legacy. Enroll today and unleash your potential with Panthers Academy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/enroll" className="bg-amber-500 hover:bg-amber-600 px-10 py-4 rounded-full text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-amber-500/25">
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Enroll Now
                </motion.span>
              </Link>
              <Link href="/contact" className="border-2 border-amber-500 hover:bg-amber-500 text-amber-400 hover:text-slate-900 px-10 py-4 rounded-full text-xl font-bold transition-all duration-300">
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Contact Us
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}