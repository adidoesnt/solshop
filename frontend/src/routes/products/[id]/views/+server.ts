import { connectToSolace } from '$lib/server/components/solace';
import solace from 'solclientjs';

export const POST = async ({ params, cookies }) => {
	const { id } = params;
	const customerEmail = cookies.get('customerEmail');

	if (!customerEmail) {
		return new Response('Unable to track view', { status: 401 });
	}

	const session = await connectToSolace();
	const destination = solace.SolclientFactory.createTopicDestination('products/view');

	const message = solace.SolclientFactory.createMessage();
	const payload = {
		customerEmail,
		productId: id
	};

	message.setDestination(destination);
	message.setBinaryAttachment(Buffer.from(JSON.stringify(payload)));

	try {
		session.send(message);
		return new Response('View tracked', { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response('Unable to track view', { status: 500 });
	}
};
