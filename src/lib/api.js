export const API_URL = 'https://shortcuts.api.pierre-jehan.com/';

export async function getCollection(resource, params) {
  let url = API_URL + resource;
  if (params) {
    url += '?' + params.toString();
  }
  const response = await fetch(url);
  const collection = await response.json();
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate a delay
  return collection['hydra:member'];
}
