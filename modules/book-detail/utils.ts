/** Format duration in seconds to HH:MM:SS */
export const formatDuration = (seconds: number): string => {
  const totalSeconds = Math.round(seconds);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
};
