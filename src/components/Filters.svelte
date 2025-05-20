<script lang="ts">
  import { appState } from '../lib/appStore.js';
  import { onDestroy } from 'svelte';
    import type { Category, Software } from '../lib/interfaces.js';

  // export let filters = { software: null, categories: [] };
  let filters: {software:Software, categories:Category[]  } = $props()
  
  let state = { software: [], categories: [] };

  const unsubscribe = appState.subscribe(value => {
    state = value;
  });

  onDestroy(unsubscribe);

  function onSoftwareChange(event) {
    filters = {
      ...filters,
      software: event.target.value || null
    };
  }

function onCategoriesChange(event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  const selected = Array.from(selectElement.selectedOptions).map(option => option.value);

  filters = {
    ...filters,
    categories: selected
  };
}
</script>


<div class="filter-container">
  <h2 class="filter-title">Filters</h2>

  <div class="filter-groups">
    <!-- Software filter -->
    <div class="filter-group">
      <label for="software">Software</label>
      <select
        id="software"
        onchange={onSoftwareChange}
        bind:value={filters.software}
      >
        <option value="">All</option>
        {#each state.software ?? [] as s}
          <option value={s.id}>{s.name}</option>
        {/each}
      </select>
    </div>

    <!-- Categories filter -->
    <div class="filter-group">
      <label for="categories">Categories</label>
      <select
        id="categories"
        multiple
        size="5"
        onchange={onCategoriesChange}
        bind:value={filters.categories}
      >
        {#each state.categories ?? [] as c}
          <option value={c.id}>{c.name}</option>
        {/each}
      </select>
    </div>
  </div>
</div>

<style>
  .filter-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #f9f9f9;
    color: #333;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .filter-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .filter-groups {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media (min-width: 768px) {
    .filter-groups {
      flex-direction: row;
    }
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .filter-group label {
    margin-bottom: 0.25rem;
    font-weight: 600;
  }

  .filter-group select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
</style>