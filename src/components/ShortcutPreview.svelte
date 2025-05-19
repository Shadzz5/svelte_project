<script>
  export let shortcut;
  let logoUrl = shortcut.image?.contentUrl
    ? 'https://shortcuts.api.pierre-jehan.com/' + shortcut.image.contentUrl
    : 'https://placehold.co/600x400';
</script>

<div class="flex flex-col gap-4 bg-light-100 dark:bg-dark-100 p-4 my-4 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold">{shortcut.title}</h2>
  <div class="flex gap-4">
    <img src={logoUrl} alt={shortcut.title} class="w-32 h-32 object-cover rounded-lg" />
    <div class="flex flex-col">
      <p>{shortcut.description}</p>
      <p>Software: {shortcut.software.name}</p>
      <p>Categories: {shortcut.categories.map(c => c.name).join(", ")}</p>
      <ul>
        <li>Windows : {shortcut.windows}</li>
        <li>Mac : {shortcut.macos}</li>
        <li>Linux : {shortcut.linux}</li>
      </ul>
    </div>
  </div>
</div>
