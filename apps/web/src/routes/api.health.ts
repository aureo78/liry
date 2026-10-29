import { json, withApi } from '@/lib/api.server';

export const loader = withApi(async () => json({
  ok: true,
  service: 'liry-web',
  aiMode: process.env.VISION_API_URL && process.env.VISION_API_KEY ? 'provider' : 'demo-fallback',
  timestamp: new Date().toISOString(),
}));
