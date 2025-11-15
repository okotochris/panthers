// app/highlights/[id]/page.tsx
"use client";

import Header from "../../component/header";
import Footer from "../../component/footer";
import { Calendar, Clock, Trophy, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function HighlightDetail() {
  const highlight = {
    id: 1,
    title: "MD9 Goal Fest vs Valiant FC",
    description:
      "Relive the electrifying moments from our TCC League MD9 clash against Valiant FC. This highlight captures the passion, skill, and determination that defines Panthers Academy.",
    videoUrl: "/video1.mp4",
    duration: "3:45",
    date: "Nov 12, 2025",
    views: 12500,
    category: "Match Highlights",
    tags: ["TCC League", "Goals", "Victory", "John Doe"],
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-black text-white">
         <div className="h-28"></div>
        {/* HERO VIDEO */}
        <section className="w-full bg-black flex items-center justify-center p-4 py-10">
            <div className="w-full max-w-3xl mx-auto">
                <div className="w-full rounded-2xl overflow-hidden shadow-xl bg-black">
               <video
                    src={highlight.videoUrl}
                    controls
                    preload="metadata"
                    className="
                        w-full h-auto               /* natural height on mobile */
                        max-h-[70vh]                /* prevent overflow */
                        rounded-2xl bg-black 
                        mx-auto
                        md:max-w-3xl                /* medium screens */
                        lg:max-w-4xl lg:max-h-[80vh] /* laptop: taller video */
                    "
                    >
                    Your browser does not support the video tag.
                </video>

                </div>
            </div>
        </section>


        {/* TITLE + META INFO */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-400 mb-4">
            {highlight.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {highlight.date}
            </div>

            <div className="flex items-center gap-2">
              <Clock size={16} />
              {highlight.duration}
            </div>

            <div className="flex items-center gap-2">
              <Trophy size={16} className="text-amber-400" />
              {highlight.category}
            </div>

            <div>{highlight.views.toLocaleString()} views</div>
          </div>
        </section>

        {/* DESCRIPTION */}
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <p className="leading-relaxed text-gray-200 text-lg">
              {highlight.description}
            </p>
          </div>
        </section>

        {/* TAGS */}
        <section className="max-w-4xl mx-auto px-4 pb-12 flex flex-wrap gap-3">
          {highlight.tags.map((tag, i) => (
            <span
              key={i}
              className="px-4 py-1 rounded-full text-sm bg-amber-500/20 text-amber-300"
            >
              #{tag}
            </span>
          ))}
        </section>

        {/* BACK BUTTON */}
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <Link
            href="/highlights"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black transition"
          >
            <ChevronLeft size={18} />
            Back to Highlights
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
