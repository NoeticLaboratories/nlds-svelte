<script>
  export let checked = false;
  export let indeterminate = false;
  export let disabled = false;
  export let readonly = false;
  export let hideLabel = false;
  export let labelText = "";
  export let name = "";
  export let id = `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  // When indeterminate is true, checked should be false
  $: if (indeterminate) checked = false;

  function handleChange(event) {
    if (readonly) {
      event.preventDefault();
      return;
    }

    checked = event.target.checked;
    indeterminate = false;
  }

  let checkboxElement;

  $: if (checkboxElement) {
    checkboxElement.indeterminate = indeterminate;
  }
</script>

<div class="checkbox-wrapper" class:disabled>
  <input
    type="checkbox"
    bind:this={checkboxElement}
    {id}
    {name}
    checked={checked && !indeterminate}
    {disabled}
    {readonly}
    on:change={handleChange}
    on:click
    aria-checked={indeterminate ? "mixed" : checked}
    class="checkbox-input"
    {...$$restProps}
  />

  <label for={id} class="checkbox-label" class:sr-only={hideLabel}>
    <span class="checkbox-control">
      <span class="checkbox-inner"></span>
    </span>
    {#if labelText}
      <span class="checkbox-label-text">{labelText}</span>
    {/if}
  </label>
</div>

<style>
  .checkbox-wrapper {
    position: relative;
    display: flex;
    align-items: flex-start;
    cursor: pointer;
    margin-bottom: 0.5rem;
    font-family: 'IBM Plex Sans', sans-serif;
  }

  .checkbox-input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
    overflow: hidden;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .checkbox-control {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    background-color: transparent;
    border: 1px solid #8d8d8d;
    margin-right: 0.5rem;
  }

  .checkbox-inner {
    display: none;
    width: 0.5rem;
    height: 0.5rem;
  }

  .checkbox-input:checked + .checkbox-label .checkbox-control {
    background-color: #0f62fe;
    border-color: #0f62fe;
  }

  .checkbox-input:checked + .checkbox-label .checkbox-inner {
    display: block;
    background-color: #ffffff;
  }

  .checkbox-input:indeterminate + .checkbox-label .checkbox-control {
    background-color: #0f62fe;
    border-color: #0f62fe;
  }

  .checkbox-input:indeterminate + .checkbox-label .checkbox-inner {
    display: block;
    width: 0.5rem;
    height: 2px;
    background-color: #ffffff;
  }

  .checkbox-input:focus + .checkbox-label .checkbox-control {
    outline: 2px solid #0f62fe;
    outline-offset: 2px;
  }

  .checkbox-label-text {
    font-size: 0.875rem;
    line-height: 1.29;
    color: #161616;
  }

  .disabled {
    cursor: not-allowed;
  }

  .disabled .checkbox-label {
    cursor: not-allowed;
    color: #8d8d8d;
  }

  .disabled .checkbox-control {
    border-color: #c6c6c6;
  }

  .disabled .checkbox-input:checked + .checkbox-label .checkbox-control,
  .disabled .checkbox-input:indeterminate + .checkbox-label .checkbox-control {
    background-color: #c6c6c6;
    border-color: #c6c6c6;
  }
</style>
