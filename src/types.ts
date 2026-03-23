export interface CoralVariant {
  id: string;
  name: string;
  hue: number;
  description: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  day: number;
  variant: string;
  streak: number;
  daily: string;
  weekly: number;
  stats: number[];
}

export interface HabitStep {
  day: number;
  stage: string;
  description: string;
}

export interface WeeklyData {
  day: string;
  hours: number;
}

export interface ReclaimedActivity {
  id: string;
  name: string;
  time: string;
  icon: string;
}
