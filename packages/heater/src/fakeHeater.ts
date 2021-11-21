/* eslint-disable no-global-assign -- We need some global state here keeping track of if the heater is on/off */
import type { HeaterEvent, ThermoEvent } from '@homeauto/lib';
import { createHeaterEvent } from '@homeauto/lib';

let status: 'ON' | 'OFF' = 'OFF';

export function processThermoEvent(
	thermoEvent: ThermoEvent,
	onHeaterEvent: (heaterEvent: HeaterEvent) => void,
): void {
	if (thermoEvent.temp >= 20 && status === 'ON') {
		status = 'OFF';
		onHeaterEvent(createHeaterEvent('TURNED_OFF'));
	} else if (thermoEvent.temp <= 15 && status === 'OFF') {
		status = 'ON';
		onHeaterEvent(createHeaterEvent('TURNED_ON'));
	}
}
