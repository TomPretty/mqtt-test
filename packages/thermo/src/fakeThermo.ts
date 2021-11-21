import type { ThermoEvent } from '@homeauto/lib';
import { createThermoEvent } from '@homeauto/lib';

export function startFakeEvents(onEvent: (event: ThermoEvent) => void): void {
	const FAKE_TEMPS = [15, 17.5, 20, 17.5];

	function loop(index: number): void {
		onEvent(createThermoEvent(FAKE_TEMPS[index]));

		setTimeout(() => loop((index + 1) % FAKE_TEMPS.length), 2_000);
	}

	loop(0);
}
