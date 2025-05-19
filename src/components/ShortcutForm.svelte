<script>
  import { appState } from '../lib/appStore.js';
  import { API_URL } from '../lib/api.js';
  import { createEventDispatcher } from 'svelte';
  import { get } from 'svelte/store';

  let isOpen = false;
  let title = '';
  let description = '';
  let context = '';
  let windows = '';
  let macos = '';
  let linux = '';
  let software = '';
  let categories = [];

  const dispatch = createEventDispatcher();
  $: state = get(appState);

  async function handleSubmit(e) {
    e.preventDefault();
    const shortcut = {
      title,
      description,
      context,
      windows,
      macos,
      linux,
      software: '/software/' + software,
      categories: categories.map(c => '/categories/' + c),
    };
    const response = await fetch(API_URL + 'shortcuts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(shortcut),
    });
    if (response.ok) {
      dispatch('save');
    }
    isOpen = false;
  }
</script>

<div class="flex flex-col gap-4 p-4 my-4 rounded-lg shadow-md">
  <div class="flex justify-between items-center">
    <h2 class="text-2xl font-bold">Add Shortcut</h2>
    <button on:click={() => isOpen = !isOpen} class="text-blue-500">
      {isOpen ? "Close" : "Open"}
    </button>
  </div>
  <form on:submit|preventDefault={handleSubmit} class={`flex flex-col gap-4 ${isOpen ? "h-auto" : "h-0 overflow-hidden"}`} style="transition: height 0.3s ease-in-out">
    <input type="text" bind:value={title} placeholder="Title" required />
    <textarea bind:value={description} placeholder="Description" rows="2"></textarea>
    <textarea bind:value={context} placeholder="Context" rows="2"></textarea>
    <input type="text" bind:value={windows} placeholder="Windows" />
    <input type="text" bind:value={macos} placeholder="Mac OS" />
    <input type="text" bind:value={linux} placeholder="Linux" />
    <select bind:value={software} required>
      <option value="">Select software...</option>
      {#each state.software as s}
        <option value={s.id}>{s.name}</option>
      {/each}
    </select>
    <select bind:value={categories} multiple>
      {#each state.categories as c}
        <option value={c.id}>{c.name}</option>
      {/each}
    </select>
    <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer">Add Shortcut</button>
  </form>
</div>
