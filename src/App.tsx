/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Waves, 
  BarChart2, 
  Users, 
  Settings as SettingsIcon, 
  Clock, 
  Calendar, 
  Trophy,
  Film,
  Dumbbell,
  Zap,
  ChevronRight,
  ChevronLeft,
  Plus,
  X,
  Smartphone,
  Info,
  User,
  Bell,
  Shield,
  Palette,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utilities ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Mock Data ---
const WEEKLY_DATA = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 3.2 },
  { day: 'Wed', hours: 2.4 },
  { day: 'Thu', hours: 4.1 },
  { day: 'Fri', hours: 1.8 },
  { day: 'Sat', hours: 5.5 },
  { day: 'Sun', hours: 4.8 },
];

const CORAL_VARIANTS = [
  { id: 'warm', name: 'Warm Sun', colors: { start: '#FFFFFF', end: '#FF8C42' }, hue: 25 },
  { id: 'cool', name: 'Cool Deep', colors: { start: '#FFFFFF', end: '#48CAE4' }, hue: 190 },
  { id: 'soft', name: 'Soft Bloom', colors: { start: '#FFFFFF', end: '#9D4EDD' }, hue: 280 },
];

const FAMILY_MEMBERS = [
  { id: 1, name: 'Sasha', daily: '2h 24m', weekly: 75, health: 85, streak: 12, variant: 'warm', day: 12, stats: [2, 3, 1.5, 4, 2, 5, 4.5] },
  { id: 2, name: 'Alex', daily: '1h 12m', weekly: 45, health: 40, streak: 5, variant: 'cool', day: 5, stats: [1, 1.5, 0.5, 2, 1, 2.5, 1.2] },
  { id: 3, name: 'Jordan', daily: '3h 45m', weekly: 90, health: 95, streak: 19, variant: 'soft', day: 19, stats: [4, 4.5, 3.5, 5, 4, 6, 5.5] },
];

const RECLAIMED_ACTIVITIES = [
  { id: 1, title: 'Watching a movie', duration: '4h', icon: <Film className="w-5 h-5" />, color: 'bg-blue-100 text-blue-600' },
  { id: 2, title: 'Gym workout', duration: '1h', icon: <Dumbbell className="w-5 h-5" />, color: 'bg-emerald-100 text-emerald-600' },
  { id: 3, title: 'Focused work', duration: '30m', icon: <Zap className="w-5 h-5" />, color: 'bg-amber-100 text-amber-600' },
];

const HABIT_PLAN = [
  { day: 1, stage: "Initiation", description: "Starting the journey. Focus on consistency." },
  { day: 9, stage: "Adaptation", description: "Your brain is adapting to the new routine. Repetition is strengthening the habit loop." },
  { day: 21, stage: "Integration", description: "The habit is now a natural part of your daily life." }
];

// --- Components ---

const GlassEffect = "glass";

const CoralAvatar = ({ variant = 'warm', day = 1, size = 48 }: { variant?: string; day?: number; size?: number }) => {
  const getCoralColor = (v: string, d: number) => {
    const intensity = (d / 21);
    const saturation = 10 + intensity * 80;
    const lightness = 95 - intensity * 35;
    
    let hue = 25;
    if (v === 'cool') hue = 190;
    if (v === 'soft') hue = 280;
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };
  
  const color = getCoralColor(variant, day);
  
  return (
    <div style={{ width: size, height: size }} className="flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
        <path 
          d="M100,180 Q100,140 100,100 M100,150 Q80,130 60,120 Q40,110 50,80 M100,140 Q120,120 140,110 Q160,100 150,70 M60,120 Q50,100 30,90 M140,110 Q150,90 170,80 M100,100 Q90,70 110,40 M100,110 Q110,80 90,50" 
          stroke={color} 
          strokeWidth="12" 
          fill="none" 
          strokeLinecap="round" 
        />
      </svg>
    </div>
  );
};

const BranchingCoral = ({ variant = 'warm', day = 9, size = 256 }: { variant?: string; day?: number; size?: number }) => {
  // Health determines color/vibrancy
  // Day determines growth/size
  const getCoralColor = (v: string, d: number) => {
    const intensity = (d / 21);
    const saturation = 10 + intensity * 80;
    const lightness = 95 - intensity * 35;
    
    let hue = 25;
    if (v === 'cool') hue = 190;
    if (v === 'soft') hue = 280;
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const coralColor = getCoralColor(variant, day);
  const scale = 0.7 + (day / 21) * 0.5;

  // Branch paths for a classic coral silhouette
  const branches = [
    { d: "M100,180 Q100,140 100,100", w: 28 }, // Main Trunk
    { d: "M100,150 Q80,130 60,120 Q40,110 50,80", w: 20 }, // Left major
    { d: "M100,140 Q120,120 140,110 Q160,100 150,70", w: 18 }, // Right major
    { d: "M60,120 Q50,100 30,90", w: 14 }, // Left sub
    { d: "M140,110 Q150,90 170,80", w: 12 }, // Right sub
    { d: "M100,100 Q90,70 110,40", w: 16 }, // Center top
    { d: "M100,110 Q110,80 90,50", w: 14 }, // Center top sub
  ];

  // Secondary organic elements (algae/plants) at the base - blob shapes
  const algae = [
    { d: "M70,185 Q60,175 70,165 Q85,160 95,175 Q100,190 80,190 Z", color: "#A8DADC", opacity: 0.4 }, // Soft aqua blob
    { d: "M110,185 Q125,170 140,180 Q145,195 125,195 Q110,195 110,185 Z", color: "#B7E4C7", opacity: 0.5 }, // Sea green blob
    { d: "M90,190 Q80,180 100,170 Q115,175 110,190 Q105,200 90,190 Z", color: "#FDE2E4", opacity: 0.3 }, // Soft pink blob
  ];

  // Fish circles for the thriving ecosystem (Day 21)
  const fishes = [
    { id: 1, color: "#FFD166", size: 3, duration: 12, delay: 0, path: [[100, 100], [160, 80], [140, 40], [60, 60], [40, 120], [100, 100]] },
    { id: 2, color: "#06D6A0", size: 2, duration: 15, delay: 2, path: [[100, 120], [40, 80], [60, 30], [140, 50], [160, 140], [100, 120]] },
    { id: 3, color: "#EF476F", size: 4, duration: 18, delay: 4, path: [[120, 100], [170, 120], [150, 160], [50, 150], [30, 100], [120, 100]] },
    { id: 4, color: "#118AB2", size: 2.5, duration: 14, delay: 1, path: [[80, 140], [30, 120], [50, 70], [130, 80], [150, 130], [80, 140]] },
  ];

  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: scale, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center"
    >
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl overflow-visible">
        {/* Algae at base - Blob shapes */}
        {algae.map((a, i) => (
          <motion.path
            key={`algae-${i}`}
            d={a.d}
            fill={a.color}
            fillOpacity={a.opacity}
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Coral Branches */}
        {branches.map((b, i) => (
          <motion.path
            key={`branch-${i}`}
            d={b.d}
            stroke={coralColor}
            strokeWidth={b.w}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: 1,
            }}
            transition={{ 
              duration: 2, 
              delay: i * 0.1,
              ease: "easeOut"
            }}
          />
        ))}
        
        {/* Swaying animation applied separately to avoid "tips first" issue */}
        {branches.map((b, i) => (
          <motion.path
            key={`sway-${i}`}
            d={b.d}
            stroke={coralColor}
            strokeWidth={b.w}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              d: [
                b.d,
                b.d.replace(/Q(\d+),(\d+)/, (_, x, y) => `Q${parseInt(x) + (i % 2 === 0 ? 3 : -3)},${parseInt(y)}`),
                b.d
              ]
            }}
            transition={{ 
              opacity: { duration: 0.1, delay: 2 + i * 0.1 },
              d: { duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: 2 }
            }}
            className="pointer-events-none"
          />
        ))}

        {/* Thriving Ecosystem: Fish circles (Day 21 only) */}
        {day >= 21 && fishes.map((f) => (
          <motion.circle
            key={`fish-${f.id}`}
            r={f.size}
            fill={f.color}
            initial={{ cx: f.path[0][0], cy: f.path[0][1], opacity: 0 }}
            animate={{ 
              opacity: [0, 0.6, 0.6, 0],
              cx: f.path.map(p => p[0]),
              cy: f.path.map(p => p[1]),
            }}
            transition={{ 
              duration: f.duration, 
              repeat: Infinity, 
              ease: "linear",
              delay: f.delay,
              opacity: { times: [0, 0.1, 0.9, 1], duration: f.duration, repeat: Infinity }
            }}
            className="blur-[0.5px]"
          />
        ))}
      </svg>
    </motion.div>
  );
};

const Card = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void; key?: React.Key }) => (
  <div 
    onClick={onClick}
    className={cn("bg-white rounded-[32px] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-white/50", className)}
  >
    {children}
  </div>
);

const Header = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="px-6 pt-12 pb-6">
    <h1 className="text-3xl font-medium tracking-tight text-muted-navy">{title}</h1>
    {subtitle && <p className="text-slate-400 mt-1 font-light tracking-wide">{subtitle}</p>}
  </div>
);

// --- Screens ---

const CoralSelectionScreen = ({ onSelect }: { onSelect: (variant: string) => void }) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center min-h-screen bg-pastel-blue/30 px-6 pt-20 pb-12 w-full"
    >
      <div className="text-center mb-12">
        <h1 className="text-3xl font-medium text-muted-navy tracking-tight">Choose Your Coral</h1>
        <p className="text-slate-500 font-light mt-2">Pick a companion for your 21-day journey</p>
      </div>

      <div className="grid grid-cols-1 gap-6 w-full max-w-sm">
        {CORAL_VARIANTS.map((variant) => (
          <motion.div
            key={variant.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected(variant.id)}
            className={cn(
              "relative p-6 rounded-[32px] transition-all cursor-pointer flex items-center gap-6",
              selected === variant.id 
                ? "bg-white shadow-xl border-2 border-muted-navy/10" 
                : "bg-white/40 border border-white/50"
            )}
          >
            <div className="w-24 h-24 flex-shrink-0">
              <BranchingCoral variant={variant.id} day={21} size={96} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-muted-navy">{variant.name}</h3>
              <p className="text-xs text-slate-400 font-light mt-1">Vibrant {variant.id} tones</p>
            </div>
            {selected === variant.id && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-muted-navy rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-auto w-full max-w-sm">
        <button
          disabled={!selected}
          onClick={() => selected && onSelect(selected)}
          className={cn(
            "w-full py-5 rounded-2xl font-medium transition-all shadow-lg",
            selected 
              ? "bg-muted-navy text-white shadow-muted-navy/20" 
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          )}
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
};

const DockModeDisplay = ({ variant, day, onExit }: { variant: string, day: number, onExit: () => void }) => {
  const [time, setTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-slate-900 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Underwater Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(72,202,228,0.1),transparent_70%)] animate-pulse" />
      </div>

      <button 
        onClick={onExit}
        className="absolute top-12 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/50 hover:text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-8xl font-light text-white tracking-tighter">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </h1>
          <p className="text-white/30 font-light tracking-[0.3em] uppercase mt-4">Docked Mode</p>
        </motion.div>

        <div className="scale-150">
          <BranchingCoral variant={variant} day={day} />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20"
        >
          <p className="text-white/40 font-light italic text-lg">Restoring your digital reef...</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const CoralScreen = ({ variant, day, progress }: { variant: string, day: number, progress: number }) => {
  const [showStreakPanel, setShowStreakPanel] = useState(false);
  const [showEvolutionInfo, setShowEvolutionInfo] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center min-h-screen relative overflow-hidden pb-32 bg-off-white w-full"
    >
      {/* Streak Panel (Slide Down - Absolute to cover button) */}
      <AnimatePresence>
        {showStreakPanel && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 left-0 right-0 z-[70] bg-pastel-blue px-8 pb-12 pt-16 rounded-b-[48px] shadow-2xl"
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-medium text-2xl text-muted-navy">21-Day Habit</h3>
              <button onClick={() => setShowStreakPanel(false)} className="text-slate-400 p-1">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-base text-slate-600 font-light leading-relaxed mb-6">
              This program helps you build the habit of docking your phone when you get home. Consistency is key to restoring your digital reef.
            </p>
            <div className="bg-white/40 p-5 rounded-3xl border border-white/50">
              <p className="text-slate-700 font-medium text-sm">
                Day {day} — {day < 7 ? "Initiation" : day < 15 ? "Adaptation" : "Integration"} Stage. Your brain is {day < 7 ? "starting to" : day < 15 ? "adapting to" : "fully integrated with"} this habit.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Streak Button (Top Left) */}
      <div className="absolute top-12 left-6 z-[60]">
        <motion.button
          onClick={() => setShowStreakPanel(!showStreakPanel)}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center font-medium text-lg transition-all shadow-sm",
            "bg-pastel-blue text-slate-600 border border-white/40"
          )}
        >
          {day}
        </motion.button>
      </div>

      <div className="flex-1 flex flex-col items-center w-full px-6 pt-16">
        {/* Statistic Text - Aligned higher and refined typography */}
        <div className="text-center mb-10">
          <h2 className="text-5xl font-light text-muted-navy tracking-tight">3h 20m</h2>
          <p className="text-slate-400 font-light tracking-wide mt-1">phone-free today</p>
        </div>

        <div className="relative group cursor-pointer mb-10 w-[320px] h-[320px] flex items-center justify-center" onClick={() => setShowEvolutionInfo(!showEvolutionInfo)}>
          {/* Progress Ring - Modified to have a gap at the top (90 degrees removed) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 320 320" className="w-[320px] h-[320px]">
              {/* Background Arc (270 degrees) */}
              <path
                d="M 262.5 57.5 A 145 145 0 1 1 57.5 57.5"
                fill="none"
                stroke="rgba(0,0,0,0.03)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Progress Arc */}
              <motion.path
                d="M 262.5 57.5 A 145 145 0 1 1 57.5 57.5"
                fill="none"
                stroke={CORAL_VARIANTS.find(v => v.id === variant)?.colors.end || "#FFB5A7"}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="683.3"
                initial={{ strokeDashoffset: 683.3 }}
                animate={{ strokeDashoffset: 683.3 - (683.3 * progress) }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </svg>
          </div>
          
          <BranchingCoral variant={variant} day={day} size={256} />
        </div>

        <div className="flex flex-col items-center gap-3 w-full max-w-[280px]">
          <AnimatePresence>
            {showEvolutionInfo && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={cn(
                  "w-full p-4 rounded-2xl text-center shadow-sm",
                  GlassEffect
                )}
              >
                <p className="text-sm font-medium text-slate-600">
                  Next coral stage in: <span className="text-slate-900">1h 40m</span>
                </p>
                <p className="text-[10px] text-slate-400 mt-1 font-light tracking-widest uppercase">Evolving soon</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center">
            <p className="text-slate-400 font-light italic tracking-wide">Your coral is slowly recovering</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const StatisticsScreen = ({ currentDay, variant, onPreviewDay, previewDay }: { currentDay: number, variant: string, onPreviewDay: (day: number | null) => void, previewDay: number | null }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-32 bg-off-white min-h-screen w-full"
    >
      {/* Top Hero Section - Light Blue */}
      <div className="bg-pastel-blue pt-16 pb-12 px-6 rounded-b-[48px] shadow-[0_10px_30px_-10px_rgba(224,242,247,0.5)]">
        <div className="mb-8">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-[0.2em] mb-2">This Week</p>
          <h2 className="text-4xl font-light text-muted-navy tracking-tight">18h 45m</h2>
          <p className="text-sm font-light text-slate-500 mt-1">Phone-free time this week</p>
        </div>

        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={WEEKLY_DATA} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 400 }}
                dy={10}
                interval={0}
                tickFormatter={(value) => value.charAt(0)}
              />
              <Tooltip 
                cursor={false}
                contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
              />
              <Bar dataKey="hours" radius={[100, 100, 100, 100]} barSize={28}>
                {WEEKLY_DATA.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === 5 ? '#CBD5E1' : '#1E293B'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Lower Section - White */}
      <div className="px-6 space-y-4 mt-10">
        <div className="grid grid-cols-1 gap-4">
          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-pastel-blue/40 flex items-center justify-center text-slate-600">
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-400 font-light tracking-wide">Today</p>
              <p className="text-xl font-medium text-muted-navy">3h 20m</p>
            </div>
          </Card>

          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-pastel-coral/40 flex items-center justify-center text-slate-600">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-400 font-light tracking-wide">This Week</p>
              <p className="text-xl font-medium text-muted-navy">18h 45m</p>
            </div>
          </Card>

          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-400 font-light tracking-wide">Total Reclaimed</p>
              <p className="text-xl font-medium text-muted-navy">142h</p>
            </div>
          </Card>
        </div>

        {/* 21-Day Challenge Visualization Section */}
        <div className="pt-6">
          <h3 className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em] px-1 mb-4">21-Day Challenge</h3>
          <Card className="bg-white border-none shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h4 className="font-medium text-lg tracking-tight">Day {currentDay} of 21</h4>
                <p className="text-slate-500 text-sm font-light">
                  {currentDay < 7 ? "Initiation Stage" : currentDay < 15 ? "Adaptation Stage" : "Integration Stage"}
                </p>
              </div>
              {previewDay !== null && (
                <button 
                  onClick={() => onPreviewDay(null)}
                  className="text-xs text-muted-navy font-medium bg-pastel-blue/30 px-3 py-1 rounded-full"
                >
                  Reset Preview
                </button>
              )}
            </div>

            <div className="grid grid-cols-7 gap-3 mb-6">
              {Array.from({ length: 21 }).map((_, i) => {
                const day = i + 1;
                const isCurrent = day === currentDay;
                const isPast = day < currentDay;
                const isSelected = previewDay === day;
                
                return (
                  <motion.button
                    key={day}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onPreviewDay(day)}
                    className={cn(
                      "w-full aspect-square rounded-xl flex items-center justify-center text-xs font-medium transition-all relative",
                      isSelected ? "bg-muted-navy text-white shadow-lg scale-110 z-10" :
                      isCurrent ? "bg-pastel-blue text-muted-navy border-2 border-muted-navy/20" : 
                      isPast ? "bg-muted-navy/10 text-muted-navy/60" : "bg-slate-50 text-slate-300"
                    )}
                  >
                    {day}
                    {isCurrent && !isSelected && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-muted-navy rounded-full animate-pulse" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            <div className="bg-pastel-blue/20 p-4 rounded-2xl border border-white/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex-shrink-0">
                  <BranchingCoral variant={variant} day={previewDay || currentDay} size={48} />
                </div>
                <p className="text-xs leading-relaxed font-light text-slate-600">
                  <span className="font-medium block text-muted-navy mb-0.5">
                    {previewDay ? `Previewing Day ${previewDay}` : `Current: Day ${currentDay}`}
                  </span>
                  {previewDay 
                    ? "Tap any day to see how your coral evolves throughout the challenge."
                    : "Your coral grows more vibrant and detailed as you maintain your habit."}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

const AddUserModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      {/* Backdrop for focus effect */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-md"
      />
      
      {/* Bottom Sheet Window */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={cn(
          "w-full max-w-lg bg-white rounded-t-[48px] shadow-2xl relative z-10 overflow-hidden pb-12",
          "border-t border-white/20"
        )}
      >
        {/* Visual handle for sheet feel */}
        <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mt-4 mb-2" />
        
        <div className="w-full flex flex-col items-center pt-8 px-8">
          <div className="w-20 h-20 bg-pastel-blue/30 rounded-full flex items-center justify-center mb-6">
            <Smartphone className="w-10 h-10 text-slate-600 animate-pulse" />
          </div>
          <h3 className="text-2xl font-medium text-muted-navy mb-2 tracking-tight">Connect User</h3>
          <p className="text-slate-500 mb-4 leading-relaxed font-light text-sm text-center">
            Scan the user's Time-Out Dock to connect.
          </p>
          <p className="text-slate-400 mb-12 leading-relaxed font-light text-xs text-center px-4">
            The user will need to confirm the connection in their Time-Out app before their activity data can be shared.
          </p>
          
          <button 
            onClick={onClose}
            className="w-full py-4 rounded-2xl bg-muted-navy text-white font-medium shadow-lg shadow-muted-navy/20"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const DetailedStatsView = ({ member, onBack }: { member: any, onBack: () => void }) => {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 z-[90] bg-off-white overflow-y-auto pb-32"
    >
      <div className="px-6 pt-16 pb-6 flex items-center gap-4">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-medium text-muted-navy">{member.name}'s Activity</h2>
      </div>
      
      <div className="px-6 space-y-8">
        <Card className="space-y-4">
          <h3 className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em]">Weekly Phone-Free Time</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={member.stats.map((s: number, i: number) => ({ day: ['M', 'T', 'W', 'T', 'F', 'S', 'S'][i], hours: s }))}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Bar dataKey="hours" fill="#FFB5A7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="space-y-4">
          <h3 className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em] px-1">Daily Breakdown</h3>
          <Card className="divide-y divide-slate-50 p-0 overflow-hidden">
             <div className="px-5 py-4 flex justify-between items-center">
                <span className="text-sm text-slate-600 font-light">Daily Average</span>
                <span className="text-sm font-medium text-muted-navy">{member.daily}</span>
             </div>
             <div className="px-5 py-4 flex justify-between items-center">
                <span className="text-sm text-slate-600 font-light">Weekly Goal Progress</span>
                <span className="text-sm font-medium text-muted-navy">{member.weekly}%</span>
             </div>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em] px-1">Habit Streak</h3>
          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-pastel-blue/20 flex items-center justify-center text-slate-600">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-navy">Day {member.streak} of 21</p>
              <p className="text-xs text-slate-400 font-light">Consistency is key to adaptation.</p>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

const FamilyScreen = () => {
  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const ecosystemHealth = useMemo(() => {
    const total = FAMILY_MEMBERS.reduce((acc, m) => acc + m.day, 0);
    return Math.round(total / FAMILY_MEMBERS.length);
  }, []);

  const ecosystemColor = useMemo(() => {
    const intensity = ecosystemHealth / 21;
    const saturation = 10 + intensity * 80;
    const lightness = 95 - intensity * 35;
    return `hsl(190, ${saturation}%, ${lightness}%)`; // Ecosystem defaults to a blended aqua
  }, [ecosystemHealth]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-32 min-h-screen bg-off-white w-full"
    >
      <div className="flex justify-between items-center px-6 pt-16 pb-6">
        <div>
          <h1 className="text-3xl font-medium tracking-tight text-muted-navy">Family</h1>
          <p className="text-slate-400 mt-1 font-light tracking-wide">Coral health comparison</p>
        </div>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowAddUser(true)}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-all",
            GlassEffect,
            "text-slate-600 border-white/40"
          )}
        >
          <Plus className="w-6 h-6" />
        </motion.button>
      </div>

      <div className="px-6 space-y-6">
        {/* Ecosystem System */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em] px-1">Shared Ecosystem</h3>
          <Card className="relative overflow-hidden p-0 h-40 flex items-center justify-center">
            <div 
              className="absolute inset-0 transition-colors duration-1000"
              style={{ 
                background: `radial-gradient(circle at 50% 50%, ${ecosystemColor}44, transparent 70%)`,
                backgroundColor: `${ecosystemColor}11`
              }}
            />
            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center gap-4 mb-2">
                {FAMILY_MEMBERS.map(m => (
                  <div key={m.id} className="scale-75 -mx-2">
                    <CoralAvatar variant={m.variant} day={m.day} size={40} />
                  </div>
                ))}
              </div>
              <h4 className="text-xl font-medium text-muted-navy">Reef Health: {Math.round((ecosystemHealth / 21) * 100)}%</h4>
              <p className="text-xs text-slate-400 font-light">Combined family vitality</p>
            </div>
            
            {/* Ambient Animation */}
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(circle at 50% 50%, ${ecosystemColor}22, transparent 80%)` }}
            />
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em] px-1">Family Overview</h3>
          <div className="space-y-6">
            {FAMILY_MEMBERS.map((member) => (
              <Card key={member.id} className="flex items-center gap-6 py-6">
                <CoralAvatar variant={member.variant} day={member.day} size={64} />
                <div className="flex-1">
                  <h3 className="font-medium text-muted-navy text-lg">{member.name}</h3>
                  <p className="text-xs text-slate-400 font-light tracking-wide">Day {member.streak} Streak</p>
                </div>
                <div className="text-right">
                  <div 
                    className="w-4 h-4 rounded-full ml-auto mb-1" 
                    style={{ 
                      backgroundColor: CORAL_VARIANTS.find(v => v.id === member.variant)?.colors.end || "#FFB5A7",
                      opacity: 0.3 + (member.day / 21) * 0.7
                    }} 
                  />
                  <p className="text-[10px] text-slate-300 font-medium uppercase tracking-widest">Health</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em] px-1">Parental Control</h3>
          <Card 
            onClick={() => setSelectedMember(FAMILY_MEMBERS[1])} // Example: Alex
            className="flex items-center gap-4 cursor-pointer active:opacity-70 transition-opacity"
          >
            <div className="w-12 h-12 rounded-full bg-muted-navy/5 flex items-center justify-center text-muted-navy">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-muted-navy">View Detailed Stats</p>
              <p className="text-xs text-slate-400 font-light">Monitor screen usage and habits</p>
            </div>
            <ChevronRight className="text-slate-200 w-5 h-5" />
          </Card>
        </div>
      </div>

      <AnimatePresence>
        {showAddUser && <AddUserModal onClose={() => setShowAddUser(false)} />}
        {selectedMember && <DetailedStatsView member={selectedMember} onBack={() => setSelectedMember(null)} />}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Settings Components ---

const Toggle = ({ active, onToggle }: { active: boolean, onToggle?: () => void }) => (
  <div 
    onClick={(e) => {
      if (onToggle) {
        e.stopPropagation();
        onToggle();
      }
    }}
    className={cn(
      "w-11 h-6 rounded-full transition-colors relative",
      onToggle ? "cursor-pointer" : "",
      active ? "bg-pastel-blue" : "bg-slate-200"
    )}
  >
    <motion.div 
      animate={{ x: active ? 22 : 2 }}
      className="w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm"
    />
  </div>
);

const SettingsRow = ({ icon: Icon, label, onClick, rightElement }: { icon?: any, label: string, onClick?: () => void, rightElement?: React.ReactNode }) => (
  <div 
    onClick={onClick}
    className={cn(
      "w-full flex items-center justify-between py-4 px-1 group transition-opacity",
      onClick ? "cursor-pointer active:opacity-70" : ""
    )}
  >
    <div className="flex items-center gap-4">
      {Icon && (
        <div className="w-8 h-8 rounded-lg bg-pastel-blue/20 flex items-center justify-center text-slate-500">
          <Icon className="w-4 h-4" />
        </div>
      )}
      <span className="font-light text-slate-600">{label}</span>
    </div>
    {rightElement || <ChevronRight className="text-slate-200 w-5 h-5" />}
  </div>
);

const MainSettingsMenu = ({ onNavigate, onOpenDock }: { onNavigate: (s: string) => void, onOpenDock: () => void }) => (
  <motion.div
    key="main-settings"
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -20, opacity: 0 }}
  >
    <Header title="Settings" subtitle="App and device configuration" />
    <div className="px-6 space-y-8">
      <div className="space-y-3">
        <h3 className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em] px-1">Device</h3>
        <Card className="divide-y divide-slate-50 p-0 overflow-hidden">
          <div className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-pastel-blue/30 flex items-center justify-center text-slate-600">
              <Waves className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-muted-navy">Time-Out Dock</p>
              <p className="text-xs text-slate-400 font-light">Connected • Living Room</p>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
          </div>
          <div className="px-4">
            <SettingsRow 
              icon={Smartphone} 
              label="Dock Mode Settings" 
              onClick={() => onNavigate('dock')} 
            />
          </div>
        </Card>
        
        <button
          onClick={onOpenDock}
          className="w-full py-4 rounded-2xl bg-muted-navy text-white font-medium shadow-lg shadow-muted-navy/10 flex items-center justify-center gap-2"
        >
          <Smartphone className="w-4 h-4" />
          Open Dock View
        </button>
      </div>

      <div className="space-y-3">
        <h3 className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em] px-1">Account</h3>
        <Card className="divide-y divide-slate-50 p-0 overflow-hidden">
          <div className="px-4">
            <SettingsRow icon={User} label="Profile" onClick={() => onNavigate('profile')} />
            <SettingsRow icon={Bell} label="Notification Reminders" onClick={() => onNavigate('notifications')} />
            <SettingsRow icon={Shield} label="Privacy & Data" onClick={() => onNavigate('privacy')} />
            <SettingsRow icon={Palette} label="Appearance" onClick={() => onNavigate('appearance')} />
          </div>
        </Card>
      </div>

      <div className="pt-4 pb-10">
        <button className="w-full py-4 rounded-2xl bg-white border border-slate-100 text-slate-400 font-medium text-sm tracking-wide">
          Sign Out
        </button>
        <p className="text-center text-[10px] text-slate-300 mt-6 font-light tracking-widest uppercase">
          Time-Out v1.0.4
        </p>
      </div>
    </div>
  </motion.div>
);

const DockModeScreen = ({ onBack }: { onBack: () => void }) => {
  const [settings, setSettings] = useState({
    calls: true,
    messages: true,
    priority: false,
    essential: true,
    social: false,
    others: false
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <motion.div
      key="dock-settings"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 20, opacity: 0 }}
    >
      <div className="px-6 pt-12 pb-6 flex items-center gap-4">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-medium text-muted-navy">Dock Mode</h2>
      </div>

      <div className="px-6 space-y-8 pb-32">
        <p className="text-sm text-slate-400 font-light leading-relaxed">
          Choose which notifications can still reach you while your phone is in Dock Mode.
        </p>

        <Card className="divide-y divide-slate-50 p-0 overflow-hidden">
          <div className="px-4 py-1">
            <div className="py-2">
              <SettingsRow 
                label="Phone Calls" 
                onClick={() => toggle('calls')}
                rightElement={<Toggle active={settings.calls} />} 
              />
              <p className="text-[10px] text-slate-300 px-1 pb-3 -mt-2">Allow incoming calls while the phone is docked.</p>
            </div>
            
            <div className="py-2">
              <SettingsRow 
                label="Important Messages" 
                onClick={() => toggle('messages')}
                rightElement={<Toggle active={settings.messages} />} 
              />
              <p className="text-[10px] text-slate-300 px-1 pb-3 -mt-2">Allow SMS or important personal messages.</p>
            </div>

            <div className="py-2">
              <SettingsRow 
                label="Priority Contacts" 
                onClick={() => toggle('priority')}
                rightElement={<Toggle active={settings.priority} />} 
              />
              <p className="text-[10px] text-slate-300 px-1 pb-3 -mt-2">Allow notifications only from selected contacts.</p>
            </div>

            <div className="py-2">
              <SettingsRow 
                label="Essential Apps" 
                onClick={() => toggle('essential')}
                rightElement={<Toggle active={settings.essential} />} 
              />
              <p className="text-[10px] text-slate-300 px-1 pb-3 -mt-2">Allow notifications from selected productivity or work apps.</p>
            </div>

            <div className="py-2">
              <SettingsRow 
                label="Social Apps" 
                onClick={() => toggle('social')}
                rightElement={<Toggle active={settings.social} />} 
              />
              <p className="text-[10px] text-slate-300 px-1 pb-3 -mt-2">Allow notifications from social media apps.</p>
            </div>

            <div className="py-2">
              <SettingsRow 
                label="All Other Apps" 
                onClick={() => toggle('others')}
                rightElement={<Toggle active={settings.others} />} 
              />
              <p className="text-[10px] text-slate-300 px-1 pb-3 -mt-2">Allow or block notifications from remaining apps.</p>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

const ProfileScreen = ({ onBack }: { onBack: () => void }) => {
  return (
    <motion.div
      key="profile-settings"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 20, opacity: 0 }}
    >
      <div className="px-6 pt-12 pb-6 flex items-center gap-4">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-medium text-muted-navy">Profile</h2>
      </div>

      <div className="px-6 flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-pastel-blue/20 flex items-center justify-center border-4 border-white shadow-sm overflow-hidden mb-4">
          <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-60">
            <path d="M50 80 Q40 60 50 40 T50 10" stroke="#FFB5A7" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M50 60 Q70 50 80 30" stroke="#FFB5A7" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M50 50 Q30 40 20 20" stroke="#FFB5A7" strokeWidth="4" fill="none" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-muted-navy font-medium">Alex Rivera</p>
        <p className="text-xs text-slate-400 font-light">Member since March 2026</p>
      </div>

      <div className="px-6 space-y-6 pb-32">
        <div className="space-y-2">
          <h3 className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em] px-1">Personal Details</h3>
          <Card className="divide-y divide-slate-50 p-0 overflow-hidden">
            <div className="px-5 py-4 flex justify-between items-center">
              <span className="text-xs text-slate-400 font-light">Name</span>
              <span className="text-sm text-slate-600">Alex</span>
            </div>
            <div className="px-5 py-4 flex justify-between items-center">
              <span className="text-xs text-slate-400 font-light">Surname</span>
              <span className="text-sm text-slate-600">Rivera</span>
            </div>
            <div className="px-5 py-4 flex justify-between items-center">
              <span className="text-xs text-slate-400 font-light">Age</span>
              <span className="text-sm text-slate-600">28</span>
            </div>
          </Card>
        </div>

        <div className="space-y-2">
          <h3 className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em] px-1">Contact Information</h3>
          <Card className="divide-y divide-slate-50 p-0 overflow-hidden">
            <div className="px-5 py-4 flex justify-between items-center">
              <span className="text-xs text-slate-400 font-light">Email Address</span>
              <span className="text-sm text-slate-600">alex.rivera@example.com</span>
            </div>
            <div className="px-5 py-4 flex justify-between items-center">
              <span className="text-xs text-slate-400 font-light">Phone Number</span>
              <span className="text-sm text-slate-600">+1 (555) 012-3456</span>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

const NotificationRemindersScreen = ({ onBack }: { onBack: () => void }) => {
  const options = [
    "Every 10 minutes",
    "Every 20 minutes",
    "Every 30 minutes",
    "Every 1 hour",
    "Every 2 hours",
    "Every 3 hours"
  ];
  const [selected, setSelected] = useState(options[3]);

  return (
    <motion.div
      key="notification-settings"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 20, opacity: 0 }}
    >
      <div className="px-6 pt-12 pb-6 flex items-center gap-4">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-medium text-muted-navy">Reminders</h2>
      </div>

      <div className="px-6 space-y-8 pb-32">
        <p className="text-sm text-slate-400 font-light leading-relaxed">
          Choose how often you’d like gentle reminders about your screen usage.
        </p>

        <Card className="divide-y divide-slate-50 p-0 overflow-hidden">
          {options.map((option) => (
            <button 
              key={option}
              onClick={() => setSelected(option)}
              className="w-full px-5 py-5 flex justify-between items-center active:bg-slate-50 transition-colors"
            >
              <span className={cn(
                "text-sm transition-colors",
                selected === option ? "text-muted-navy font-medium" : "text-slate-500 font-light"
              )}>
                {option}
              </span>
              {selected === option && <Check className="w-5 h-5 text-pastel-blue" />}
            </button>
          ))}
        </Card>
      </div>
    </motion.div>
  );
};

const PlaceholderSubScreen = ({ title, onBack }: { title: string, onBack: () => void }) => (
  <motion.div
    key="placeholder-settings"
    initial={{ x: 20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 20, opacity: 0 }}
  >
    <div className="px-6 pt-12 pb-6 flex items-center gap-4">
      <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <h2 className="text-2xl font-medium text-muted-navy">{title}</h2>
    </div>
    <div className="px-6 py-12 text-center">
      <p className="text-slate-400 font-light italic">This section is coming soon in the next update.</p>
    </div>
  </motion.div>
);

const SettingsScreen = ({ onOpenDock }: { onOpenDock: () => void }) => {
  const [subScreen, setSubScreen] = useState<string>('main');

  const renderSubScreen = () => {
    switch (subScreen) {
      case 'dock':
        return <DockModeScreen onBack={() => setSubScreen('main')} />;
      case 'profile':
        return <ProfileScreen onBack={() => setSubScreen('main')} />;
      case 'notifications':
        return <NotificationRemindersScreen onBack={() => setSubScreen('main')} />;
      case 'privacy':
        return <PlaceholderSubScreen title="Privacy & Data" onBack={() => setSubScreen('main')} />;
      case 'appearance':
        return <PlaceholderSubScreen title="Appearance" onBack={() => setSubScreen('main')} />;
      default:
        return <MainSettingsMenu onNavigate={setSubScreen} onOpenDock={onOpenDock} />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-off-white w-full"
    >
      <AnimatePresence mode="wait">
        {renderSubScreen()}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('coral');
  const [hasSelectedCoral, setHasSelectedCoral] = useState(false);
  const [selectedCoral, setSelectedCoral] = useState('warm');
  const [currentDay, setCurrentDay] = useState(9);
  const [isDockModeOpen, setIsDockModeOpen] = useState(false);
  const [previewDay, setPreviewDay] = useState<number | null>(null);

  const displayDay = previewDay !== null ? previewDay : currentDay;

  const renderScreen = () => {
    if (!hasSelectedCoral) {
      return <CoralSelectionScreen onSelect={(v) => {
        setSelectedCoral(v);
        setHasSelectedCoral(true);
      }} />;
    }

    switch (activeTab) {
      case 'coral': return <CoralScreen variant={selectedCoral} day={displayDay} progress={0.65} />;
      case 'stats': return <StatisticsScreen currentDay={currentDay} variant={selectedCoral} onPreviewDay={setPreviewDay} previewDay={previewDay} />;
      case 'family': return <FamilyScreen />;
      case 'settings': return <SettingsScreen onOpenDock={() => setIsDockModeOpen(true)} />;
      default: return <CoralScreen variant={selectedCoral} day={displayDay} progress={0.65} />;
    }
  };

  const tabs = [
    { id: 'coral', label: 'Coral', icon: Waves },
    { id: 'stats', label: 'Stats', icon: BarChart2 },
    { id: 'family', label: 'Family', icon: Users },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-off-white font-sans text-muted-navy selection:bg-pastel-blue selection:text-slate-900 w-full">
      {/* Status Bar Spacer (iOS style) */}
      {activeTab !== 'stats' && activeTab !== 'coral' && <div className="h-12 w-full bg-off-white sticky top-0 z-50" />}

      <main className="max-w-lg mx-auto min-h-screen relative">
        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {isDockModeOpen && (
          <DockModeDisplay 
            variant={selectedCoral} 
            day={currentDay} 
            onExit={() => setIsDockModeOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      {hasSelectedCoral && (
        <nav className={cn(
          "fixed bottom-8 left-6 right-6 rounded-[32px] pb-4 pt-4 px-6 z-50 max-w-lg mx-auto",
          GlassEffect
        )}>
        <div className="max-w-lg mx-auto flex justify-between items-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex flex-col items-center gap-1 group relative"
              >
                <div className={cn(
                  "p-2 rounded-2xl transition-all duration-300",
                  isActive ? "text-muted-navy bg-pastel-blue/40" : "text-slate-300 group-hover:text-slate-400"
                )}>
                  <Icon className={cn("w-5 h-5", isActive && "fill-muted-navy/5")} />
                </div>
                <span className={cn(
                  "text-[9px] font-medium tracking-widest uppercase transition-colors duration-300",
                  isActive ? "text-muted-navy" : "text-slate-300"
                )}>
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -top-1 w-1 h-1 bg-muted-navy rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
      )}
    </div>
  );
}
