export type HeaterEventType = 'TURNED_ON' | 'TURNED_OFF';

export interface HeaterEvent {
	timestamp: number;
	type: HeaterEventType;
}

export function createEvent(type: HeaterEventType): HeaterEvent {
	return { timestamp: Date.now(), type };
}
