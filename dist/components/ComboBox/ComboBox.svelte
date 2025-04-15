<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { slide } from 'svelte/transition';

  export let items = [];
  export let selectedId = "";
  export let placeholder = "Select an option";
  export let titleText = "";
  export let helperText = "";
  export let invalid = false;
  export let invalidText = "";
  export let disabled = false;
  export let light = false;
  export let open = false;
  export let id = `combobox-${Math.random().toString(36).substr(2, 9)}`;

  const dispatch = createEventDispatcher();

  let inputValue = "";
  let inputElement;
  let menuElement;
  let highlightedIndex = -1;
  let filteredItems = items;

  // Sync input value with selectedItem
  $: selectedItem = items.find(item => item.id === selectedId);
  $: if (selectedItem) {
    inputValue = selectedItem.text;
  }

  function toggleDropdown() {
    if (disabled) return;
    open = !open;

    if (open) {
      inputElement.focus();
      highlightedIndex = selectedId
        ? items.findIndex(item => item.id === selectedId)
        : -1;
    }
  }

  function handleInput() {
    open = true;

    if (inputValue === "") {
      filteredItems = items;
      selectedId = "";
    } else {
      filteredItems = items.filter(item =>
        item.text.toLowerCase().includes(inputValue.toLowerCase())
      );
    }

    // Reset highlighted index
    highlightedIndex = -1;

    dispatch('input', {
      value: inputValue
    });
  }

  function selectItem(item) {
    selectedId = item.id;
    inputValue = item.text;
    open = false;

    dispatch('select', {
      selectedId,
      selectedItem: item
    });
  }

  function handleKeyDown(event) {
    if (disabled) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!open) {
          open = true;
          highlightedIndex = 0;
        } else {
          highlightedIndex =
            (highlightedIndex + 1) % filteredItems.length;
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (open) {
          highlightedIndex =
            (highlightedIndex - 1 + filteredItems.length) % filteredItems.length;
        }
        break;

      case 'Enter':
        if (open && highlightedIndex >= 0) {
          event.preventDefault();
          selectItem(filteredItems[highlightedIndex]);
        }
        break;

      case 'Escape':
        if (open) {
          event.preventDefault();
          open = false;
        }
        break;
    }
  }

  function handleClickOutside(event) {
    if (open && !event.composedPath().includes(menuElement)) {
      open = false;
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div
  class="combobox-wrapper"
  class:light
  class:invalid
  class:disabled
>
  {#if titleText}
    <label for={id} class="combobox-label">
      {titleText}
    </label>
  {/if}

  <div class="combobox-input-wrapper">
    <input
      type="text"
      {id}
      bind:this={inputElement}
      bind:value={inputValue}
      on:input={handleInput}
      on:keydown={handleKeyDown}
      on:focus={() => { if (!open && !disabled) open = true; }}
      {placeholder}
      {disabled}
      class="combobox-input"
      role="combobox"
      aria-expanded={open}
      aria-autocomplete="list"
      aria-owns={`${id}-menu`}
      aria-controls={`${id}-menu`}
      aria-activedescendant={
        open && highlightedIndex >= 0
          ? `${id}-item-${highlightedIndex}`
          : undefined
      }
    />

    <button
      type="button"
      class="combobox-toggle-button"
      aria-label={open ? "Close menu" : "Open menu"}
      {disabled}
      on:click={toggleDropdown}
    >
      <svg
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        style="will-change: transform;"
        aria-hidden="true"
        class="chevron-icon"
        class:open
        viewBox="0 0 16 16"
        width="16"
        height="16"
      >
        <path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
      </svg>
    </button>
  </div>

  {#if open}
    <ul
      bind:this={menuElement}
      id={`${id}-menu`}
      class="combobox-menu"
      role="listbox"
      transition:slide={{ duration: 100 }}
    >
      {#if filteredItems.length === 0}
        <li class="menu-no-results">No results found</li>
      {:else}
        {#each filteredItems as item, index}
          <li
            id={`${id}-item-${index}`}
            class="menu-item"
            class:highlighted={index === highlightedIndex}
            class:selected={item.id === selectedId}
            role="option"
            aria-selected={item.id === selectedId}
            on:click={() => selectItem(item)}
          >
            {item.text}
          </li>
        {/each}
      {/if}
    </ul>
  {/if}

  {#if helperText && !invalid}
    <div class="helper-text">{helperText}</div>
  {/if}

  {#if invalid && invalidText}
    <div class="invalid-text">{invalidText}</div>
  {/if}
</div>

<style>
  .combobox-wrapper {
    position: relative;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
  }

  .combobox-label {
    display: block;
    font-size: 0.75rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
    color: #525252;
  }

  .combobox-input-wrapper {
    position: relative;
    display: flex;
  }

  .combobox-input {
    width: 100%;
    height: 2.5rem;
    padding: 0 2.5rem 0 1rem;
    border: 1px solid #8d8d8d;
    background-color: #ffffff;
    color: #161616;
    font-size: 0.875rem;
  }

  .combobox-input:focus {
    outline: 2px solid #0f62fe;
    outline-offset: -2px;
  }

  .combobox-toggle-button {
    position: absolute;
    right: 0;
    top: 0;
    width: 2.5rem;
    height: 100%;
    background: transparent;
    border: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .chevron-icon {
    fill: #161616;
    transform: rotate(0);
    transition: transform 110ms cubic-bezier(0.2, 0, 0.38, 0.9);
  }

  .chevron-icon.open {
    transform: rotate(180deg);
  }

  .combobox-menu {
    position: absolute;
    width: 100%;
    max-height: 15rem;
    overflow-y: auto;
    background-color: #ffffff;
    border: 1px solid #8d8d8d;
    z-index: 1000;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .menu-item {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    cursor: pointer;
  }

  .menu-item:hover {
    background-color: #e8e8e8;
  }

  .menu-item.highlighted {
    background-color: #e5f0ff;
  }

  .menu-item.selected {
    background-color: #e0f6ff;
  }

  .menu-no-results {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    color: #525252;
    font-style: italic;
  }

  .helper-text,
  .invalid-text {
    margin-top: 0.25rem;
    font-size: 0.75rem;
    line-height: 1.33;
  }

  .helper-text {
    color: #525252;
  }

  .invalid-text {
    color: #da1e28;
  }

  .invalid .combobox-input {
    border-color: #da1e28;
  }

  .light {
    background-color: #f4f4f4;
  }

  .light .combobox-input {
    background-color: #f4f4f4;
  }

  .disabled {
    cursor: not-allowed;
  }

  .disabled .combobox-input {
    border-color: #c6c6c6;
    background-color: #f4f4f4;
    color: #8d8d8d;
    cursor: not-allowed;
  }

  .disabled .combobox-toggle-button {
    cursor: not-allowed;
  }

  .disabled .chevron-icon {
    fill: #8d8d8d;
  }
</style>
