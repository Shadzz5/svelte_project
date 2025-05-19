<script>
  import { appState } from '../lib/appStore.js';
  import { get } from 'svelte/store';

  export let filters = { software: null, categories: [] };

  $: state = get(appState);

  function onSoftwareChange(event) {
    filters = { ...filters, software: event.target.value || null };
  }
  function onCategoriesChange(event) {
    const selected = Array.from(event.target.selectedOptions).map(opt => opt.value);
    filters = { ...filters, categories: selected };
  }
</script>

<div class="flex flex-col gap-4 bg-light-100 dark:bg-dark-100 p-4 my-4 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold">Filters</h2>
  <div class="flex gap-4">
    <div>
      <label for="software">Software</label>
      <select id="software" on:change={onSoftwareChange} bind:value={filters.software}>
        <option value="">All</option>
        {#each state.software as s}
          <option value={s.id}>{s.name}</option>
        {/each}
      </select>
    </div>
    <div>
      <label for="categories">Categories</label>
      <select id="categories" multiple on:change={onCategoriesChange} bind:value={filters.categories}>
        {#each state.categories as c}
          <option value={c.id}>{c.name}</option>
        {/each}
      </select>
    </div>
  </div>
</div>
