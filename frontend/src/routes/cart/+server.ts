import { connectToSolace } from '$lib/server/components/solace';
import solace from 'solclientjs';

export const POST = async ({ request }) => {
	try {
		const session = await connectToSolace();
		const destination = solace.SolclientFactory.createDurableQueueDestination('requests');

		const body = await request.json();
		const { customerName, customerEmail, items, totalPrice } = body;

		const message = solace.SolclientFactory.createMessage();
		const payload = {
			requestType: 'orders.create',
			data: {
				customerName,
				customerEmail,
				items,
				totalPrice
			}
		};

		message.setDestination(destination);
		message.setBinaryAttachment(Buffer.from(JSON.stringify(payload)));

		return new Promise((resolve, reject) => {
			session.sendRequest(
				message,
				5000,
				(_session, message) => {
					const payload = JSON.parse(message.getBinaryAttachment()?.toString() ?? '{}');
					console.log({ payload });
					resolve(new Response(JSON.stringify(payload), { status: 200 }));
				},
				(_session, error) => {
					reject(error);
				}
			);
		});
	} catch (error) {
		return new Response('Error adding product to cart', { status: 500 });
	}
};
