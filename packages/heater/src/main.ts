import { parseThermoEvent } from '@homeauto/lib';
import mqtt from 'mqtt';
import { processThermoEvent } from './fakeHeater';

const client = mqtt.connect('mqtt://mosca');

client.on('connect', () => {
	console.log('[HEATER]: connected to mqtt broker');

	client.subscribe('devices/thermo', (err: Error | null) => {
		if (!err) {
			console.log("[HEATER]: subscribed to 'devices/thermo'");
		}
	});
});

client.on('message', (_topic, message) => {
	try {
		const thermoEvent = parseThermoEvent(
			JSON.parse(message.toString()) as unknown,
		);

		processThermoEvent(thermoEvent, (heaterEvent) => {
			console.log('[HEATER]: publishing event: ');
			console.group();
			console.log({ event: heaterEvent });
			console.groupEnd();

			client.publish('devices/heater', JSON.stringify(heaterEvent));
		});
	} catch (error) {
		if (error instanceof Error) {
			console.log('[HEATER]: error processing thermo event: ');
			console.group();
			console.log(error.message);
			console.groupEnd();
		} else {
			console.log('[HEATER]: error processing thermo event');
		}
	}
});
