export async function uploadBlob(fileOrData: File | string, epochs = 1, permanent = true): Promise<{ blobId: string }> {
  const formData = new FormData();
  if (typeof fileOrData === 'string') formData.append('file', new Blob([fileOrData], { type: 'application/json' }), 'metadata.json');
  else formData.append('file', fileOrData);
  const params = new URLSearchParams({ epochs: epochs.toString(), permanent: permanent ? 'true' : 'false' });
  const url = `${process.env.NEXT_PUBLIC_WALRUS_PUBLISHER_URL}/v1/blobs?${params}`;
  const res = await fetch(url, { method: 'PUT', body: formData });
  if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
  const data = await res.json();
  return { blobId: data.newlyCreated?.blobObject.blobId || data.alreadyCertified.blobId };
}
export function buildBlobUrl(blobId: string): string { return `${process.env.NEXT_PUBLIC_WALRUS_AGGREGATOR_URL}/v1/blobs/${blobId}`; }
export async function retrieveBlob(blobId: string): Promise<Blob> {
  const url = buildBlobUrl(blobId);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Retrieval failed: ${res.status}`);
  return res.blob();
}
export async function retrieveJsonBlob(blobId: string): Promise<any> {
  const blob = await retrieveBlob(blobId);
  return blob.text().then(text => JSON.parse(text));
}
