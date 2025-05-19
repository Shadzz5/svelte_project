<script>
  import { onMount } from 'svelte';
  import { appState, setSoftware, setCategories, setSoftwareLoading, setCategoriesLoading } from './lib/appStore.js';
  import Filters from './components/Filters.svelte';
  import Container from './components/Container.svelte';
  import ShortcutList from './components/ShortcutList.svelte';
  import ShortcutForm from './components/ShortcutForm.svelte';
  import { getCollection } from './lib/api.js';

  let filters = { software: null, categories: [] };
  let shortcuts = [];
  let isShortcutsLoading = false;

  async function refreshShortcuts() {
    isShortcutsLoading = true;
    let searchParams = new URLSearchParams();
    if (filters.software) {
      searchParams.append('software.id', filters.software);
    }
    for (const categoryId of filters.categories) {
      searchParams.append('categories.id[]', categoryId);
    }
    shortcuts = await getCollection('shortcuts', searchParams);
    isShortcutsLoading = false;
  }

  onMount(async () => {
    setSoftwareLoading(true);
    setCategoriesLoading(true);
    getCollection('software').then(setSoftware);
    getCollection('categories').then(setCategories);
    await refreshShortcuts();
  });

  $: refreshShortcuts(), filters;

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
