const encoder = new TextEncoder();
const decoder = new TextDecoder();

function toBuffer(data: Uint8Array): ArrayBuffer {
  const buf = new ArrayBuffer(data.byteLength);
  new Uint8Array(buf).set(data);
  return buf;
}

/**
 * AES-CBC decrypt. Key = full secret bytes; IV = first 16 bytes of secret.
 * Mirrors the backend encryption used for file URLs.
 */
export async function decryptAes(cipher: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    toBuffer(encoder.encode(secret)),
    { name: "AES-CBC" },
    false,
    ["decrypt"],
  );

  const iv = toBuffer(encoder.encode(secret.slice(0, 16)));
  const cipherBytes = toBuffer(
    Uint8Array.from(atob(cipher), (c) => c.charCodeAt(0)),
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv },
    key,
    cipherBytes,
  );

  return decoder.decode(decrypted);
}
