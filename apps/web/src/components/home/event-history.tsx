import { History } from 'lucide-react';
import type { HistoryEntry } from '@/data/game';

export function EventHistory({ history }: { history: HistoryEntry[] }) {
	const recent = history.slice(0, 3);
	return (
		<section className="history">
			<div className="section-head">
				<h2>
					<History size={14} /> Event history
				</h2>
				<small>Last {recent.length} AI detections</small>
			</div>
			<div className="history-list">
				{recent.length === 0 && <p className="history-empty">No decisions recorded yet.</p>}
				{recent.map((h) => (
					<div className="hist-item" key={h.id}>
						<span className="h-time">{h.time}</span>
						<span className="h-type">{h.foulType}</span>
						<span className="h-conf">{h.confidence}%</span>
						<span className={'h-status ' + h.status}>
							{h.status === 'confirmed' ? 'Confirmed' : h.status === 'rejected' ? 'Rejected' : 'Pending'}
						</span>
					</div>
				))}
			</div>
		</section>
	);
}
