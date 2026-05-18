export const AVATAR_MAX_DIMENSION = 1280;
export const AVATAR_MAX_BYTES = 2_000_000;
export const AVATAR_JPEG_QUALITY = 0.85;

const loadImage = (file: File): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("invalid-image"));
    };
    img.src = url;
  });

const canvasToBlob = (canvas: HTMLCanvasElement): Promise<Blob> =>
  new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("encode-failed"))),
      "image/jpeg",
      AVATAR_JPEG_QUALITY,
    );
  });

export const prepareAvatar = async (file: File): Promise<File> => {
  if (!file.type.startsWith("image/")) throw new Error("not-image");
  if (file.type === "image/webp") throw new Error("webp-not-allowed");

  const img = await loadImage(file);

  const scale = Math.min(
    1,
    AVATAR_MAX_DIMENSION / img.naturalWidth,
    AVATAR_MAX_DIMENSION / img.naturalHeight,
  );
  const width = Math.round(img.naturalWidth * scale);
  const height = Math.round(img.naturalHeight * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("encode-failed");
  ctx.drawImage(img, 0, 0, width, height);

  const blob = await canvasToBlob(canvas);
  if (blob.size > AVATAR_MAX_BYTES) throw new Error("too-large");

  return new File([blob], "avatar.jpg", { type: "image/jpeg" });
};
