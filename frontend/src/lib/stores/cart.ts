import { writable } from 'svelte/store';

type CartItem = {
	productId: number;
	quantity: number;
	name: string;
	price: string;
};

export const cartStore = writable<CartItem[]>([]);

export const addToCart = (productId: number, quantity: number, name: string, price: string) => {
	cartStore.update((items) => {
		const item = items.find((item) => item.productId === productId);
		if (item) {
			return items.map((item) =>
				item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
			);
		}
		return [...items, { productId, quantity, name, price }];
	});
};

export const removeFromCart = (productId: number) => {
	cartStore.update((items) => items.filter((item) => item.productId !== productId));
};

export const clearCart = () => {
	cartStore.set([]);
};
