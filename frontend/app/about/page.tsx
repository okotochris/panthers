"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "../component/header";
import Footer from "../component/footer";
import { Users, Trophy, Award, MapPin } from "lucide-react";

export default function AboutPage() {
  const academyStats = [
    { icon: <Users className="w-12 h-12 text-amber-400 mx-auto mb-2" />, label: "Active Players", value: 150 },
    { icon: <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-2" />, label: "Pro Contracts", value: 25 },
    { icon: <Award className="w-12 h-12 text-amber-400 mx-auto mb-2" />, label: "Success Rate", value: "95%" },
    { icon: <MapPin className="w-12 h-12 text-amber-400 mx-auto mb-2" />, label: "Location", value: "Lagos, Nigeria" },
  ];

  const teamMembers = [
    { name: "John Doe", role: "Head Coach", image: "/coach1.jpg" },
    { name: "Jane Smith", role: "Assistant Coach", image: "/coach2.jpg" },
    { name: "Mike Johnson", role: "Fitness Coach", image: "/coach3.jpg" },
    { name: "Alice Brown", role: "Goalkeeper Coach", image: "/coach4.jpg" },
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-amber-900 text-white relative">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/academy-hero.jpg"
            alt="Panthers Academy"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <motion.div
            className="text-center z-10 px-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
              About Panthers Academy
            </motion.h1>
            <motion.p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Nurturing Africa’s next football legends with world-class training, discipline, and holistic development.
            </motion.p>
          </motion.div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-6 max-w-5xl mx-auto space-y-12">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
              Our Mission
            </h2>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              Our mission is to develop talented young footballers into professional athletes through structured training, education, and character development.
            </p>

            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
              Our Vision
            </h2>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              To be the premier football academy in Africa, producing world-class players who excel on and off the pitch.
            </p>
          </motion.div>
        </section>

        {/* Academy Stats */}
        <section className="py-16 px-6 max-w-6xl mx-auto">
          <motion.div
            className="grid md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {academyStats.map((stat, i) => (
              <motion.div
                key={i}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-amber-500/20"
                whileHover={{ scale: 1.05 }}
              >
                {stat.icon}
                <h3 className="text-3xl font-bold text-amber-300 mb-2">{stat.value}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Team Gallery */}
        <section className="py-16 px-6 max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
              Meet Our Coaches
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our expert coaching team develops players’ skills, mindset, and discipline to succeed at every level.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                className="overflow-hidden rounded-2xl relative group shadow-lg hover:shadow-amber-500/30 transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="w-full h-64 md:h-80 object-cover rounded-2xl"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/40 text-white text-center">
                  <h3 className="font-bold">{member.name}</h3>
                  <p className="text-sm text-amber-400">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 text-center">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
              Join Panthers Academy
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Become part of Africa's elite football academy and start your journey to professional football.
            </p>
            <Link
              href="/enroll"
              className="bg-amber-500 hover:bg-amber-600 px-10 py-4 rounded-full text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-amber-500/25"
            >
              Enroll Now
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
