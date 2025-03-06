import { writable } from 'svelte/store';

export const sidebarOpen = writable(true); 
export const toggleSidebar = () => sidebarOpen.update(v => !v);