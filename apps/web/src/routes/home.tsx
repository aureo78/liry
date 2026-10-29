import type { Route } from './+types/home';
import { seo } from '@/lib/seo';
import { Workspace } from '@/components/home/workspace';
import { MAIN_GIF, teams } from '@/data/game';

export function meta({ matches, location }: Route.MetaArgs) {
	return seo({ matches, location }, {
		title: 'Liry — Basketball Officiating Platform',
		image: MAIN_GIF,
		jsonLd: [
			{ '@type': 'WebSite', name: 'Liry', description: 'AI-assisted basketball officiating platform' },
			{ '@type': 'Organization', name: 'Liry' },
			{
				'@type': 'SportsEvent',
				name: `${teams[0].name} vs ${teams[1].name}`,
				homeTeam: { '@type': 'SportsTeam', name: teams[0].name },
				awayTeam: { '@type': 'SportsTeam', name: teams[1].name },
			},
		],
		description:
			'Liry — an AI-assisted basketball officiating platform. Monitor a live game across six camera angles, review AI-flagged possible fouls, and keep the final call with the referee. Prototype with simulated live data.',
	});
}

export default function HomePage() {
	return <Workspace />;
}
