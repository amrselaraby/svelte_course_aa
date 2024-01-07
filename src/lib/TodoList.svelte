<svelte:options immutable={true} />

<script>
  import Button from "./Button.svelte";
  import {
    createEventDispatcher,
    onDestroy,
    onMount,
    beforeUpdate,
    afterUpdate,
  } from "svelte";

  onMount(() => {
    console.log("Mounted");
    return () => {
      console.log("Destroyed 2");
    };
  });

  beforeUpdate(() => {
    if (listDiv) {
      console.log(listDiv.offsetHeight);
    }
  });
  afterUpdate(() => {
    console.log(listDiv.offsetHeight);
  });

  onDestroy(() => {
    console.log("Destroyed");
  });

  let inputText = "";
  let input, listDiv;

  export let todos = [];
  export const readOnly = "read only";
  export function clearInput() {
    inputText = "";
  }
  export function focusInput() {
    input.focus();
  }

  const dispatch = createEventDispatcher();

  function handleAddTodo() {
    const isNotCancelled = dispatch(
      "addtodo",
      {
        title: inputText,
      },
      { cancelable: true }
    );
    if (isNotCancelled) {
      inputText = "";
    }
  }

  function handleRemoveTodo(id) {
    dispatch("removeTodo", { id });
  }
  function handleToggleTodo(id, value) {
    dispatch("toggleTodo", { id, value });
  }
</script>

<div class="todo-list-wrapper">
  <div class="todo-list" bind:this={listDiv}>
    <ul>
      {#each todos as { id, title, completed } (id)}
        <li>
          <label>
            <input
              type="checkbox"
              checked={completed}
              on:input={((event) => (event.currentTarget.checked = completed),
              handleToggleTodo(id, !completed))}
            />
            {title}
          </label>
          <button on:click={() => handleRemoveTodo(id)}>Remove</button>
        </li>
      {/each}
    </ul>
  </div>

  <form class="add-todo-form" on:submit|preventDefault={handleAddTodo}>
    <input bind:value={inputText} bind:this={input} />
    <Button type="submit" disabled={!inputText}>Add</Button>
  </form>
</div>

<style>
</style>
