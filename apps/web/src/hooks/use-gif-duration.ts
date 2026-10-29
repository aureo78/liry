import { useEffect, useState } from 'react';

/**
 * Parses an animated GIF's binary to compute the total duration of one loop
 * (the sum of every frame delay, in milliseconds). Returns `null` until the
 * file has been fetched and parsed, or for non-GIF sources.
 *
 * Used to sync the video-style timeline/scrubber to the GIF's real duration
 * instead of an arbitrary fixed interval.
 */
export function useGifDuration(src: string | null | undefined): number | null {
	const [duration, setDuration] = useState<number | null>(null);

	useEffect(() => {
		setDuration(null);
		if (!src || !/\.gif(\?|$)/i.test(src)) return;
		let cancelled = false;
		fetch(src)
			.then((r) => r.arrayBuffer())
			.then((buf) => {
				if (cancelled) return;
				setDuration(parseGifDuration(new Uint8Array(buf)));
			})
			.catch(() => {
				if (!cancelled) setDuration(null);
			});
		return () => {
			cancelled = true;
		};
	}, [src]);

	return duration;
}

/** Walk a GIF's blocks and sum every Graphic Control Extension delay (1/100s). */
function parseGifDuration(bytes: Uint8Array): number | null {
	try {
		if (bytes.length < 13) return null;
		if (String.fromCharCode(bytes[0], bytes[1], bytes[2]) !== 'GIF') return null;

		let p = 13; // past header (6) + logical screen descriptor (7)
		const packed = bytes[10];
		if (packed & 0x80) {
			// global color table present
			const entries = 2 << (packed & 0x07);
			p += entries * 3;
		}

		let totalDelay = 0;
		let foundGCE = false;

		while (p < bytes.length) {
			const block = bytes[p];
			if (block === 0x3b) break; // trailer
			if (block === 0x21) {
				// extension introducer
				const label = bytes[p + 1];
				p += 2;
				if (label === 0xf9) {
					// Graphic Control Extension: [blockSize=4][packed][delay lo][delay hi][transIdx][0x00]
					const blockSize = bytes[p];
					const delay = bytes[p + 1] | (bytes[p + 2] << 8);
					totalDelay += delay;
					foundGCE = true;
					p += blockSize + 1; // skip block-size byte + data
					p = skipSubBlocks(bytes, p); // consume terminator
				} else {
					p = skipSubBlocks(bytes, p);
				}
			} else if (block === 0x2c) {
				// image descriptor (10 bytes incl. introducer)
				p += 10;
				const imgPacked = bytes[p - 1];
				if (imgPacked & 0x80) {
					const entries = 2 << (imgPacked & 0x07);
					p += entries * 3;
				}
				p += 1; // LZW minimum code size
				p = skipSubBlocks(bytes, p); // image data sub-blocks
			} else {
				p++;
			}
		}

		if (!foundGCE) return null;
		const ms = totalDelay * 10; // hundredths of a second → ms
		return ms > 0 ? ms : null;
	} catch {
		return null;
	}
}

/** Advance past a chain of sub-blocks: [size][bytes…][size][bytes…][0x00]. */
function skipSubBlocks(bytes: Uint8Array, p: number): number {
	while (p < bytes.length) {
		const size = bytes[p];
		p++;
		if (size === 0) break;
		p += size;
	}
	return p;
}
