import { useEffect, useState, useCallback, useRef } from 'react';
import { ShieldCheck, Activity } from 'lucide-react';
import {
	players as initialPlayers,
	referees as initialReferees,
	detectionPool,
	MAIN_GIF,
	type Player,
	type Referee,
	type DetectionStatus,
	type HistoryEntry,
} from '@/data/game';
import { useGifDuration } from '@/hooks/use-gif-duration';
import { openCookiePreferences } from '@/lib/cookie-consent';
import { Header } from '@/components/home/header';
import { MainVideo } from '@/components/home/main-video';
import { CameraStrip } from '@/components/home/camera-strip';
import { Sidebar, type PanelName } from '@/components/home/sidebar';
import { EventHistory } from '@/components/home/event-history';
import { Toasts, type Toast } from '@/components/home/toasts';
import { ReplayModal } from '@/components/home/replay-modal';
import { PhotoAnalysisDemo } from '@/components/home/photo-analysis-demo';

export function Workspace() {
	const [activeCamera, setActiveCamera] = useState(detectionPool[0].camera);
	const [expanded, setExpanded] = useState<PanelName>('detection');
	const [detectionIndex, setDetectionIndex] = useState(0);
	const [status, setStatus] = useState<DetectionStatus>('pending');
	const [players, setPlayers] = useState<Player[]>(() => initialPlayers.map((p) => ({ ...p })));
	const [referees] = useState<Referee[]>(initialReferees);
	const [history, setHistory] = useState<HistoryEntry[]>([]);
	const [replay, setReplay] = useState(false);
	const [toasts, setToasts] = useState<Toast[]>([]);
	const [playing, setPlaying] = useState(true);
	const [progress, setProgress] = useState(0.5);
	const [toastId, setToastId] = useState(1);

	// The full video duration equals the GIF's actual loop duration, parsed
	// from its binary. Falls back to a sensible default while loading / for
	// non-GIF (still) camera sources so the scrubber always has a length.
	const gifDuration = useGifDuration(MAIN_GIF);
	const durationMs = gifDuration ?? 6000;

	const detection = detectionPool[detectionIndex];

	const pushToast = useCallback((variant: Toast['variant'], title: string, body?: string) => {
		const id = Date.now() + Math.random();
		setToastId((n) => n + 1);
		setToasts((prev) => [...prev, { id, variant, title, body }].slice(-4));
	}, []);

	const dismissToast = useCallback((id: number) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	}, []);

	// Advance the timeline progress in lockstep with the GIF loop: one full
	// 0→1 sweep of the scrubber takes exactly `durationMs`, then wraps.
	const baseRef = useRef(0);
	const startRef = useRef(0);
	useEffect(() => {
		if (!playing) return;
		baseRef.current = progress;
		startRef.current = performance.now();
		let raf = 0;
		const tick = (now: number) => {
			const elapsed = now - startRef.current;
			const pct = (baseRef.current + elapsed / durationMs) % 1;
			setProgress(pct);
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playing, durationMs]);

	function toggleBlock(name: PanelName) {
		setExpanded((cur) => (cur === name ? name : name));
	}

	function selectCamera(i: number) {
		setActiveCamera(i);
		pushToast('blue', 'Camera switched', `Active view: ${i === 0 ? 'Main court' : `CAM 0${i}`}`);
	}

	function addHistory(d: typeof detection, st: DetectionStatus) {
		const entry: HistoryEntry = {
			id: `${d.id}-${Date.now()}`,
			foulType: d.foulType,
			time: d.time,
			period: d.period,
			status: st,
			confidence: d.confidence,
			offendingName: d.offendingName,
			offendingTeam: d.offendingTeam,
		};
		setHistory((prev) => [entry, ...prev].slice(0, 8));
	}

	function confirmFoul() {
		if (status !== 'pending') return;
		setStatus('confirmed');
		setPlayers((prev) =>
			prev.map((p) =>
				p.number === detection.offendingNumber && p.team === detection.offendingTeam
					? { ...p, fouls: Math.min(6, p.fouls + 1) }
					: p,
			),
		);
		addHistory(detection, 'confirmed');
		pushToast(
			'green',
			'Foul confirmed',
			`#${detection.offendingNumber} ${detection.offendingName} foul count updated.`,
		);
	}

	function rejectDetection() {
		if (status !== 'pending') return;
		setStatus('rejected');
		addHistory(detection, 'rejected');
		pushToast('red', 'Detection rejected', 'No foul recorded. Event saved to history.');
	}

	function reviewReplay() {
		setActiveCamera(detection.camera);
		setReplay(true);
		pushToast('blue', 'Replay opened', `Reviewing ${detection.foulType} across camera angles.`);
	}

	function simulateNext() {
		const next = (detectionIndex + 1) % detectionPool.length;
		setDetectionIndex(next);
		setStatus('pending');
		setActiveCamera(detectionPool[next].camera);
		setProgress(0.1);
		setExpanded('detection');
		const d = detectionPool[next];
		pushToast('amber', 'New AI detection', `${d.foulType} · ${d.confidence}% confidence · ${d.time}`);
	}

	return (
		<div className="app-shell">
			<Header />

			<main className="main">
				<div className="left-col">
					<MainVideo
						camera={activeCamera}
						detection={detection}
						playing={playing}
						progress={progress}
						replay={replay}
						durationMs={durationMs}
						onTogglePlay={() => setPlaying((p) => !p)}
						onSeek={(p) => {
							setProgress(p);
							setPlaying(false);
						}}
					/>
					<CameraStrip active={activeCamera} onSelect={selectCamera} />
					<EventHistory history={history} />
					<PhotoAnalysisDemo />
				</div>

				<Sidebar
					expanded={expanded}
					onToggle={toggleBlock}
					detection={detection}
					status={status}
					busy={false}
					players={players}
					referees={referees}
					onConfirm={confirmFoul}
					onReject={rejectDetection}
					onReplay={reviewReplay}
					onSimulate={simulateNext}
				/>
			</main>

			<footer>
				<span>
					<span className="brand-footer">Liry</span> · AI assist. Referee always decides.
				</span>
				<div className="links">
					<span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
						<ShieldCheck size={12} /> SIMULATED LIVE DATA
					</span>
					<span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
						<Activity size={12} /> PROTOTYPE
					</span>
					<button onClick={openCookiePreferences}>Cookie settings</button>
					<small>© 2026 Liry</small>
				</div>
			</footer>

			{replay && (
				<ReplayModal
					detection={detection}
					camera={activeCamera}
					onClose={() => setReplay(false)}
					onSelect={(i) => setActiveCamera(i)}
				/>
			)}

			<Toasts toasts={toasts} onDismiss={dismissToast} />
		</div>
	);
}
