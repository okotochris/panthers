'use client';

import { useEffect, useMemo, useState } from 'react';
import { format, parseISO, addHours, isAfter, isBefore } from 'date-fns';
import { Clock, Trophy } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import Header from '../component/header';
import Footer from '../component/footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const server = process.env.NEXT_PUBLIC_API_URL || '';

const PANTHERS_LOGO = '/logo.png';
const GENERIC_LOGO = '/generic-club.png';

type RawMatch = {
  id: number;
  league?: string | null;
  date: string;
  time?: string | null;
  venue?: string | null;
  club_name?: string | null; // opponent
  club_logo?: string | null;
  our_goal?: string | number | null;
  club_goal?: string | number | null;
};

type Match = RawMatch & {
  datetime: Date;
  status: 'upcoming' | 'live' | 'finished';
  minute?: number | null;
};

// parse date + optional time
function parseDateTime(m: RawMatch) {
  if (!m.date) return new Date(NaN);
  if (m.time) {
    const dateOnly = m.date.split('T')[0];
    return new Date(`${dateOnly}T${m.time}:00`);
  }
  return parseISO(m.date);
}

// compute status based on current time
function computeStatus(datetime: Date) {
  const now = new Date();
  const end = addHours(datetime, 2);
  if (isAfter(datetime, now)) return 'upcoming';
  if (isBefore(end, now)) return 'finished';
  return 'live';
}

function toNumber(v?: string | number | null) {
  if (v === null || v === undefined || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function formatShortDate(date: Date) {
  return format(date, 'MMM d');
}

function formatTime(date: Date) {
  return format(date, 'HH:mm');
}

/* --- Match Card --- */
function MatchCard({ m }: { m: Match }) {
  const our = toNumber(m.our_goal);
  const opp = toNumber(m.club_goal);

  // Status badge
  const statusBadge =
    m.status === 'live' ? (
      <Badge className="bg-red-600/90 text-white px-4 py-2 font-bold text-sm md:text-base">LIVE</Badge>
    ) : m.status === 'finished' ? (
      <Badge className="bg-amber-700/20 text-amber-300 px-4 py-2 font-bold text-sm md:text-base">FINISHED</Badge>
    ) : (
      <Badge className="bg-emerald-700/10 text-emerald-300 px-4 py-2 font-bold text-sm md:text-base">UPCOMING</Badge>
    );

  return (
    <motion.div whileHover={{ y: -6 }} className="relative">
        <div className="text-xs md:text-sm text-gray-400">{m.league ?? ''}</div>
      <Card className="overflow-hidden rounded-2xl border border-amber-900/20 bg-gradient-to-br from-slate-900/70 to-black/50">
        {/* Header: Our team vs Opponent */}
        <CardHeader className="flex items-center justify-between gap-4 pb-3">
          
          {/* Our Team */}
          <div className="flex items-center gap-3">
            <Image
              src={PANTHERS_LOGO}
              alt="Panthers"
              width={48}
              height={48}
              className="rounded-md object-contain bg-white/5 p-1"
            />
            <div>
              <div className="text-base md:text-lg font-bold text-amber-400">Panthers</div>
            </div>
          </div>

          {/* Opponent */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-base md:text-lg font-semibold text-white">{m.club_name}</div>
              
            </div>
            <Image
              src={m.club_logo ?? GENERIC_LOGO}
              alt={m.club_name ?? 'Opponent'}
              width={48}
              height={48}
              className="rounded-md object-contain bg-white/5 p-1"
            />
          </div>
        </CardHeader>

        {/* Score / Time */}
        <CardContent className="flex items-center justify-between gap-6 p-4">
          {/* Scores / Countdown */}
          {m.status === 'upcoming' ? (
            <div className="text-center">
              <div className="text-sm md:text-base text-amber-300 font-semibold">{formatShortDate(m.datetime)}</div>
              <div className="text-2xl md:text-3xl font-extrabold text-white tabular-nums">{formatTime(m.datetime)}</div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold tabular-nums">
                <span className="inline-block min-w-[40px]">{our ?? '-'}</span>
                <span className="mx-3 text-gray-400">–</span>
                <span className="inline-block min-w-[40px]">{opp ?? '-'}</span>
              </div>
              <div className="text-xs md:text-sm text-gray-400 mt-1">{m.venue ?? ''}</div>
            </div>
          )}

          {/* Status + League */}
          <div className="flex flex-col items-end gap-2 min-w-0">
            {statusBadge}
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span className="truncate max-w-[120px]">{m.league}</span>
            </div>
          </div>
        </CardContent>

        {/* Bottom line */}
        <div className="h-1 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600" />
      </Card>
    </motion.div>
  );
}

/* --- Matches Page --- */
export default function MatchesPage() {
  const [matchesRaw, setMatchesRaw] = useState<RawMatch[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedComp, setSelectedComp] = useState('All Competitions');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(`${server}/api/matches`)
      .then((res) => res.json())
      .then((data: RawMatch[]) => {
        if (!mounted) return;
        setMatchesRaw(Array.isArray(data) ? data : []);
      })
      .catch(() => mounted && setMatchesRaw([]))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const matches: Match[] = useMemo(() => {
    if (!matchesRaw) return [];
    return matchesRaw.map((m) => {
      const dt = parseDateTime(m);
      const status = computeStatus(dt);
      const minute = status === 'live' ? Math.floor((Date.now() - dt.getTime()) / 60000) : null;
      return { ...m, datetime: dt, status, minute };
    });
  }, [matchesRaw]);

  const filtered = matches.filter((m) => {
    const compOk =
      selectedComp === 'All Competitions' || (m.league ?? '').toLowerCase().includes(selectedComp.toLowerCase());
    const query = searchQuery.trim().toLowerCase();
    if (!query) return compOk;
    return (m.club_name ?? '').toLowerCase().includes(query) || (m.venue ?? '').toLowerCase().includes(query);
  });

  const live = matches.find((m) => m.status === 'live') ?? null;
  const lastPlayed =
    [...matches].filter((m) => m.status === 'finished').sort((a, b) => b.datetime.getTime() - a.datetime.getTime())[0] ??
    null;
  const upcoming = [...matches].filter((m) => m.status === 'upcoming').sort((a, b) => a.datetime.getTime() - b.datetime.getTime());

  return (
    <>
      <Header />
      <div className="h-14" />

      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-amber-950 text-white">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <motion.h1 className="text-5xl md:text-7xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200">
            Panthers Match Center
          </motion.h1>

          {live && (
            <section className="mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-red-400 text-center mb-6">LIVE NOW</h2>
              <div className="max-w-4xl mx-auto">
                <MatchCard m={live} />
              </div>
            </section>
          )}

          {lastPlayed && (
            <section className="mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-amber-400 text-center mb-6">Last Result</h2>
              <div className="max-w-4xl mx-auto">
                <MatchCard m={lastPlayed} />
              </div>
            </section>
          )}

          {upcoming.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-yellow-400 text-center mb-6">Upcoming Fixtures</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcoming.map((m) => (
                  <MatchCard key={m.id} m={m} />
                ))}
              </div>
            </section>
          )}

          {/* Controls & All Matches */}
          <section>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-amber-400">All Panthers Matches</h2>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search opponent or venue..."
                    className="pl-10 bg-black/50 text-white text-sm md:text-base"
                  />
                </div>

                <Select value={selectedComp} onValueChange={setSelectedComp}>
                  <SelectTrigger className="bg-black/50 border-amber-800/50 text-white min-w-[180px] text-sm md:text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {['All Competitions', 'Nigeria Premier League', 'Friendly', 'Cup'].map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {loading && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse p-4">
                    <div className="rounded-2xl bg-gray-800/50 h-48" />
                  </div>
                ))}
              </div>
            )}

            {!loading && filtered.length === 0 && (
              <p className="text-center py-20 text-gray-400 text-lg">No Panthers matches found</p>
            )}

            {!loading && filtered.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((m) => (
                  <MatchCard key={m.id} m={m} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
