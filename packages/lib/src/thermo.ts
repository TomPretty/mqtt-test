import { z } from 'zod';

//  ---- Types ---- //

export interface ThermoEvent {
	timestamp: number;
	temp: number;
}

const ThermoEvent = z.object({
	timestamp: z.number(),
	temp: z.number(),
});

//  ---- Functions ---- //

export function createEvent(temp: number): ThermoEvent {
	return {
		timestamp: Date.now(),
		temp,
	};
}

export function parseEvent(event: unknown): ThermoEvent {
	return ThermoEvent.parse(event);
}
