import { apiError, readFormData, withApi } from '@/lib/api.server';

type DemoAnalysis = {
  mode: 'demo' | 'provider';
  image: { name: string; type: string; size: number };
  playersDetected: number;
  ballDetected: boolean;
  possibleEvent: string;
  confidence: number;
  explanation: string;
  needsHumanReview: boolean;
};

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

const demoAnalysis = (image: File): DemoAnalysis => ({
  mode: 'demo',
  image: { name: image.name || 'uploaded-image', type: image.type, size: image.size },
  playersDetected: 10,
  ballDetected: true,
  possibleEvent: 'Galimas kontaktas prie krepšio',
  confidence: 78,
  explanation: 'Demonstracinis atsakymas. Nuotrauka priimta, tačiau AI raktas nenustatytas. Tikras modelis vėliau galės įvertinti matomą situaciją.',
  needsHumanReview: true,
});

const analyzeWithProvider = async (image: File): Promise<DemoAnalysis | null> => {
  // Reserved adapter seam for the future vision provider. Never expose a provider key to the browser.
  const endpoint = process.env.VISION_API_URL;
  const apiKey = process.env.VISION_API_KEY;

  if (!endpoint || !apiKey) return null;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, Accept: 'application/json' },
    body: await image.arrayBuffer(),
  });

  if (!response.ok) throw new Error(`Vision provider returned ${response.status}`);
  return (await response.json()) as DemoAnalysis;
};

export const action = withApi(async ({ request }) => {
  if (request.method !== 'POST') return apiError(405, 'Method not allowed');

  const form = await readFormData(request);
  const image = form.get('image');

  if (!(image instanceof File) || image.size === 0) {
    return apiError(400, 'Upload an image using the "image" field');
  }

  if (!ALLOWED_TYPES.has(image.type)) {
    return apiError(415, 'Only JPEG, PNG, and WebP images are supported');
  }

  if (image.size > MAX_IMAGE_BYTES) {
    return apiError(413, 'Images must be smaller than 10MB');
  }

  const result = await analyzeWithProvider(image) ?? demoAnalysis(image);
  return { ...result, generatedAt: new Date().toISOString() };
});
