import { writable } from 'svelte/store';

export const isModalOpen = writable(false);

export const openModal = () => {
  isModalOpen.set(true);
};

export const closeModal = () => {
  isModalOpen.set(false);
};
