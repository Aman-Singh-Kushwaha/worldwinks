/**
 * Generates a HMAC-SHA-256 signature of the provided nonce using a secret key from the environment.
 */
export const hashNonce = async (params: { nonce: string }): Promise<string> => {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(process.env.NEXT_PUBLIC_HMAC_SECRET_KEY!);
  const nonceData = encoder.encode(params.nonce);

  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, nonceData);

  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};
