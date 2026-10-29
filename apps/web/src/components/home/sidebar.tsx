import { ChevronDown, MoreHorizontal, Crosshair, Users, Flag } from 'lucide-react';
import type { Detection, DetectionStatus, Player, Referee } from '@/data/game';
import { DetectionBlock } from '@/components/home/detection-block';
import { PlayersBlock } from '@/components/home/players-block';
import { RefereesBlock } from '@/components/home/referees-block';

export type PanelName = 'detection' | 'players' | 'referees';

export function Sidebar({
	expanded,
	onToggle,
	detection,
	status,
	busy,
	players,
	referees,
	onConfirm,
	onReject,
	onReplay,
	onSimulate,
}: {
	expanded: PanelName;
	onToggle: (n: PanelName) => void;
	detection: Detection;
	status: DetectionStatus;
	busy: boolean;
	players: Player[];
	referees: Referee[];
	onConfirm: () => void;
	onReject: () => void;
	onReplay: () => void;
	onSimulate: () => void;
}) {
	const blocks: {
		name: PanelName;
		ico: 'amber' | 'green' | 'blue';
		icon: React.ReactNode;
		title: string;
		sub: string;
		collapsed: React.ReactNode;
		body: React.ReactNode;
	}[] = [
		{
			name: 'detection',
			ico: 'amber',
			icon: <Crosshair size={15} />,
			title: 'Current AI Detection',
			sub: 'Possible foul · awaiting decision',
			collapsed: (
				<>
					<b>{detection.foulType}</b> · {detection.confidence}% ·{' '}
					<span className={'det-status ' + status} style={{ padding: '2px 6px' }}>
						{status === 'confirmed' ? 'Confirmed' : status === 'rejected' ? 'Rejected' : 'Pending'}
					</span>
				</>
			),
			body: (
				<DetectionBlock
					detection={detection}
					status={status}
					busy={busy}
					onConfirm={onConfirm}
					onReject={onReject}
					onReplay={onReplay}
					onSimulate={onSimulate}
				/>
			),
		},
		{
			name: 'players',
			ico: 'green',
			icon: <Users size={15} />,
			title: 'Players & Foul Count',
			sub: '30 players · 2 teams',
			collapsed: (
				<>
					<b>{players.length}</b> players · <b>{players.reduce((s, p) => s + p.fouls, 0)}</b> total fouls
				</>
			),
			body: <PlayersBlock players={players} />,
		},
		{
			name: 'referees',
			ico: 'blue',
			icon: <Flag size={15} />,
			title: 'Referees & Error Tracking',
			sub: 'AI-assisted review indicators',
			collapsed: (
				<>
					<b>{referees.length}</b> crew members · <b>{referees.reduce((s, r) => s + r.missed, 0)}</b> possible missed
				</>
			),
			body: <RefereesBlock referees={referees} />,
		},
	];

	return (
		<aside className="sidebar">
			{blocks.map((b) => {
				const open = expanded === b.name;
				return (
					<section className={'block ' + (open ? 'open' : '')} key={b.name}>
						<button className="block-head" onClick={() => onToggle(b.name)} aria-expanded={open}>
							<span className={'ico ' + b.ico}>{b.icon}</span>
							<span className="title">
								<strong>{b.title}</strong>
								<small>{b.sub}</small>
							</span>
							{open ? <ChevronDown size={16} className="chev" /> : <MoreHorizontal size={16} className="dots" />}
						</button>
						{open ? b.body : <div className="collapsed-summary">{b.collapsed}</div>}
					</section>
				);
			})}
		</aside>
	);
}
