import { writable } from 'svelte/store';

export const appState = writable({
  software: [],
  categories: [],
  isSoftwareLoading: false,
  isCategoriesLoading: false,
});

export function setSoftware(software) {
  appState.update(state => ({ ...state, software, isSoftwareLoading: false }));
}
export function setCategories(categories) {
  appState.update(state => ({ ...state, categories, isCategoriesLoading: false }));
}
export function setSoftwareLoading(isLoading) {
  appState.update(state => ({ ...state, isSoftwareLoading: isLoading }));
}
export function setCategoriesLoading(isLoading) {
  appState.update(state => ({ ...state, isCategoriesLoading: isLoading }));
}
