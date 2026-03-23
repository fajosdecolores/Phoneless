import { CoralVariant, FamilyMember, HabitStep, WeeklyData, ReclaimedActivity } from './types';

export const CORAL_VARIANTS: CoralVariant[] = [
  { id: 'warm', name: 'Warm Sun', hue: 25, description: 'Radiant orange and soft white tones.' },
  { id: 'cool', name: 'Cool Deep', hue: 190, description: 'Serene aqua and deep ocean blues.' },
  { id: 'soft', name: 'Soft Bloom', hue: 280, description: 'Gentle lavender and pink hues.' },
];

export const FAMILY_MEMBERS: FamilyMember[] = [
  { id: '1', name: 'Sasha', day: 14, variant: 'warm', streak: 14, daily: "4.2h", weekly: 85, stats: [4, 5, 3, 6, 4, 5, 4] },
  { id: '2', name: 'Mom', day: 21, variant: 'soft', streak: 21, daily: "5.1h", weekly: 98, stats: [5, 6, 5, 4, 6, 7, 5] },
  { id: '3', name: 'Dad', day: 8, variant: 'cool', streak: 8, daily: "3.8h", weekly: 72, stats: [3, 4, 3, 5, 4, 3, 4] },
];

export const HABIT_PLAN: HabitStep[] = [
  { day: 1, stage: "Initiation", description: "The first step is the hardest. Your coral is just beginning to take root." },
  { day: 9, stage: "Adaptation", description: "Your brain is adapting to the new routine. Repetition is strengthening the habit loop." },
  { day: 21, stage: "Integration", description: "The habit is now a natural part of your daily life." }
];

export const WEEKLY_DATA: WeeklyData[] = [
  { day: 'M', hours: 4.2 },
  { day: 'T', hours: 5.1 },
  { day: 'W', hours: 3.8 },
  { day: 'T', hours: 6.2 },
  { day: 'F', hours: 4.5 },
  { day: 'S', hours: 7.1 },
  { day: 'S', hours: 5.4 },
];

export const RECLAIMED_ACTIVITIES: ReclaimedActivity[] = [
  { id: '1', name: 'Reading', time: '12h', icon: 'BookOpen' },
  { id: '2', name: 'Walking', time: '8h', icon: 'Footprints' },
  { id: '3', name: 'Sleeping', time: '15h', icon: 'Moon' },
];

export const GlassEffect = "bg-white/60 backdrop-blur-2xl border border-white/30 shadow-sm";
