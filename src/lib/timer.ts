
export const STAGE_THRESHOLDS = [
  { stage: 1, seconds: 0, label: 'Initiation' },
  { stage: 2, seconds: 300, label: 'Adaptation' }, // 5 mins
  { stage: 3, seconds: 900, label: 'Integration' }, // 15 mins
  { stage: 4, seconds: 1800, label: 'Thriving' }, // 30 mins
  { stage: 5, seconds: 3600, label: 'Mastery' }, // 60 mins
];

export const DAILY_GOAL_SECONDS = 5 * 3600; // 5 hours

export const calculateElapsed = (startAt: number) => {
  const now = Date.now();
  const rawSeconds = Math.max(0, Math.floor((now - startAt) / 1000));
  return { rawSeconds, validSeconds: rawSeconds };
};

export const getStageFromSeconds = (seconds: number) => {
  let currentStage = STAGE_THRESHOLDS[0];
  for (const threshold of STAGE_THRESHOLDS) {
    if (seconds >= threshold.seconds) {
      currentStage = threshold;
    } else {
      break;
    }
  }
  return currentStage;
};

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const getProgressToNextStage = (seconds: number) => {
  return Math.min(1, seconds / DAILY_GOAL_SECONDS);
};
