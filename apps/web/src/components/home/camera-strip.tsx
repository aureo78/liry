import { ShieldCheck } from 'lucide-react';
import { cameras } from '@/data/game';

export function CameraStrip({
	active,
	onSelect,
}: {
	active: number;
	onSelect: (i: number) => void;
}) {
	return (
		<section className="cameras-section">
			<div className="section-head">
				<h2>Camera angles</h2>
				<small>6 views · click to switch active feed</small>
			</div>
			<div className="cam-strip">
				{cameras.map((c, i) => {
					const idx = i;
					return (
						<button
							key={c.id}
							className={'cam-card ' + (active === idx ? 'active' : '')}
							onClick={() => onSelect(idx)}
						>
							<div className="cam-thumb">
								<img src={c.image} alt={c.name} loading="lazy" />
								<span className="cam-label">{c.label}</span>
								<span className="cam-reviewed">
									<ShieldCheck size={9} /> AI
								</span>
								<span className="cam-ts">06:42</span>
							</div>
							<div className="cam-name">{c.name}</div>
						</button>
					);
				})}
			</div>
		</section>
	);
}
