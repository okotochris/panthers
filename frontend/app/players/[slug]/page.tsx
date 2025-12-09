"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Flag, ArrowLeft, X } from "lucide-react";
import Header from "../../component/header";
import Footer from "../../component/footer";
import FullView from "../../component/viewImage"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Fetching from "@/app/component/Fetching";
const server = process.env.NEXT_PUBLIC_API_URL

type Card = {
  red: string
  yellow: string
}
type Player = {
  name: string;
  position: string;
  nationality: string;
  dob: string;
  club: string;
  images: string[];
  bio: string;
  about: string
  matchplayed: string
  goal: string
  assist: string
  card: Card
};


export default function PlayerDetail() {
  const [fullImg, setFullImg] = useState<string | null>(null);
  const [player, setPlayer] = useState<Player | null>(null)
  const pathName = usePathname()
  useEffect(() => {
    const id = pathName.split("/")[2]
    fetch(`${server}/api/player/${id}`)
      .then(result => {
        result.json()
          .then(data => {
            setPlayer(data)
          })
      })
      .catch(err => {
        console.log(err)
      })
  })
  // const player = mockPlayer;

  return (
    <>
      <Header />
      {
        player ?
          <main className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-amber-900 text-white relative">
            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
              <Image
                src={player.images[0]}
                alt={player.name}
                fill
                className="object-cover object-top md:object-center brightness-50"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              <motion.div
                className="text-center z-10 px-6 relative max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <motion.h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
                  {player.name}
                </motion.h1>
                <motion.div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-gray-300">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Flag className="w-4 h-4" />
                    <span>{player.nationality}</span>
                    <Calendar className="w-4 h-4" />
                    <span>{player.dob}</span>
                    <span className="sm:ml-auto">{player.position} | {player.club}</span>
                  </div>

                </motion.div>
              </motion.div>
            </section>

            {/* Bio & Stats */}
            <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
              <motion.div className="space-y-4 text-gray-200 text-justify">
                {player.about.split("\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </motion.div>

              <motion.div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-amber-500/20">
                <h3 className="text-xl font-bold mb-4 text-amber-400">Stats</h3>
                <ul className="space-y-2 text-gray-300">

                  <li className="flex justify-between border-b border-amber-500/20 pb-1">
                    <span>Matches Played </span>
                    <span className="font-semibold text-amber-400">{player.matchplayed}</span>
                  </li>
                  <li className="flex justify-between border-b border-amber-500/20 pb-1">
                    <span>Goals </span>
                    <span className="font-semibold text-amber-400">{player.goal}</span>
                  </li>
                  <li className="flex justify-between border-b border-amber-500/20 pb-1">
                    <span>Asissit </span>
                    <span className="font-semibold text-amber-400">{player.assist}</span>
                  </li>
                  <li className="flex justify-between border-b border-amber-500/20 pb-1">
                    <span>Yellow Card </span>
                    <span className="font-semibold text-amber-400">{player.card.yellow}</span>
                  </li>
                  <li className="flex justify-between border-b border-amber-500/20 pb-1">
                    <span>Red Card </span>
                    <span className="font-semibold text-amber-400">{player.card.red}</span>
                  </li>
                </ul>
              </motion.div>
            </section>

            {/* Gallery */}
            <section className="py-16 px-6 max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-amber-400">Gallery</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                {player.images.map((img, i) => (
                  <motion.div
                    key={i}
                    className="overflow-hidden rounded-2xl relative group shadow-lg hover:shadow-amber-500/30 transition-shadow duration-300 aspect-[3/4]"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src={img}
                      onClick={() => setFullImg(img)}
                      alt={`${player.name} image ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>

                ))}
              </div>

            </section>

            {/* Back Button */}
            <div className="text-center mb-16">
              <Link
                href="/players"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 px-6 py-3 rounded-full font-semibold transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Players
              </Link>
            </div>
            {fullImg && <FullView img={fullImg} onClose={() => setFullImg(null)} />}
          </main>
          :
          <Fetching />
      }
      <Footer />
    </>
  );
}
