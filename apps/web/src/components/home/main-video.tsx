import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, Rewind } from 'lucide-react';
import { cameras } from '@/data/game';
import type { Detection } from '@/data/game';

export function MainVideo({
	camera,
	detection,
	playing,
	progress,
	replay,
	durationMs,
	onTogglePlay,
	onSeek,
}: {
	camera: number;
	detection: Detection | null;
	playing: boolean;
	progress: number;
	replay: boolean;
	durationMs: number;
	onTogglePlay: () => void;
	onSeek: (pct: number) => void;
}) {
	const cam = cameras[camera];

	function fmtTime(ms: number): string {
		const total = Math.max(0, Math.round(ms / 1000));
		const m = Math.floor(total / 60);
		const s = total % 60;
		return `${m}:${s.toString().padStart(2, '0')}`;
	}
	// The marker belongs to the main GIF only. It appears for 0.3 seconds,
	// shifted 1.0 second before the loop ends, then disappears before restart.
	const isGifEndMoment =
		camera === 0 &&
		durationMs > 0 &&
		progress >= 1 - (1400 / durationMs) &&
		progress < 1 - (1000 / durationMs);


	return (
		<section className="video-panel">
			<div className="video-head">
				<div className="label">
					{cam.label} <small>— {cam.name}</small>
				</div>
				<div className="right">
					{cam.live ? (
						<span className="badge live">
							<span className="live-dot" /> LIVE
						</span>
					) : (
						<span className="badge proto">PAUSED FRAME</span>
					)}
					<span className="badge assist">AI ASSIST</span>
					<span className="badge proto">PROTOTYPE</span>
				</div>
			</div>

			<div className={'video-frame ' + (cam.live ? '' : 'still')}>
				<img
					src={cam.image}
					alt={cam.live ? 'Main court live camera feed' : `${cam.name} camera still`}
					sizes="(min-width: 1100px) 62vw, 100vw"
				/>

				<div className="ai-overlay">
					<div className="ai-corner tl" />
					<div className="ai-corner tr" />
					<div className="ai-corner bl" />
					<div className="ai-corner br" />
					<div className="ai-tag">AI DETECTION ACTIVE</div>
				</div>

				{isGifEndMoment && (
					<div className="personal-foul-detection" role="status" aria-live="polite">
						<div className="personal-foul-label">Personal foul</div>
						<div className="personal-foul-box" aria-hidden="true">
							<span className="detection-corner top-left" />
							<span className="detection-corner top-right" />
							<span className="detection-corner bottom-left" />
							<span className="detection-corner bottom-right" />
						</div>
					</div>
				)}
			</div>

			<div className="video-foot">
				<div
					className="timeline-bar"
					onClick={(e) => {
						const r = e.currentTarget.getBoundingClientRect();
						onSeek(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)));
					}}
				>
					<div className="timeline-fill" style={{ width: `${progress * 100}%` }} />
					<div className="timeline-mark active" style={{ left: '18%' }} />
					<div className="timeline-mark" style={{ left: '46%' }} />
					<div className="timeline-mark review" style={{ left: '72%' }} />
				</div>
				<div className="video-controls">
					<div className="left">
						<button className="ctl" aria-label="Skip back" onClick={() => onSeek(Math.max(0, progress - 0.05))}>
							<SkipBack size={15} />
						</button>
						<button className="ctl primary" aria-label={playing ? 'Pause' : 'Play'} onClick={onTogglePlay}>
							{playing ? <Pause size={16} /> : <Play size={16} />}
						</button>
						<button className="ctl" aria-label="Skip forward" onClick={() => onSeek(Math.min(1, progress + 0.05))}>
							<SkipForward size={15} />
						</button>
						<button className="ctl" aria-label="Rewind 10s">
							<Rewind size={15} />
						</button>
					</div>
					<div className="right">
						<span className="timestamp">
							{replay ? 'REPLAY' : 'LIVE'} <b>{detection?.time ?? '06:42'}</b> · {detection?.period ?? '3rd Quarter'}
						</span>
						<span className="vtime">{fmtTime(progress * durationMs)} / {fmtTime(durationMs)}</span>
						<button className="ctl" aria-label="Volume">
							<Volume2 size={15} />
						</button>
						<button className="ctl" aria-label="Fullscreen">
							<Maximize2 size={14} />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
