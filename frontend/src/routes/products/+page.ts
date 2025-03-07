export const load = async ({ fetch }) => {
    const response = await fetch("/products");
    const products = await response.json();
    
    return { products };
};
