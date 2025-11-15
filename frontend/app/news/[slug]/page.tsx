"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, Calendar, Clock, Share2, Bookmark, Tag, Newspaper } from "lucide-react";
import FullView from "../../component/viewImage"
import Header from "../../component/header";
import Footer from "../../component/footer";
import { useState } from "react";

interface Article {
  title: string;
  date: string;
  author: string;
  readTime: string;
  images: string[];
  content: string; // plain text from DB
  tags: string[];
}

export default function NewsDetail() {
    const [fullImg, setFullImg] = useState<string | null>(null);
  const article: Article = {
    title: "Panthers Academy Secures Thrilling Victory in TCC League MD9",
    date: "Nov 12, 2025",
    author: "Joh Joseph",
    readTime: "5 min read",
    images: [
      "/image1.jpg", 
      "/image1.jpg",
      "/image1.jpg",
      "/image1.jpg",
    ],
    content: `In a match that had everything – drama, skill, and sheer determination – Panthers Academy emerged victorious against a stubborn Valiant FC side. The game, played under the floodlights of the National Stadium, showcased our young talents.

The Opening Salvo: The first half was a cagey affair, with both teams probing for weaknesses. Valiant FC, known for their counter-attacking prowess, tested our defense early on. Our backline stood firm. A moment of brilliance from our star forward broke the deadlock in the 28th minute.

Second Half Drama: Valiant equalized early in the second half through a set-piece, but Panthers refused to be rattled. By the 65th minute, our forward scored the second goal. The stadium erupted as our anthem echoed through the stands.

Looking Ahead: Next up is a tough away fixture against Dakkada FC. With the squad rotating to manage fatigue, expect more opportunities for our emerging talents.
    `,
    tags: ["TCC League", "Victory", "Youth Football"],
  };

  // Enhanced content splitting: detect heading-like lines and paragraphs
  const processContent = (content: string) => {
    return content
      .split('\n')
      .filter((line) => line.trim() !== '')
      .map((line, idx) => {
        if (line.includes(':') && line.trim().length < 50) {
          // Likely a heading (e.g., "The Opening Salvo:")
          return { type: 'heading' as const, content: line.replace(':', '') };
        }
        return { type: 'paragraph' as const, content: line };
      });
  };

  const contentBlocks = processContent(article.content);

  const renderContentBlock = (block: { type: 'heading' | 'paragraph'; content: string }, idx: number) => {
    return (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: idx * 0.05 }}
      >
        {block.type === 'heading' ? (
          <h2 className="text-2xl font-bold mb-4 mt-8 text-amber-300 border-l-4 border-amber-500 pl-4 py-2">
            {block.content}
          </h2>
        ) : (
          <p className="text-gray-300 mb-6 leading-relaxed text-lg">{block.content}</p>
        )}
      </motion.div>
    );
  };

  return (
    <>
      <Header />
      
      <main className="bg-gradient-to-br from-slate-900 via-black to-amber-900 text-white relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
          <Image
            src={article.images[0]}
            alt={article.title}
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <motion.div
            className="absolute z-10 text-center px-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-6 bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-amber-500/30"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Newspaper className="w-5 h-5 text-amber-400" />
              <span className="text-amber-300 font-semibold uppercase tracking-wide">Academy News</span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-black mb-6 leading-tight bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 bg-clip-text text-transparent drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {article.title}
            </motion.h1>
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
                <Calendar className="w-4 h-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
              <span className="bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">By {article.author}</span>
            </motion.div>
          </motion.div>
        </section>

        {/* Main Content Section */}
        <section className="max-w-5xl mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Text Content */}
            <motion.article
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-amber-500/20 shadow-2xl shadow-amber-500/5">
                <div className="space-y-8">
                  {contentBlocks.map((block, idx) => renderContentBlock(block, idx))}
                </div>
              </div>
            </motion.article>

            {/* Side Panel - Sticky on Desktop */}
            <motion.aside
              className="lg:sticky lg:top-20 self-start"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-amber-500/20 shadow-xl shadow-amber-500/5 space-y-6">
                {/* Tags */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-amber-300 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, i) => (
                      <Link
                        key={i}
                        href={`/news?tag=${tag.toLowerCase()}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-300 text-sm font-semibold rounded-full backdrop-blur-md hover:bg-amber-500/20 transition-all duration-300 hover:scale-105"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-amber-500/20">
                  <h3 className="text-lg font-bold mb-4 text-amber-300">Share this story</h3>
                  <div className="flex gap-3">
                    <motion.button
                      className="p-3 bg-white/10 rounded-full hover:bg-amber-500/20 transition-all duration-300 flex-1 text-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 className="w-5 h-5 mx-auto text-amber-300" />
                    </motion.button>
                    <motion.button
                      className="p-3 bg-white/10 rounded-full hover:bg-amber-500/20 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Bookmark className="w-5 h-5 text-amber-300" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>

          {/* Bottom Images Grid */}
          {article.images.slice(1).length > 0 && (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {article.images.slice(1).map((img, i) => (
                <motion.div
                  key={i}
                  className="group overflow-hidden rounded-2xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition-all duration-500"
                  whileHover={{ y: -10 }}
                >
                  <Image
                    src={img}
                    onClick={() => setFullImg(img)}
                    alt={`Article image ${i + 2}`}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </motion.div>
              ))}
              
            </motion.div>
          )}

          {/* Back Button */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/news"
              className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500/10 text-amber-400 font-semibold rounded-full backdrop-blur-md hover:bg-amber-500/20 transition-all duration-300 hover:scale-105 border border-amber-500/30"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to News
            </Link>
          </motion.div>
          
        </section>
        {fullImg && <FullView img={fullImg} onClose={() => setFullImg(null)} />}
      </main>
      
      <Footer />
    </>
  );
}