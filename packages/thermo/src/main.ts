import mqtt from 'mqtt';
import { startFakeEvents } from './fakeThermo';

const client = mqtt.connect('mqtt://mosca');

client.on('connect', () => {
	console.log('[THERMO]: connected to mqtt broker');

	startFakeEvents((event) => {
		console.log('[THERMO]: publishing event:');
		console.group();
		console.log({ event });
		console.groupEnd();

		client.publish('devices/thermo', JSON.stringify(event));
	});
});
