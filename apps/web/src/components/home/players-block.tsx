import { players as initialPlayers, teams, FOUL_LIMIT, type Player } from '@/data/game';

export function PlayersBlock({ players }: { players: Player[] }) {
	return (
		<div className="block-body">
			{teams.map((t) => {
				const teamPlayers = players.filter((p) => p.team === t.id);
				const total = teamPlayers.reduce((s, p) => s + p.fouls, 0);
				return (
					<div className="team-group" key={t.id}>
						<div className="tg-head">
							<span className={'team-chip ' + t.id}>{t.short}</span>
							{t.name}
							<span className="total">
								<b>{total}</b> team fouls
							</span>
						</div>
						{teamPlayers.map((p) => {
							const warn = p.fouls >= FOUL_LIMIT - 1;
							const pips = Array.from({ length: FOUL_LIMIT }, (_, i) => i < p.fouls);
							return (
								<div className={'player-row ' + (warn ? 'warn' : '')} key={p.number + p.team}>
									<span className="pnum">{p.number}</span>
									<span className="pname">
										{p.name}
										{warn && (
											<small>
												<span className="warn-tag">NEAR FOUL LIMIT</span>
											</small>
										)}
									</span>
									<span className="foul-dots">
										<span className="foul-pips">
											{pips.map((on, i) => (
												<span key={i} className={'pip ' + (on ? (warn ? 'on warn' : 'on') : '')} />
											))}
										</span>
										<span className={'foul-count ' + (warn ? 'warn' : '')}>{p.fouls}</span>
									</span>
								</div>
							);
						})}
					</div>
				);
			})}
			<p style={{ fontSize: 10, color: 'var(--quiet)', marginTop: 14, marginBottom: 0 }}>
				Sample data · {initialPlayers.length} players · foul limit {FOUL_LIMIT}.
			</p>
		</div>
	);
}
