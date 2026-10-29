import { AlertTriangle } from 'lucide-react';
import { referees, type Referee } from '@/data/game';

export function RefereesBlock({ referees: crew }: { referees: Referee[] }) {
	return (
		<div className="block-body">
			{crew.map((r) => {
				const accuracy = r.called > 0 ? Math.round((r.confirmed / r.called) * 100) : 100;
				return (
					<div className="ref-card" key={r.name}>
						<div className="ref-top">
							<div className="ref-avatar">{r.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}</div>
							<div style={{ flex: 1, minWidth: 0 }}>
								<div className="ref-name">{r.name}</div>
								<div className="ref-role">{r.role}</div>
							</div>
							<div className="ref-acc">
								<strong>{accuracy}%</strong>
								<small>ACCURACY</small>
							</div>
						</div>
						<div className="ref-stats">
							<div className="ref-stat">
								<strong>{r.called}</strong>
								<small>CALLED</small>
							</div>
							<div className="ref-stat">
								<strong>{r.confirmed}</strong>
								<small>CONFIRMED</small>
							</div>
							<div className="ref-stat">
								<strong>{r.rejected}</strong>
								<small>REJECTED</small>
							</div>
							<div className="ref-stat missed">
								<strong>{r.missed}</strong>
								<small>POSSIBLE MISSED</small>
							</div>
						</div>
					</div>
				);
			})}
			<div className="ref-note">
				<AlertTriangle size={14} />
				<span>
					AI-assisted review. “Possible missed call” is an AI-generated review indicator that
					requires human review — not a definitive accusation of referee error.
				</span>
			</div>
		</div>
	);
}
