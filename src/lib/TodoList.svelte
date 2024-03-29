<svelte:options immutable={true} />

<script>
  import Button from "./Button.svelte";
  import { createEventDispatcher, afterUpdate } from "svelte";
  import FaRegTrashAlt from "svelte-icons/fa/FaRegTrashAlt.svelte";
  import { flip } from "svelte/animate";
  import { scale, crossfade } from "svelte/transition";
  afterUpdate(() => {
    if (scrollOnAdd) {
      let pos;
      if (scrollOnAdd === "top") pos = 0;
      if (scrollOnAdd === "bottom") pos = listDivScrollHeight;
      if (autoScroll) {
        listDiv.scrollTo(0, pos);
      }
      autoScroll = false;
    }
  });

  const [send, receive] = crossfade({
    duration: 400,
    fallback(node) {
      return scale(node, { start: 0.5, duration: 300 });
    },
  });
  export let todos = null;
  export let error = null;
  export let isLoading = false;
  export let disableAdding = false;
  export let disabledItems = null;
  export let scrollOnAdd = undefined;

  $: done = todos ? todos.filter((t) => t.completed) : [];
  $: todo = todos ? todos.filter((t) => !t.completed) : [];

  let inputText = "";
  let input, listDiv, autoScroll, listDivScrollHeight;
  let prevTodos = todos;
  const dispatch = createEventDispatcher();

  $: {
    autoScroll = todos && prevTodos && todos.length > prevTodos.length;
    prevTodos = todos;
  }

  export function clearInput() {
    inputText = "";
  }
  export function focusInput() {
    input.focus();
  }

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
  {#if isLoading}
    <p>Loading....</p>
  {:else if error}
    <p class="state-text">{error}</p>
  {:else if todos}
    <div class="todo-list" bind:this={listDiv}>
      <div bind:offsetHeight={listDivScrollHeight}>
        {#if todos.length === 0}
          <p class="state-text">No Todos Yet</p>
        {:else}
          <div style:display="flex">
            {#each [todo, done] as list, index}
              <div class="list-wrapper">
                <h2>{index === 0 ? "Todo" : "Done"}</h2>
                <ul>
                  {#each list as todo, index (todo.id)}
                    {@const { id, completed, title } = todo}
                    <li animate:flip={{ duration: 300 }}>
                      <slot {todo} {index}>
                        <div
                          in:receive|local={{ key: id }}
                          out:send|local={{ key: id }}
                          class:completed
                        >
                          <label>
                            <input
                              disabled={disabledItems.includes(id)}
                              type="checkbox"
                              checked={completed}
                              on:input={(event) => {
                                event.currentTarget.checked = completed;
                                handleToggleTodo(id, !completed);
                              }}
                            />
                            <slot name="title">{title}</slot>
                          </label>
                          <button
                            disabled={disabledItems.includes(id)}
                            aria-label="Remove Todo: {title}"
                            class="remove-todo-items"
                            on:click={() => handleRemoveTodo(id)}
                          >
                            <span
                              style:width="10px"
                              style:display="inline-block"
                            >
                              <FaRegTrashAlt />
                            </span>
                          </button>
                        </div>
                      </slot>
                    </li>
                  {/each}
                </ul>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {/if}
  <form class="add-todo-form" on:submit|preventDefault={handleAddTodo}>
    <input
      disabled={disableAdding || !todos}
      bind:value={inputText}
      bind:this={input}
      placeholder="New Todo"
    />
    <Button type="submit" disabled={!inputText || disableAdding || !todos}
      >Add</Button
    >
  </form>
</div>

<style lang="scss">
  .todo-list-wrapper {
    background-color: #424242;
    border: 1px solid #4b4b4b;
    .state-text {
      margin: 0;
      padding: 15px;
      text-align: center;
    }
    .todo-list {
      max-height: 400px;
      overflow: auto;
      .list-wrapper {
        padding: 10px;
        flex: 1;
        h2 {
          margin: 0 0 10px;
        }
        ul {
          margin: 0;
          padding: 0px;
          list-style: none;
        }
        list-style: none;
        li > div {
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          background-color: #303030;
          border-radius: 5px;
          padding: 10px;
          position: relative;
          label {
            cursor: pointer;
            font-size: 18px;
            display: flex;
            align-items: baseline;
            padding-right: 20px;
            input[type="checkbox"] {
              margin: 0 10px 0 0;
              cursor: pointer;
            }
          }
          &.completed > label {
            opacity: 0.5;
            text-decoration: line-through;
          }
          .remove-todo-items {
            border: none;
            background: none;
            padding: 5px;
            position: absolute;
            right: 10px;
            cursor: pointer;
            display: none;
            :global(svg) {
              fill: #bd1414;
            }
          }
          &:hover {
            .remove-todo-items {
              display: block;
            }
          }
        }
      }
    }
    .add-todo-form {
      padding: 15px;
      background-color: #303030;
      display: flex;
      flex-wrap: wrap;
      border-top: 1px solid #4b4b4b;
      input {
        flex: 1;
        background-color: #424242;
        border: 1px solid 4b4b4b;
        color: white;
        padding: 10px;
        border-radius: 5px;
        margin-right: 10px;
      }
    }
  }
</style>
