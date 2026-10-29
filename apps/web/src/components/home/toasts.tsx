import { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';

export interface Toast {
	id: number;
	variant: 'green' | 'amber' | 'red' | 'blue';
	title: string;
	body?: string;
}

const ICON = {
	green: <CheckCircle2 size={16} />,
	amber: <AlertTriangle size={16} />,
	red: <XCircle size={16} />,
	blue: <Info size={16} />,
};

export function Toasts({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: number) => void }) {
	useEffect(() => {
		if (!toasts.length) return;
		const timers = toasts.map((t) => setTimeout(() => onDismiss(t.id), 3800));
		return () => timers.forEach(clearTimeout);
	}, [toasts, onDismiss]);

	return (
		<div className="toast-wrap" role="status" aria-live="polite">
			{toasts.map((t) => (
				<div className={'toast ' + t.variant} key={t.id} onClick={() => onDismiss(t.id)}>
					<span className="t-ico">{ICON[t.variant]}</span>
					<div className="t-body">
						<strong>{t.title}</strong>
						{t.body && <small>{t.body}</small>}
					</div>
				</div>
			))}
		</div>
	);
}
