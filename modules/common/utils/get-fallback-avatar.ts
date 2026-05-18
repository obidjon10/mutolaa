const FALLBACK_AVATARS = [
  "/blue.webp",
  "/emerald.webp",
  "/indigo.webp",
  "/orange.webp",
  "/red.webp",
];

export const getFallbackAvatar = (seed: number | string | undefined) => {
  const str = String(seed ?? "");
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  const index = str
    ? hash % FALLBACK_AVATARS.length
    : Math.floor(Math.random() * FALLBACK_AVATARS.length);

  return FALLBACK_AVATARS[index];
};
