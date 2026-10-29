import { useEffect } from 'react';
import { X, RotateCcw } from 'lucide-react';
import { cameras } from '@/data/game';
import type { Detection } from '@/data/game';

export function ReplayModal({
	detection,
	camera,
	onClose,
	onSelect,
}: {
	detection: Detection;
	camera: number;
	onClose: () => void;
	onSelect: (i: number) => void;
}) {
	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === 'Escape') onClose();
		}
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [onClose]);

	const cam = cameras[camera];

	return (
		<div className="modal-back" onClick={onClose}>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<div className="modal-head">
					<strong>
						<RotateCcw size={15} /> Replay review — {detection.foulType}
					</strong>
					<button className="ctl" aria-label="Close replay" onClick={onClose}>
						<X size={15} />
					</button>
				</div>
				<div className="modal-body">
					<div className="video-frame">
						<img src={cam.image} alt={cam.name} />
						<div className="ai-overlay">
							<div className="ai-corner tl" />
							<div className="ai-corner tr" />
							<div className="ai-corner bl" />
							<div className="ai-corner br" />
						</div>
						<div className="bbox" data-label={detection.foulType} style={{ left: '38%', top: '30%', width: '20%', height: '34%' }}>
							<span className="corner c1" />
							<span className="corner c2" />
							<span className="corner c3" />
							<span className="corner c4" />
						</div>
						<div className="ai-tag">REPLAY · {detection.time}</div>
					</div>
					<p style={{ fontSize: 11, color: 'var(--quiet)', margin: '12px 0 8px' }}>
						Switch angles to inspect the moment. Highlighted box marks the detected contact.
					</p>
					<div className="replay-cams">
						{cameras.map((c, i) => (
							<button
								key={c.id}
								className={'cam-card ' + (camera === i ? 'active' : '')}
								onClick={() => onSelect(i)}
							>
								<div className="cam-thumb">
									<img src={c.image} alt={c.name} loading="lazy" />
									<span className="cam-label">{c.label}</span>
								</div>
								<div className="cam-name">{c.name}</div>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
