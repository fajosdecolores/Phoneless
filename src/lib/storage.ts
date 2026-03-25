
export interface UserStats {
  totalValidSeconds: number;
  totalSessions: number;
  bestSessionSeconds: number;
  currentStreak: number;
  dailyProgressSeconds: number;
  lastCompletedDate: string | null; // ISO date string YYYY-MM-DD
  lastProgressDate: string | null; // ISO date string YYYY-MM-DD
}

export interface User {
  id: string;
  name: string;
  surname?: string;
  age?: number;
  email?: string;
  phone?: string;
  variant: 'warm' | 'cool' | 'soft';
  hasSelectedCoral: boolean;
  stats: UserStats;
}

export interface DockSession {
  id: string;
  dockId?: string;
  userId: string;
  startAt: number; // timestamp
  endAt?: number; // timestamp
  rawDurationSeconds: number;
  validDurationSeconds: number;
  stageReached: number;
}

export interface AppState {
  currentUserId: string | null;
  users: User[];
  activeSession: {
    userId: string;
    startAt: number;
    dockId?: string;
  } | null;
  sessionHistory: DockSession[];
}

const STORAGE_KEY = 'timeout_app_state';

const DEFAULT_STATE: AppState = {
  currentUserId: 'user-1',
  users: [
    {
      id: 'user-1',
      name: 'Sasha',
      variant: 'warm',
      hasSelectedCoral: false,
      stats: {
        totalValidSeconds: 0,
        totalSessions: 0,
        bestSessionSeconds: 0,
        currentStreak: 0,
        dailyProgressSeconds: 0,
        lastCompletedDate: null,
        lastProgressDate: null,
      },
    },
  ],
  activeSession: null,
  sessionHistory: [],
};

export const saveState = (state: AppState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const loadState = (): AppState => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return DEFAULT_STATE;
  try {
    const state = JSON.parse(stored);
    // Migration for existing users if needed
    state.users.forEach((u: User) => {
      if (u.hasSelectedCoral === undefined) u.hasSelectedCoral = true;
      if (u.stats.dailyProgressSeconds === undefined) u.stats.dailyProgressSeconds = 0;
      if (u.stats.lastCompletedDate === undefined) u.stats.lastCompletedDate = null;
      if (u.stats.lastProgressDate === undefined) u.stats.lastProgressDate = null;
    });
    return state;
  } catch (e) {
    return DEFAULT_STATE;
  }
};

export const resetState = () => {
  localStorage.removeItem(STORAGE_KEY);
  return DEFAULT_STATE;
};

export const updateActiveSession = (session: AppState['activeSession']) => {
  const state = loadState();
  state.activeSession = session;
  saveState(state);
};

export const clearActiveSession = () => {
  const state = loadState();
  state.activeSession = null;
  saveState(state);
};

export const addSessionToHistory = (session: DockSession) => {
  const state = loadState();
  state.sessionHistory.push(session);
  
  // Update user stats
  const user = state.users.find(u => u.id === session.userId);
  if (user) {
    user.stats.totalSessions += 1;
    user.stats.totalValidSeconds += session.validDurationSeconds;
    if (session.validDurationSeconds > user.stats.bestSessionSeconds) {
      user.stats.bestSessionSeconds = session.validDurationSeconds;
    }
  }
  
  saveState(state);
};
