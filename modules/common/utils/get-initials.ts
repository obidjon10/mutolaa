export const getInitials = (fullName?: string, max = 2): string => {
  if (!fullName) return "";

  return fullName
    .trim()
    .split(/\s+/)
    .slice(0, max)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};
