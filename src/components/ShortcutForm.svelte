<script lang="ts">
  import { appState } from '../lib/appStore.js';
  import { API_URL } from '../lib/api.js';
  import { createEventDispatcher } from 'svelte';

  let isOpen = false;
  let title = '';
  let description = '';
  let context = '';
  let windows = '';
  let macos = '';
  let linux = '';
  let software = '';
  let categories = [];
  let error = '';

  const dispatch = createEventDispatcher();
  let state;

  $: appState.subscribe(value => state = value);

  async function handleSubmit(e) {
    e.preventDefault();

    const shortcut = {
      title,
      description,
      context,
      windows,
      macos,
      linux,
      software: `/software/${software}`,
      categories: categories.map(c => `/categories/${c}`),
    };

    try {
      const response = await fetch(`${API_URL}shortcuts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shortcut),
      });

      if (response.ok) {
        dispatch('save');
        isOpen = false;
        clearForm();
      } else {
        error = "Erreur lors de l'envoi du raccourci.";
      }
    } catch (err) {
      error = "Erreur réseau : " + err.message;
    }
  }

  function clearForm() {
    title = '';
    description = '';
    context = '';
    windows = '';
    macos = '';
    linux = '';
    software = '';
    categories = [];
    error = '';
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header h2 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .toggle-button {
    color: #3b82f6;
    background: none;
    border: none;
    font-size: 1rem;
    cursor: pointer;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
  }

  .form.closed {
    max-height: 0;
    opacity: 0;
    pointer-events: none;
  }

  .form.open {
    max-height: 100
  }
  </style>
