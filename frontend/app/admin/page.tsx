"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Minus, X, Trash2 } from "lucide-react";
import Header from "../component/header";
import Footer from "../component/footer";
import formatFullDate from "../component/formatFullDate";
import Rotating from "@/components/ui/rotating";

const server = process.env.NEXT_PUBLIC_API_URL
type Player = {
  id: number;
  name: string
  images: string
  position: string
  goal: number
  assist: number
  matchplayed: number
  card: { yellow: number; red: number };
}
type Martches = {
  id: number;
  club_name: string;
  date: string;
  time: string
   club_goal:number
  our_goal:number
}
type News = {
  id: number,
  title: string;
  content: string
}
type Highlight = {
  id: number;
  description: string
}
interface HighlightForm {
  league: string;
  description: string;
  video: File | null; // video can be null initially
}
type Coach = {
  id: number;
  name: string;
}
export default function AdminPage() {
  const [isShowing, setIsShowing] = useState(false);
  const [player, setPlayers] = useState<Player[]>([]);
  const [matches, setMartch] = useState<Martches[]>([]);
  const [matchesDrawn, setMatchesDrawn] = useState(8);
  const [matchesLost, setMatchesLost] = useState(8);
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [isLoading, setIsLoading] = useState(false)
  const [err, setErr] = useState(false)
  const [message, setMessage] = useState('')
  const [highlight, setHighlight] = useState<Highlight[]>([])
  const [news, setNews] = useState<News[]>([])
  const [isDeleting, setIsDeleting] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [playerSearch, setPlayerSearch] = useState(""); // Search state
  const [matchSearch, setMatchSearch] = useState("")
const [updateTimers, setUpdateTimers] = useState<Record<number, NodeJS.Timeout>>({}); // Timer per player


  useEffect(() => {
    async function getData() {
      const result = await fetch(`${server}/api/admin`)
      const data = await result.json()
      const { player, news, coach, highlight, match } = data
      setPlayers(player)
      setMartch(match)
      setCoaches(coach)
      setHighlight(highlight)
      setNews(news)

    };
    getData()
  }, [])

  const [form, setForm] = useState<HighlightForm>({
    league: "",
    description: "",
    video: null, // start as null
  })

  function cancel() {
    setShowPopup(false)
    return false;
  }
  function confirm() {
    setShowPopup(false)
    return true;
  }

  // Handle text input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Use FormData to send file + text
      const formData = new FormData();
      formData.append("league", form.league);
      formData.append("description", form.description);
      if (form.video) formData.append("video", form.video);

      const res = await fetch(`${server}/api/highlight`, {
        method: "POST",
        body: formData, // <-- do NOT set Content-Type manually
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErr(true);
        throw new Error(data.msg || "Failed to upload");
      }

      // Reset form
      setForm({
        league: "",
        description: "",
        video: null,
      });
      setMessage(data.msg || "File uploaded successfully");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Server Error";
      setMessage(message);
      setErr(true);
    } finally {
      setIsLoading(false);
    }
  };


  async function handleDelete(id: number, url: string) {
    setIsLoading(true)
    try {
      const data = await fetch(`${server}/api/${url}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      })
      if (!data.ok) {
        return
      }
      if (url == 'news') {
        setNews(news.filter(item => item.id !== id))
      } else if (url == 'player') {
        setPlayers(player.filter(item => item.id !== id))
      } else if (url === 'highlight') {
        setHighlight(highlight.filter(item => item.id !== id))
      } else if (url === 'coach') {
        setCoaches(coaches.filter(item => item.id !== id))
      } else if (url === 'match') {
        setMartch(matches.filter(item => item.id !== id))
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }
  // Increment/Decrement handlers
// Updated player stat handler with patch scheduling
const updateStat = (
  id: number,
  field: "goal" | "assist" | "matchplayed" | "yellow" | "red",
  type: "inc" | "dec"
) => {
  setPlayers((prev) =>
    prev.map((p) => {
      if (p.id !== id) return p;

      if (field === "yellow" || field === "red") {
        return {
          ...p,
          card: {
            ...p.card,
            [field]: type === "inc" ? p.card[field] + 1 : Math.max(0, p.card[field] - 1)
          }
        };
        
      }

      return {
        ...p,
        [field]: type === "inc" ? (p[field] as number) + 1 : Math.max(0, (p[field] as number) - 1)
      };
    })
  );
  schedulePatchUpdate(id)
};



// Filtered players based on search
const filteredPlayers = player.filter((p) =>
  p.name.toLowerCase().includes(playerSearch.toLowerCase())
);
 const filteredMatch = matches.filter(m=>
  m.club_name.toLowerCase().includes(matchSearch.toLowerCase())
 )
// Auto-update function with 5s delay
const schedulePatchUpdate = (playerId: number) => {
  if (updateTimers[playerId]) clearTimeout(updateTimers[playerId]);

  const timer = setTimeout(async () => {
    const p = player.find((pl) => pl.id === playerId);
    if (!p) return;

    try {
      setIsLoading(true)
      await fetch(`${server}/api/player/${playerId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal: p.goal,
          assist: p.assist,
          matchplayed: p.matchplayed,
          card: p.card,
        }),
      });
      console.log(`Player ${p.name} stats updated!`);
    } catch (err) {
      console.error(err);
    }finally{
      setIsLoading(false)
    }
  }, 5000);

  setUpdateTimers((prev) => ({ ...prev, [playerId]: timer }));
};

async function updateGoal(goal:string, id:number, field:string) {
  setIsLoading(true)
  try {
    const data = await fetch(`${server}/api/gaols`, {
      method:"PATCH",
      headers:{"Content-Type":"Application/json"},
      body:JSON.stringify({goal, id, field})
    })
  } catch (err) {
    console.log(err)
  }finally{
    setIsLoading(false)
  }
}
  return (
    <>
      <Header />
      <div className="h-14 mt-4"></div>


      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800 text-white px-6 py-12">

        <h1 className="text-4xl font-extrabold text-amber-400 text-center mb-12 tracking-wide">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 p-6 bg-gray-900 rounded-2xl border border-white/10 my-9">
          {/* Total Players */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-xl text-center shadow-lg transform hover:scale-105 transition">
            <div className="text-4xl font-bold text-white">
              {player?.length || 0}
            </div>
            <div className="text-blue-200 text-sm mt-2 font-medium">
              Total Players
            </div>
            <div className="text-blue-300 text-xs mt-1">Active Squad</div>
          </div>

          {/* Matches Won */}
          <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-xl text-center shadow-lg transform hover:scale-105 transition">
            <div className="text-4xl font-bold text-white">{matches.length || 0}</div>
            <div className="text-green-200 text-sm mt-2 font-medium">
              Matches Won
            </div>
            <div className="text-green-300 text-xs mt-1">Victory Count</div>
          </div>

          {/* Matches Drawn */}
          <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 p-6 rounded-xl text-center shadow-lg transform hover:scale-105 transition">
            <div className="text-4xl font-bold text-white">
              {matchesDrawn || 0}
            </div>
            <div className="text-yellow-200 text-sm mt-2 font-medium">
              Matches Drawn
            </div>
            <div className="text-yellow-300 text-xs mt-1">Tied Games</div>
          </div>

          {/* Matches Lost */}
          <div className="bg-gradient-to-br from-red-600 to-red-800 p-6 rounded-xl text-center shadow-lg transform hover:scale-105 transition">
            <div className="text-4xl font-bold text-white">
              {matchesLost || 0}
            </div>
            <div className="text-red-200 text-sm mt-2 font-medium">
              Matches Lost
            </div>
            <div className="text-red-300 text-xs mt-1">Defeats</div>
          </div>

          {/* Total Coaches */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-xl text-center shadow-lg transform hover:scale-105 transition">
            <div className="text-4xl font-bold text-white">
              {coaches.length || 0}
            </div>
            <div className="text-purple-200 text-sm mt-2 font-medium">
              Coaches
            </div>
            <div className="text-purple-300 text-xs mt-1">Staff Members</div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {/* 🟡 PLAYERS SECTION */}
          <section className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/10">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-amber-300">
      Total Players {player.length}
    </h2>
    <Link
      href="/admin/player"
      className="bg-amber-500 px-5 py-2.5 rounded-xl text-black font-semibold hover:bg-amber-600 transition"
    >
      Add Player
    </Link>
  </div>

  <input
    type="text"
    placeholder="Search players"
    value={playerSearch}
    onChange={(e) => setPlayerSearch(e.target.value)}
    className="w-full h-12 px-5 pr-12 bg-gray-800/90 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent focus:bg-gray-900 transition-all duration-300 ease-in-out shadow-lg hover:shadow-amber-500/10 text-lg font-medium tracking-wide backdrop-blur-sm my-4"
  />

  <ul className="space-y-5">
    {filteredPlayers.map((p) => (
      <li
        key={p.id}
        className="bg-white/5 p-4 rounded-2xl shadow-lg border border-white/10"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-2 relative">
          <Link href={`/players/${p.id}`} className="hover:text-amber-500">
            <p className="font-bold text-lg">{p.name}</p>
          </Link>
          <img
            src={p.images[0]}
            alt={p.name}
            className="h-16 w-14 object-cover rounded-lg shadow-md"
          />
          <Trash2
            className="hover:text-amber-400 absolute -top-6 -right-6"
            onClick={() => handleDelete(p.id, "player")}
          />
        </div>

        {/* Position */}
        <p className="text-gray-300 text-sm mb-3">{p.position}</p>

        {/* Stats */}
        <div className="space-y-3">
          {/* Goals */}
          <div className="flex justify-between items-center">
            <p className="font-medium">Goals: {p.goal}</p>
            <div className="flex gap-2">
              <button
              disabled={isLoading}
                onClick={() => updateStat(p.id, "goal", "dec")}
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => updateStat(p.id, "goal", "inc")}
                disabled={isLoading}
                className="p-2 bg-amber-500 rounded-full hover:bg-amber-600 transition text-black"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Assists */}
          <div className="flex justify-between items-center">
            <p className="font-medium">Assists: {p.assist}</p>
            <div className="flex gap-2">
              <button
                onClick={() => updateStat(p.id, "assist", "dec")}
                disabled={isLoading}
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => updateStat(p.id, "assist", "inc")}
                disabled={isLoading}
                className="p-2 bg-amber-500 rounded-full hover:bg-amber-600 transition text-black"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Match Played */}
          <div className="flex justify-between items-center">
            <p className="font-medium">Matches: {p.matchplayed}</p>
            <div className="flex gap-2">
              <button
                onClick={() => updateStat(p.id, "matchplayed", "dec")}
                disabled={isLoading}
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => updateStat(p.id, "matchplayed", "inc")}
                disabled={isLoading}
                className="p-2 bg-amber-500 rounded-full hover:bg-amber-600 transition text-black"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="flex justify-between items-center">
            <p className="font-medium">Yellow: {p.card.yellow}</p>
            <div className="flex gap-2">
              <button
                onClick={() => updateStat(p.id, "yellow", "dec")}
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => updateStat(p.id, "yellow", "inc")}
                disabled={isLoading}
                className="p-2 bg-yellow-500 rounded-full hover:bg-yellow-600 transition text-black"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <p className="font-medium">Red: {p.card.red}</p>
            <div className="flex gap-2">
              <button
                onClick={() => updateStat(p.id, "red", "dec")}
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => updateStat(p.id, "red", "inc")}
                disabled={isLoading}
                className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition text-black"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </li>
    ))}
  </ul>
</section>


          {/* 🔵 MATCHES SECTION */}
          <section className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-amber-300">Matches {matches.length}</h2>
              <Link href={"/admin/martch"}>
                <button
                disabled={isLoading}
                  className="bg-amber-500 px-5 py-2.5 rounded-xl text-black font-semibold hover:bg-amber-600 transition"
                >
                  Add Match
                </button>
              </Link>
            </div>
            <input
              value={matchSearch}
              onChange={(e)=>setMatchSearch(e.target.value)}
              type="text"
              placeholder="Search Opponent club name"
              className="w-full h-12 px-5 pr-12 bg-gray-800/90 border border-gray-700 
                        rounded-xl text-white placeholder-gray-500
                        focus:outline-none focus:ring-2 focus:ring-amber-500 
                        focus:border-transparent focus:bg-gray-900
                        transition-all duration-300 ease-in-out
                        shadow-lg hover:shadow-amber-500/10
                        text-lg font-medium tracking-wide
                        backdrop-blur-sm my-4"
            />
            <ul className="space-y-5">
              {filteredMatch.map((m) => (
                <div className="relative" key={m.id}>
                  <li
                    className="bg-white/5 p-4 rounded-2xl shadow-lg border border-white/10"
                  >
                    <p className="font-bold text-lg">Panthers vs {m.club_name}</p>
                     <p className="text-gray-100 text-lg">
                      Our Goals: 
                      <span 
                      className="pl-2.5 text-amber-500" 
                      contentEditable
                      suppressContentEditableWarning={true}
                      onInput={(e)=>updateGoal(e.currentTarget.textContent, m.id, 'our_goal')}
                      >
                        {m.our_goal || 0}</span>
                       </p>
                      <p className="text-gray-100 text-lg">
                        Opponent Goals: 
                        <span 
                        className="pl-2.5 text-amber-500" 
                        contentEditable
                        suppressContentEditableWarning={true}
                        onInput={(e)=>updateGoal(e.currentTarget.textContent, m.id, "club_goal")}
                        >
                          {m.club_goal || 0}
                          </span> 
                        </p>
                    <p className="text-gray-400 text-sm">{formatFullDate(m.date)} Time: {m.time}</p>
                  </li>
                  <Trash2 className="absolute top-0 right-0 hover:text-amber-400"
                    onClick={() => handleDelete(m.id, "match")}
                  />
                </div>
              ))}
            </ul>
          </section>

          {/* 🔴 COACH SECTION */}
          <section className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-amber-300">
                Total Coaches {coaches.length}
              </h2>

              <Link
                href="/admin/coach"
                className="bg-amber-500 px-5 py-2.5 rounded-xl text-black font-semibold hover:bg-amber-600 transition"
              >
                Add Coach
              </Link>
            </div>
          
            <ul className="space-y-5">
              {coaches.map((c) => (
                <div className="relative" key={c.id}>
                  <li
                    className="bg-white/5 p-4 rounded-2xl shadow-lg border border-white/10"
                  >
                    <p className="font-bold text-lg">{c.name}</p>
                  </li>
                  <Trash2 className="hover:text-amber-400 absolute top-0 right-0" />
                </div>
              ))}
            </ul>
          </section>

          {/* 🔴 COACH Highlight */}
          <section className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-amber-300">
                Total Highlight {highlight.length}
              </h2>

              <button
                onClick={() => setIsShowing(true)}
                disabled={isLoading}
                className="bg-amber-500 px-5 py-2.5 rounded-xl text-black font-semibold hover:bg-amber-600 transition"
              >
                Add Highlight
              </button>
            </div>
           
            <ul className="space-y-5">
              {highlight.map((c) => (
                <div className="relative" key={c.id}>
                  <li
                    className="bg-white/5 p-4 rounded-2xl shadow-lg border border-white/10"
                  >
                    <Link href={`/highlights/${c.id}`} className="hover:text-amber-500">
                      <p className="font-bold text-lg">{c.description}</p>
                    </Link>
                  </li>
                  <Trash2 className="hover:text-amber-400 absolute top-0 right-0"
                    onClick={() => handleDelete(c.id, "highlight")}
                  />
                </div>
              ))}
            </ul>
          </section>

          {/* 🔴 News */}
          <section className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-amber-300">
                Total News {news.length}
              </h2>
              <Link href={'/admin/news'}>
                <button
                disabled={isLoading}
                  className="bg-amber-500 px-5 py-2.5 rounded-xl text-black font-semibold hover:bg-amber-600 transition"
                >
                  Add News
                </button>
              </Link>
            </div>
          
            <ul className="space-y-5">
              {news.map((c) => (
                <div className="relative" key={c.id}>
                  <li
                    className="bg-white/5 p-4 rounded-2xl shadow-lg border border-white/10"
                  >
                    <Link href={`/news/${c.id}`}>
                      <h3 className="font-bold text-lg text-blue-400 hover:text-amber-500">{c.title}</h3>
                    </Link>
                    <p className="font-bold text-lg">{c.content.substring(0, 100) + "..."}</p>
                  </li>
                  <Trash2 className="hover:text-amber-400 absolute top-0 right-0"
                    onClick={() => handleDelete(c.id, "news")}
                  />
                </div>
              ))}
            </ul>
          </section>

        </div>
      </main>
      <Footer />

      {isShowing && (
        <>
          {/* Backdrop + Full Screen Overlay */}
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            {/* Optional: Click outside to close */}
            <div
              className="absolute inset-0"
              onClick={() => setIsShowing(false)}
            />

            {/* Modal Card */}
            <div className="relative bg-gray-900 rounded-2xl shadow-2xl border border-white/10 w-full max-w-lg mx-4 max-h-screen overflow-y-auto">
              {/* Close Button - Top Right */}
              <button
                onClick={() => setIsShowing(false)}
                disabled={isLoading}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition backdrop-blur-sm"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <h2 className="text-2xl font-bold text-white text-center">
                  Add Match Highlight
                </h2>

                {/* League Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    League Name
                  </label>
                  <input
                    type="text"
                    name="league"
                    value={form.league}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="e.g. Nigeria Premier League"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Description (Optional)
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="e.g. About the highlight"
                  />
                </div>

                {/* Video Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Upload Video
                  </label>
                  <input
                    type="file"
                    name="video"
                    accept="video/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setForm({ ...form, video: e.target.files[0] });
                      }
                    }}
                    required
                    className="mt-1 w-full text-white bg-white/10 border border-white/20 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl transition flex items-center justify-center"
                >
                  {isLoading
                    ? <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                    : "Add Match"
                  }
                </button>
              </form>

              <div className="text-2xl text-center" style={{ color: err ? "red" : "green" }}>
                {message}
              </div>
            </div>

          </div>

          {/* Prevent body scroll when modal is open */}
          <style jsx>{`
            body {
              overflow: hidden;
            }
          `}</style>
        </>
      )}
    {isLoading && <Rotating />}
    </>
  );
}
