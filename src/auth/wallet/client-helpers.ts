/**
 * Generates a SHA-256 hash of the provided nonce using a secret key from the environment.
 */
export const hashNonce = async (params: { nonce: string }): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(params.nonce);
  const key = encoder.encode(process.env.NEXT_PUBLIC_HMAC_SECRET_KEY!);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};
