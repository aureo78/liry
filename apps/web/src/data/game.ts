// Centralized mock data for the Liry prototype.
// All values are simulated — no backend, live feed, or computer vision is connected.
// Replace these structures with real APIs / CV services later.

export const MAIN_GIF = '/main-court.gif';

export interface CameraAngle {
	id: string;
	label: string;
	name: string;
	image: string;
	live: boolean;
}

export const cameras: CameraAngle[] = [
	{ id: 'cam01', label: 'CAM 01', name: 'MAIN COURT VIEW', image: MAIN_GIF, live: true },
	{
		id: 'cam02',
		label: 'CAM 02',
		name: 'Left Sideline',
		image:
			'https://images.hostinger.com/a7947be1-d341-4159-84c3-3f7da4a0b471/b4e99354-942a-40b0-8122-919884dcda48.png',
		live: false,
	},
	{
		id: 'cam03',
		label: 'CAM 03',
		name: 'Right Sideline',
		image:
			'https://images.hostinger.com/a7947be1-d341-4159-84c3-3f7da4a0b471/729db98e-4cb6-4d90-bd3c-423bb46ce832.png',
		live: false,
	},
	{
		id: 'cam04',
		label: 'CAM 04',
		name: 'Baseline',
		image:
			'https://images.hostinger.com/a7947be1-d341-4159-84c3-3f7da4a0b471/30bd5054-01ec-420b-907c-05792592d31f.png',
		live: false,
	},
	{
		id: 'cam05',
		label: 'CAM 05',
		name: 'Overhead View',
		image:
			'https://images.hostinger.com/a7947be1-d341-4159-84c3-3f7da4a0b471/7ff7abc9-f098-4b8b-8bf8-91bbd29f5f30.png',
		live: false,
	},
	{
		id: 'cam06',
		label: 'CAM 06',
		name: 'Player Close-up',
		image:
			'https://images.hostinger.com/a7947be1-d341-4159-84c3-3f7da4a0b471/f82a6bd3-332b-4522-a1ed-f43ab5aa593c.png',
		live: false,
	},
];

export interface Team {
	id: string;
	name: string;
	short: string;
	score: number;
	color: string;
}

export const teams: Team[] = [
	{ id: 'vilnius', name: 'Vilnius Wolves', short: 'VIL', score: 78, color: '#4ade80' },
	{ id: 'kaunas', name: 'Kaunas Lions', short: 'KAU', score: 74, color: '#fbbf24' },
];

export const game = {
	period: '3rd Quarter',
	clock: '06:42',
	status: 'LIVE',
	aiStatus: 'AI monitoring active',
};

export interface Player {
	number: string;
	name: string;
	team: string; // team id
	fouls: number;
}

export const players: Player[] = [
	// Vilnius Wolves
	{ number: '1', name: 'Jonas Valaitis', team: 'vilnius', fouls: 2 },
	{ number: '3', name: 'Mantas Žukauskas', team: 'vilnius', fouls: 1 },
	{ number: '5', name: 'Darius Collins', team: 'vilnius', fouls: 3 },
	{ number: '8', name: 'Lukas Petrauskas', team: 'vilnius', fouls: 1 },
	{ number: '10', name: 'Tomas Bailey', team: 'vilnius', fouls: 0 },
	{ number: '12', name: 'Noah Williams', team: 'vilnius', fouls: 2 },
	{ number: '14', name: 'Emil Martin', team: 'vilnius', fouls: 4 },
	{ number: '17', name: 'Arnas Kazlauskas', team: 'vilnius', fouls: 1 },
	{ number: '21', name: 'David Carter', team: 'vilnius', fouls: 2 },
	{ number: '24', name: 'Rokas Jankauskas', team: 'vilnius', fouls: 0 },
	{ number: '25', name: 'Ben Taylor', team: 'vilnius', fouls: 3 },
	{ number: '30', name: 'Tomas Reed', team: 'vilnius', fouls: 1 },
	{ number: '32', name: 'Liam Brooks', team: 'vilnius', fouls: 2 },
	{ number: '41', name: 'Daniel Moore', team: 'vilnius', fouls: 0 },
	{ number: '44', name: 'Ethan Wilson', team: 'vilnius', fouls: 1 },
	// Kaunas Lions
	{ number: '2', name: 'Marius Rimkus', team: 'kaunas', fouls: 1 },
	{ number: '4', name: 'James Anderson', team: 'kaunas', fouls: 3 },
	{ number: '6', name: 'Paulius Vaitkus', team: 'kaunas', fouls: 0 },
	{ number: '7', name: 'Andre Miller', team: 'kaunas', fouls: 2 },
	{ number: '9', name: 'Karolis Petrauskas', team: 'kaunas', fouls: 1 },
	{ number: '11', name: 'Michael Brown', team: 'kaunas', fouls: 4 },
	{ number: '13', name: 'Dovydas Matulis', team: 'kaunas', fouls: 2 },
	{ number: '15', name: 'Chris Jackson', team: 'kaunas', fouls: 1 },
	{ number: '18', name: 'Lukas Miller', team: 'kaunas', fouls: 3 },
	{ number: '20', name: 'Noah Davis', team: 'kaunas', fouls: 0 },
	{ number: '22', name: 'Martynas Kazlauskas', team: 'kaunas', fouls: 2 },
	{ number: '23', name: 'Alex Thompson', team: 'kaunas', fouls: 1 },
	{ number: '27', name: 'Ben Johnson', team: 'kaunas', fouls: 3 },
	{ number: '31', name: 'Robert Smith', team: 'kaunas', fouls: 0 },
	{ number: '35', name: 'Daniel Williams', team: 'kaunas', fouls: 2 },
];

export const FOUL_LIMIT = 5; // personal foul limit before ejection

export interface Referee {
	name: string;
	role: string;
	called: number;
	confirmed: number;
	rejected: number;
	missed: number;
}

export const referees: Referee[] = [
	{ name: 'Andrius Kazlauskas', role: 'Crew Chief', called: 14, confirmed: 12, rejected: 2, missed: 1 },
	{ name: 'Laura Miller', role: 'Referee', called: 11, confirmed: 9, rejected: 3, missed: 2 },
	{ name: 'Tomas Anderson', role: 'Referee', called: 13, confirmed: 10, rejected: 2, missed: 1 },
];

export type DetectionStatus = 'pending' | 'confirmed' | 'rejected';

export interface Detection {
	id: string;
	foulType: string;
	confidence: number;
	time: string;
	period: string;
	offendingNumber: string;
	offendingName: string;
	offendingTeam: string;
	otherNumber: string;
	otherName: string;
	otherTeam: string;
	explanation: string;
	camera: number;
}

// A pool of simulated AI detections, cycled by "Simulate next detection".
export const detectionPool: Detection[] = [
	{
		id: 'd1',
		foulType: 'Possible Shooting Foul',
		confidence: 87,
		time: '06:42',
		period: '3rd Quarter',
		offendingNumber: '12',
		offendingName: 'Marcus Johnson',
		offendingTeam: 'kaunas',
		otherNumber: '8',
		otherName: 'Lukas Petrauskas',
		otherTeam: 'vilnius',
		explanation: 'AI detected possible illegal contact during a shooting motion.',
		camera: 0,
	},
	{
		id: 'd2',
		foulType: 'Possible Blocking Foul',
		confidence: 73,
		time: '05:58',
		period: '3rd Quarter',
		offendingNumber: '5',
		offendingName: 'Darius Collins',
		offendingTeam: 'vilnius',
		otherNumber: '11',
		otherName: 'Michael Brown',
		otherTeam: 'kaunas',
		explanation: 'AI detected a defender not in legal guarding position during a drive.',
		camera: 2,
	},
	{
		id: 'd3',
		foulType: 'Possible Reach-in Foul',
		confidence: 64,
		time: '05:11',
		period: '3rd Quarter',
		offendingNumber: '7',
		offendingName: 'Andre Miller',
		offendingTeam: 'kaunas',
		otherNumber: '14',
		otherName: 'Emil Martin',
		otherTeam: 'vilnius',
		explanation: 'AI detected possible arm contact on the ball-handler.',
		camera: 5,
	},
	{
		id: 'd4',
		foulType: 'Possible Offensive Foul',
		confidence: 81,
		time: '04:27',
		period: '3rd Quarter',
		offendingNumber: '25',
		offendingName: 'Ben Taylor',
		offendingTeam: 'vilnius',
		otherNumber: '4',
		otherName: 'James Anderson',
		otherTeam: 'kaunas',
		explanation: 'AI detected a possible charge — offensive player lowering shoulder into defender.',
		camera: 3,
	},
	{
		id: 'd5',
		foulType: 'Possible Shooting Foul',
		confidence: 92,
		time: '03:49',
		period: '3rd Quarter',
		offendingNumber: '18',
		offendingName: 'Lukas Miller',
		offendingTeam: 'kaunas',
		otherNumber: '12',
		otherName: 'Noah Williams',
		otherTeam: 'vilnius',
		explanation: 'AI detected contact on the shooting arm during a layup attempt.',
		camera: 1,
	},
];

export interface HistoryEntry {
	id: string;
	foulType: string;
	time: string;
	period: string;
	status: DetectionStatus;
	confidence: number;
	offendingName: string;
	offendingTeam: string;
}

export function teamName(id: string): string {
	return teams.find((t) => t.id === id)?.name ?? id;
}

export function teamShort(id: string): string {
	return teams.find((t) => t.id === id)?.short ?? id;
}
