import { Radio } from 'lucide-react';
import { teams, game } from '@/data/game';

export function Header() {
	return (
		<header className="topbar">
			<div className="brand">
				<div className="brand-mark">L</div>
				<div className="brand-name">
					Liry
					<span>BASKETBALL OFFICIATING</span>
				</div>
			</div>

			<div className="live-pill">
				<span className="live-dot" />
				{game.status}
			</div>

			<div className="score-block">
				{teams.map((t) => (
					<div className="team-score" key={t.id}>
						<div className={'team-chip ' + t.id}>{t.short}</div>
						<div className="meta">
							<strong>{t.name}</strong>
							<small>{t.id === 'vilnius' ? 'HOME' : 'AWAY'}</small>
						</div>
						<div className="num">{t.score}</div>
					</div>
				))}
				<span className="score-sep">·</span>
				<div className="clock-block">
					<div className="clock-cell">
						<small>PERIOD</small>
						<strong>{game.period}</strong>
					</div>
					<div className="clock-cell">
						<small>GAME CLOCK</small>
						<strong>{game.clock}</strong>
					</div>
					<div className="ai-status">
						<span className="live-dot" />
						{game.aiStatus}
					</div>
				</div>
			</div>
		</header>
	);
}
