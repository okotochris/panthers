// app/matches/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { format, parseISO, addHours, isAfter, isBefore } from 'date-fns';
import { Search, Trophy, Clock } from 'lucide-react';
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
  date: string; // ISO or date string from DB
  time?: string | null; // "16:01" or null
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

const competitions = ['All Competitions', 'Nigeria Premier League', 'Friendly', 'Cup'];

function parseDateTime(m: RawMatch) {
  // Prefer full ISO in date; if time exists and date is date-only, combine safely.
  // If `date` is already an ISO with time, parseISO handles it.
  try {
    if (!m.date) return new Date(NaN);
    // If time is provided separately and date doesn't include a time portion:
    if (m.time) {
      // Normalize: date might be "2025-12-03T00:00:00.000Z" or "2025-12-03"
      const dateOnly = m.date.split('T')[0];
      // build a string as YYYY-MM-DDT{time}:00 (assume local)
      const combined = `${dateOnly}T${m.time}:00`;
      return new Date(combined);
    }
    return parseISO(m.date);
  } catch {
    return parseISO(m.date);
  }
}

function computeStatus(datetime: Date) {
  const now = new Date();
  const end = addHours(datetime, 2); // assume 2 hours match duration
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
  try {
    return format(date, 'MMM d');
  } catch {
    return '';
  }
}
function formatTime(date: Date) {
  try {
    return format(date, 'HH:mm');
  } catch {
    return '';
  }
}

/* --- UI pieces --- */

function LoadingSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse p-4">
          <div className="rounded-2xl bg-gray-800/50 h-40" />
        </div>
      ))}
    </div>
  );
}

function MatchCard({ m }: { m: Match }) {
  const our = toNumber(m.our_goal);
  const opp = toNumber(m.club_goal);

  const resultBlock =
    m.status === 'upcoming' ? (
      <div className="text-center">
        <div className="text-sm text-amber-300 font-semibold">{formatShortDate(m.datetime)}</div>
        <div className="text-2xl font-extrabold text-white tabular-nums">{formatTime(m.datetime)}</div>
      </div>
    ) : (
      <div className="text-center">
        <div className="text-3xl font-extrabold tabular-nums">
          <span className="inline-block min-w-[36px]">{our ?? '-'}</span>
          <span className="mx-3 text-gray-400">–</span>
          <span className="inline-block min-w-[36px]">{opp ?? '-'}</span>
        </div>
        <div className="text-xs text-gray-400 mt-1">{m.venue ?? ''}</div>
      </div>
    );

  const statusBadge =
    m.status === 'live' ? (
      <Badge className="bg-red-600/90 text-white px-3 py-1.5 font-bold">LIVE</Badge>
    ) : m.status === 'finished' ? (
      <Badge className="bg-amber-700/20 text-amber-300 px-3 py-1.5">FINISHED</Badge>
    ) : (
      <Badge className="bg-emerald-700/10 text-emerald-300 px-3 py-1.5">UPCOMING</Badge>
    );

  return (
    <motion.div whileHover={{ y: -6 }} className="relative">
      <Card className="overflow-hidden rounded-2xl border border-amber-900/20 bg-gradient-to-br from-slate-900/60 to-black/50">
        <CardHeader className="flex items-start justify-between gap-3 pb-3">
          <div className="flex items-center gap-3 min-w-0">
            <Image
              src={PANTHERS_LOGO}
              alt="Panthers"
              width={40}
              height={40}
              className="rounded-md object-contain bg-white/5 p-1"
            />
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">Panthers</div>
              <div className="text-xs text-gray-400 truncate">{m.league ?? ''}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right min-w-0">
              <div className="text-xs text-gray-400">{m.club_name}</div>
            </div>
            <Image
              src={m.club_logo ?? GENERIC_LOGO}
              alt={m.club_name ?? 'Opponent'}
              width={44}
              height={44}
              className="rounded-md object-contain bg-white/5 p-1"
            />
          </div>
        </CardHeader>

        <CardContent className="flex items-center justify-between gap-4 p-4">
          {/* left: opponent */}
          <div className="flex-1 min-w-0">
            <div className="text-sm text-gray-300 truncate">{m.club_name}</div>
            <div className="text-xs text-gray-500 mt-1 truncate">{m.venue ?? ''}</div>
          </div>

          {/* center: score or time */}
          <div className="mx-4">{resultBlock}</div>

          {/* right: status and league */}
          <div className="flex flex-col items-end gap-2 min-w-0">
            {statusBadge}
            <div className="text-xs text-gray-400 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="truncate max-w-[120px]">{m.league}</span>
            </div>
          </div>
        </CardContent>

        <div className="h-1 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600" />
      </Card>
    </motion.div>
  );
}

/* --- Page component --- */

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
      .catch((err) => {
        console.error('Failed to fetch matches', err);
        if (mounted) setMatchesRaw([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const matches: Match[] = useMemo(() => {
    if (!matchesRaw) return [];
    return matchesRaw.map((m) => {
      const dt = parseDateTime(m);
      const status = computeStatus(dt);
      // optional minute calc if live: minutes since kick-off
      const minute =
        status === 'live' ? Math.max(0, Math.floor((Date.now() - dt.getTime()) / 60000)) : null;
      return { ...m, datetime: dt, status, minute };
    });
  }, [matchesRaw]);

  // filters
  const filtered = matches.filter((m) => {
    const compOk = selectedComp === 'All Competitions' || (m.league ?? '').toLowerCase().includes(selectedComp.toLowerCase());
    const query = searchQuery.trim().toLowerCase();
    if (!query) return compOk;
    const name = (m.club_name ?? '').toLowerCase();
    const venue = (m.venue ?? '').toLowerCase();
    return compOk && (name.includes(query) || venue.includes(query));
  });

  const live = matches.find((m) => m.status === 'live') || null;
  const lastPlayed = [...matches].filter((m) => m.status === 'finished').sort((a, b) => b.datetime.getTime() - a.datetime.getTime())[0] ?? null;
  const upcoming = [...matches].filter((m) => m.status === 'upcoming').sort((a, b) => a.datetime.getTime() - b.datetime.getTime());

  return (
    <>
      <Header />
      <div className="h-14" />

      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-amber-950 text-white">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200">
            Panthers Match Center
          </motion.h1>

          {/* Live */}
          {live && (
            <section className="mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-red-400 text-center mb-6">LIVE NOW</h2>
              <div className="max-w-4xl mx-auto">
                <MatchCard m={live} />
              </div>
            </section>
          )}

          {/* Last Result */}
          {lastPlayed && (
            <section className="mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-amber-400 text-center mb-6">Last Result</h2>
              <div className="max-w-4xl mx-auto">
                <MatchCard m={lastPlayed} />
              </div>
            </section>
          )}

          {/* Upcoming */}
          {upcoming.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-yellow-400 text-center mb-6">Upcoming Fixtures</h2>
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
              <h2 className="text-2xl md:text-3xl font-bold text-amber-400">All Panthers Matches</h2>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search opponent or venue..." className="pl-10 bg-black/50 text-white" />
                </div>

                <Select value={selectedComp} onValueChange={setSelectedComp}>
                  <SelectTrigger className="bg-black/50 border-amber-800/50 text-white min-w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {competitions.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {loading && <LoadingSkeleton />}

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
