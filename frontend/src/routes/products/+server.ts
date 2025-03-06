import { connectToSolace } from '$lib/server/components/solace';
import solace from 'solclientjs';

export const GET = async () => {
	try {
		const session = await connectToSolace();
		const destination = solace.SolclientFactory.createDurableQueueDestination('requests');

		const message = solace.SolclientFactory.createMessage();
		const payload = {
			requestType: 'products.get',
			data: {}
		}

		message.setDestination(destination);
		message.setBinaryAttachment(Buffer.from(JSON.stringify(payload)));

		return new Promise((resolve, reject) => {
			session.sendRequest(
				message,
				5000,
				(_session, message) => {
					const payload = JSON.parse(message.getBinaryAttachment()?.toString() ?? '{}');
					resolve(new Response(JSON.stringify(payload), { status: 200 }));
				},
				(_session, error) => {
					reject(error);
				}
			);
		}).catch(error => {
			console.error(error);
			return new Response(JSON.stringify({ error: 'Failed to get products' }), { status: 500 });
		});

	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: 'Failed to get products' }), { status: 500 });
	}
};
