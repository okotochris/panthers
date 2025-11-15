"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, Tag } from "lucide-react";
import Header from "../component/header";
import Footer from "../component/footer";


interface NewsArticle {
  id: number;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  slug: string;
  readTime: string;
  tags: string[];
}


export default function News() {
    const newsArticles = [
  {
    id: 1,
    title: 'Panthers Academy Secures Thrilling Victory in TCC League MD9',
    date: 'Nov 12, 2025',
    author: 'Academy Press',
    excerpt: 'Our young lions roared to a 2-1 win against Valiant FC, climbing to 2nd in the standings. Key highlights include a stunning brace from our star forward.',
    image: '/image1.jpg',
    slug: 'tcc-md9-victory',
    readTime: '5 min read',
    tags: ['TCC League', 'Victory', 'Youth Football']
  },
  {
    id: 2,
    title: 'Academy Accredited as Junior Secondary School – A New Era Begins',
    date: 'Nov 8, 2025',
    author: 'Admin',
    excerpt: 'Integrating elite training with academics to nurture complete athletes. This milestone allows us to offer formal education alongside world-class coaching.',
    image: '/image2.jpg',
    slug: 'accreditation-milestone',
    readTime: '4 min read',
    tags: ['Education', 'Accreditation', 'Development']
  },
  {
    id: 3,
    title: 'Player Spotlight: Rising Star Signs Pro Contract',
    date: 'Nov 10, 2025',
    author: 'Scout Report',
    excerpt: '18-year-old midfielder joins European club after standout season. His journey from our academy to professional leagues inspires the next generation.',
    image: '/image3.jpg',
    slug: 'pro-contract-signing',
    readTime: '6 min read',
    tags: ['Player Spotlight', 'Pro Contract', 'Success Story']
  },
  {
    id: 4,
    title: 'Training Camp Wrap-Up: Building Champions',
    date: 'Nov 5, 2025',
    author: 'Coach Insights',
    excerpt: 'Our intensive pre-season camp focused on fitness, tactics, and team bonding. Players return stronger and more united than ever.',
    image: '/image4.jpg',
    slug: 'training-camp-wrap-up',
    readTime: '3 min read',
    tags: ['Training', 'Preparation', 'Team Building']
  },
  {
    id: 5,
    title: 'Community Outreach: Academy Gives Back',
    date: 'Nov 3, 2025',
    author: 'CSR Team',
    excerpt: 'Volunteering at local schools and hosting free clinics to inspire young talents in underserved communities.',
    image: '/image5.jpg',
    slug: 'community-outreach',
    readTime: '4 min read',
    tags: ['Community', 'Outreach', 'Social Impact']
  },
  {
    id: 6,
    title: 'Nutrition Tips for Young Athletes',
    date: 'Oct 30, 2025',
    author: 'Nutritionist',
    excerpt: 'Expert advice on fueling performance and recovery for growing footballers. Balanced diets tailored to training demands.',
    image: '/image6.jpg',
    slug: 'nutrition-tips',
    readTime: '5 min read',
    tags: ['Health', 'Nutrition', 'Athlete Development']
  }
];
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white">
        <div className="h-32"></div>
        {/* HERO */}
        <section className="relative h-[380px] flex items-center justify-center overflow-hidden">
          <Image
            src="/groupphoto3.jpg"
            alt="Panthers Academy News"
            fill
            className="object-cover opacity-40"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="z-10 text-center px-6"
          >
            <h1 className="text-5xl font-black tracking-wide bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-lg">
              Panthers Newsroom
            </h1>
            <p className="mt-4 text-lg max-w-xl mx-auto text-gray-200">
              Match highlights • Academy milestones • Player spotlight • Transfers • Training updates
            </p>
          </motion.div>
        </section>

        {/* CONTENT AREA */}
        <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">

          {/* LEFT — ARTICLES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {newsArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-amber-500/20 backdrop-blur-xl transition-all hover:-translate-y-2"
              >
                
                {/* IMAGE */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />

                  {/* TAGS */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {article.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/20 text-amber-300 backdrop-blur-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* TEXT CONTENT */}
                <div className="p-6">
                  <div className="flex items-center text-xs text-gray-400 gap-4 mb-3">
                    <Calendar className="w-4 h-4" />
                    {article.date}
                    <Clock className="w-4 h-4 ml-3" />
                    {article.readTime}
                  </div>

                  <h2 className="text-xl font-bold mb-3 leading-tight hover:text-amber-300 transition">
                    {article.title}
                  </h2>

                  <p className="text-gray-300 text-sm mb-4">{article.excerpt}</p>

                  <Link
                    href={`/news/${article.slug}`}
                    className="text-amber-400 font-semibold hover:text-amber-300 inline-flex gap-2 items-center"
                  >
                    Read full story →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* RIGHT — STICKY SIDEBAR */}
          <aside className="hidden lg:block sticky top-28 h-fit space-y-8">

            {/* FILTER BOX */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl backdrop-blur-md">
              <h3 className="text-lg font-bold mb-4 text-amber-300 flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Popular Tags
              </h3>

              <div className="flex flex-wrap gap-2">
                {["TCC League", "Training", "Player Spotlight", "Academy", "Community"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-amber-500/10 border border-amber-400/20 rounded-full text-xs text-amber-300 hover:bg-amber-500/20 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* FEATURED BOX */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 shadow-xl backdrop-blur-md">
              <h3 className="text-lg font-bold mb-4">Featured Story</h3>

              <p className="text-sm opacity-90">
                Breaking: Panthers Academy secures major sponsorship partnership to expand training facilities.
              </p>

              <button className="mt-4 text-amber-300 font-semibold hover:text-amber-200">
                Read More →
              </button>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </>
  );
}
