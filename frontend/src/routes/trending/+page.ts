export const load = async ({ fetch }) => {
	const response = await fetch('/products/trending');
	const data = await response.json();
	return { products: data };
};
