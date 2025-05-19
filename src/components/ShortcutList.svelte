<script>
  import ShortcutPreview from './ShortcutPreview.svelte';
  export let shortcuts = [];
  export let loading = false;
</script>

<div class="flex flex-col gap-4 bg-light-100 dark:bg-dark-100 p-4 my-4 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold">Shortcuts ({shortcuts.length})</h2>
  {#if loading}
    Loading...
  {:else}
    {#each shortcuts as shortcut (shortcut.id)}
      <ShortcutPreview {shortcut} />
    {/each}
  {/if}
</div>
