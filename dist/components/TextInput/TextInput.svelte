<script>
  /**
   * The current value of the input. Bindable.
   * @type {string}
   */
  export let value = '';

  /**
   * Placeholder text for the input.
   * @type {string}
   */
  export let placeholder = '';

  /**
   * Optional ID for the input element, useful for label association.
   * @type {string | undefined}
   */
  export let id = undefined;

  /**
   * Optional name attribute for the input element.
   * @type {string | undefined}
   */
  export let name = undefined;

   /**
   * Whether the input is disabled.
   * @type {boolean}
   */
  export let disabled = false;

  /**
   * Exposes any other attributes passed to the component (e.g., maxlength, required, aria-label).
   */
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  // Forward common input events if needed, or rely on bind:value for changes.
  function handleInput(event) {
    // This updates the bound `value` prop automatically via bind:value
    // But we can also explicitly dispatch the 'input' event if consumers need it
    dispatch('input', event.target.value);
  }

  function handleChange(event) {
      dispatch('change', event.target.value);
  }

  function handleFocus(event) {
      dispatch('focus', event);
  }

  function handleBlur(event) {
      dispatch('blur', event);
  }

</script>

<input
  type="text"
  class="nlds-text-input"
  {id}
  {name}
  {placeholder}
  {disabled}
  bind:value
  on:input={handleInput}
  on:change={handleChange}
  on:focus={handleFocus}
  on:blur={handleBlur}
  {...$$restProps}
/>

<style>
  .nlds-text-input {
    display: block; /* Or inline-block if preferred */
    width: 100%; /* Take up container width */
    padding: 0.5rem 0.75rem; /* Adjust padding as needed */
    font-size: 1rem;
    font-family: inherit; /* Use the font from the surrounding context */
    line-height: 1.5;
    color: var(--nlds-input-text);
    background-color: var(--nlds-input-bg);
    background-clip: padding-box;
    border: 1px solid var(--nlds-input-border);
    appearance: none; /* Remove default system styling */
    box-sizing: border-box; /* Include padding and border in the element's total width and height */
  }

  /* Minimal focus state */
  .nlds-text-input:focus {
    color: var(--nlds-input-text);
    background-color: var(--nlds-input-bg);
    /* border-color: #86b7fe; /* Highlight color on focus */
    outline: 2px solid var(--nlds-input-focus-border);
    outline-offset: -2px;
    /* box-shadow: 0 0 0 0.2rem var(--input-focus-shadow); */
  }

  /* Placeholder styling */
  .nlds-text-input::placeholder {
    color: #6c757d;
    opacity: 1;
  }

  /* Disabled state */
  .nlds-text-input:disabled {
    background-color: var(--nlds-disabled-bg);
    opacity: 1;
    cursor: not-allowed;
  }
</style>
