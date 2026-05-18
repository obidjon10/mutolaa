import { useCallback } from "react";

const TEXT_ENCODER = new TextEncoder();
const TEXT_DECODER = new TextDecoder();

function toArrayBuffer(data: Uint8Array): ArrayBuffer {
  const buf = new ArrayBuffer(data.byteLength);
  new Uint8Array(buf).set(data);
  return buf;
}

async function importRawKey(
  secret: string,
): Promise<{ key: CryptoKey; iv: ArrayBuffer }> {
  const key = await crypto.subtle.importKey(
    "raw",
    toArrayBuffer(TEXT_ENCODER.encode(secret)),
    { name: "AES-CBC" },
    false,
    ["encrypt", "decrypt"],
  );
  // Backend uses key[:16] as the fixed IV
  const iv = toArrayBuffer(TEXT_ENCODER.encode(secret.slice(0, 16)));

  return { key, iv };
}

export const useEncrypt = (secret: string) => {
  const encrypt = useCallback(
    async (plaintext: string): Promise<string> => {
      const { key, iv } = await importRawKey(secret);
      const encrypted = await crypto.subtle.encrypt(
        { name: "AES-CBC", iv },
        key,
        toArrayBuffer(TEXT_ENCODER.encode(plaintext)),
      );

      return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
    },
    [secret],
  );

  const decrypt = useCallback(
    async (cipher: string): Promise<string> => {
      const { key, iv } = await importRawKey(secret);
      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-CBC", iv },
        key,
        toArrayBuffer(Uint8Array.from(atob(cipher), (c) => c.charCodeAt(0))),
      );

      return TEXT_DECODER.decode(decrypted);
    },
    [secret],
  );

  return { encrypt, decrypt };
};
