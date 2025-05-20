<script lang="ts">
  import { onMount } from 'svelte';
  import { appState, setSoftware, setCategories, setSoftwareLoading, setCategoriesLoading } from './lib/appStore.js';
  import Filters from './components/Filters.svelte';
  import Container from './components/Container.svelte';
  import ShortcutList from './components/ShortcutList.svelte';
  import ShortcutForm from './components/ShortcutForm.svelte';
  import { getCollection } from './lib/api.js';
  import type { Shortcut, Software, Category } from './lib/interfaces.js';

  let filters: { software: Software | null; categories: Category[] } = {
    software: null,
    categories: []
  };

  let shortcuts: Shortcut[] = [];
  let isShortcutsLoading = false;

  async function refreshShortcuts() {
    isShortcutsLoading = true;
    const searchParams = new URLSearchParams();

    if (filters.software) {
      searchParams.append('software.id', filters.software.id.toString());
    }

    for (const category of filters.categories) {
      searchParams.append('categories.id[]', category.id.toString());
    }

    shortcuts = await getCollection('shortcuts', searchParams);
    isShortcutsLoading = false;
  }

  onMount(async () => {
    setSoftwareLoading(true);
    setCategoriesLoading(true);

    const [softwareList, categoryList] = await Promise.all([
      getCollection('software', {}),
      getCollection('categories', {})
    ]);

    setSoftware(softwareList);
    setCategories(categoryList);
    setSoftwareLoading(false);
    setCategoriesLoading(false);

    await refreshShortcuts();
  });

  // Réagir à tout changement de `filters`
  $: if (filters) {
    refreshShortcuts();
  }
</script>
<main>
  <Container>
    <Filters bind:filters />
  </Container>
  <Container>
    <ShortcutForm on:save={refreshShortcuts} />
  </Container>
  <Container>
    <ShortcutList {shortcuts} loading={isShortcutsLoading} />
  </Container>
</main>