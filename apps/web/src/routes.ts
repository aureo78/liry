import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
	index('routes/home.tsx'),
	route('api/integrated-ai/stream', 'routes/api.integrated-ai.stream.ts'),
	route('api/analyze-image', 'routes/api.analyze-image.ts'),
	route('sitemap.xml', 'routes/sitemap.xml.ts'),
	route('robots.txt', 'routes/robots.txt.ts'),
	route('api/health', 'routes/api.health.ts'),
	route('api/*', 'routes/api.$.ts'),
] satisfies RouteConfig;
