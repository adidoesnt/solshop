export const load = async ({ fetch }) => {
	const response = await fetch('/products/for-you');
	const data = await response.json();
	return { products: data };
};
