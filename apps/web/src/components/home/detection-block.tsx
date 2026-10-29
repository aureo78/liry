import { Check, X, RotateCcw, Zap, Crosshair, Users } from 'lucide-react';
import type { Detection, DetectionStatus } from '@/data/game';
import { teamName } from '@/data/game';

export function DetectionBlock({
	detection,
	status,
	busy,
	onConfirm,
	onReject,
	onReplay,
	onSimulate,
}: {
	detection: Detection;
	status: DetectionStatus;
	busy: boolean;
	onConfirm: () => void;
	onReject: () => void;
	onReplay: () => void;
	onSimulate: () => void;
}) {
	const confClass = detection.confidence > 80 ? 'high' : detection.confidence > 60 ? 'mid' : 'low';
	const statusLabel =
		status === 'confirmed'
			? 'Confirmed by referee'
			: status === 'rejected'
				? 'Rejected by referee'
				: 'Awaiting referee confirmation';

	return (
		<div className="block-body">
			<div className="det-top">
				<div>
					<div className="det-type">{detection.foulType}</div>
					<div className="det-meta">
						{detection.time} — {detection.period}
					</div>
				</div>
				<span className={'det-status ' + status}>{statusLabel}</span>
			</div>

			<div className="conf-row">
				<div className="lbl">
					<span>AI confidence</span>
					<b>{detection.confidence}%</b>
				</div>
				<div className="conf-bar">
					<span className={confClass} style={{ width: `${detection.confidence}%` }} />
				</div>
			</div>

			<div className="players-involved">
				<div className="involved">
					<div className="role">OFFENDING PLAYER</div>
					<div className="pname">
						<span className="jersey">#{detection.offendingNumber}</span>
						{detection.offendingName}
					</div>
					<div className="pteam">
						<span className={detection.offendingTeam}>{teamName(detection.offendingTeam)}</span>
					</div>
				</div>
				<div className="involved">
					<div className="role">INVOLVED PLAYER</div>
					<div className="pname">
						<span className="jersey">#{detection.otherNumber}</span>
						{detection.otherName}
					</div>
					<div className="pteam">
						<span className={detection.otherTeam}>{teamName(detection.otherTeam)}</span>
					</div>
				</div>
			</div>

			<p className="det-explain">{detection.explanation}</p>

			<div className="decision-area">
				<div className="hint">
					<Crosshair size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: '-2px' }} />
					The referee makes the final decision. AI analysis is assistance only.
				</div>
				<div className="decision-btns">
					<button
						className={'btn ' + (status === 'confirmed' ? 'done' : 'confirm')}
						disabled={busy || status !== 'pending'}
						onClick={onConfirm}
					>
						<Check size={15} /> {status === 'confirmed' ? 'Confirmed' : 'Confirm Foul'}
					</button>
					<button
						className={'btn ' + (status === 'rejected' ? 'done' : 'reject')}
						disabled={busy || status !== 'pending'}
						onClick={onReject}
					>
						<X size={15} /> {status === 'rejected' ? 'Rejected' : 'Reject Detection'}
					</button>
				</div>
				<button className="btn replay" disabled={busy} onClick={onReplay}>
					<RotateCcw size={14} /> Review Replay
				</button>
				<button className="btn simulate" disabled={busy} onClick={onSimulate}>
					<Zap size={14} /> Simulate next AI detection
				</button>
				{status !== 'pending' && (
					<div className="confirm-msg">
						Decision recorded — event added to history.
					</div>
				)}
			</div>

			<div className="det-explain" style={{ borderLeftColor: 'var(--blue)', marginTop: 12, display: 'flex', gap: 7 }}>
				<Users size={13} style={{ flexShrink: 0, marginTop: 1 }} />
				<span>SIMULATED LIVE DATA · not connected to a real computer vision feed.</span>
			</div>
		</div>
	);
}
