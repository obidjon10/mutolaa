import { useCallback, useRef } from "react";
import Hls from "hls.js";

const API_ORIGIN = process.env.NEXT_PUBLIC_API_URL ?? "";

const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

/**
 * Manages a single Hls.js instance attached to an <audio> element.
 * Injects the Bearer token for requests going to the mutolaa API origin
 * (needed so the HLS AES-128 key endpoint receives authentication).
 */
export const useHls = () => {
  const hlsRef = useRef<Hls | null>(null);

  const destroy = useCallback(() => {
    hlsRef.current?.destroy();
    hlsRef.current = null;
  }, []);

  const attach = useCallback(
    (audio: HTMLAudioElement, url: string, onReady?: () => void) => {
      destroy();

      const isHls = url.includes(".m3u8");

      if (isHls && Hls.isSupported()) {
        const hls = new Hls({
          xhrSetup: (xhr, reqUrl) => {
            if (API_ORIGIN && reqUrl.startsWith(API_ORIGIN)) {
              const token = getToken();
              if (token) xhr.setRequestHeader("Authorization", `Bearer ${token}`);
            }
          },
        });

        hls.loadSource(url);
        hls.attachMedia(audio);
        hls.once(Hls.Events.MANIFEST_PARSED, () => onReady?.());

        hlsRef.current = hls;
        return;
      }

      // Safari native HLS, or non-HLS fragment URLs
      audio.src = url;
      onReady?.();
    },
    [destroy],
  );

  return { attach, destroy };
};
