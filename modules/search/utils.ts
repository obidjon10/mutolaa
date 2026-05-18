/**
 * Convert an inclusive [min, max] age range into the discrete list of ages
 * that the backend's `age__in` filter expects.
 */
export const ageRangeToList = (range: [number, number]): number[] => {
  const [min, max] = range;
  const length = Math.max(0, max - min + 1);
  return Array.from({ length }, (_, idx) => min + idx);
};
