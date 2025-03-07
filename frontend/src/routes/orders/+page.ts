export const load = async ({ fetch }) => {
	const response = await fetch('/orders');
	const orders = await response.json();

	return { orders };
};
