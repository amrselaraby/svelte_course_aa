<script>
  import TodoList from "./lib/TodoList.svelte";
  import { v4 as uuid } from "uuid";
  import { onMount, tick } from "svelte";
  import { fly } from "svelte/transition";
  import spin from "./lib/transitions/spin";
  import fade from "./lib/transitions/fade";
  let todoList;
  let showList = true;
  let todos = null;

  let error = null;
  let isLoading = false;
  let isAdding = false;
  let disabledItems = [];

  onMount(() => {
    loadTodos();
  });

  async function loadTodos() {
    isLoading = true;
    await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10").then(
      async (response) => {
        if (response.ok) {
          todos = await response.json();
        } else {
          error = "An Error has occurred";
        }
      }
    );
    isLoading = false;
  }
  async function handleAddTodo(e) {
    e.preventDefault();
    isAdding = true;
    await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",

      body: JSON.stringify({
        title: e.detail.title,
        completed: false,
      }),
      headers: {
        "Content-type": "application/json;        charset=UTF-8",
      },
    }).then(async (response) => {
      if (response.ok) {
        const todo = await response.json();
        todos = [{ ...todo, id: uuid() }, ...todos];

        todoList.clearInput();
      }
    });
    isAdding = false;
    await tick();
    todoList.focus();
  }
  async function handleRemoveTodo(e) {
    const id = e.detail.id;
    if (disabledItems.includes(id)) return;
    disabledItems = [...disabledItems, id];
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        todos = todos.filter((t) => t.id !== e.detail.id);
      } else {
        alert("An Error has occurred");
      }
    });
    disabledItems = disabledItems.filter((itemId) => {
      itemId !== id;
    });
  }
  async function handleToggleTodo(e) {
    const id = e.detail.id;
    const value = e.detail.value;
    if (disabledItems.includes(id)) return;
    disabledItems = [...disabledItems, id];
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(async (response) => {
      if (response.ok) {
        const updateTodo = await response.json();
        todos = todos.map((todo) => {
          if (todo.id === id) {
            return updateTodo;
          }
          return { ...todo };
        });
      } else {
        alert("An Error has occurred");
      }
    });
    disabledItems = disabledItems.filter((itemId) => {
      itemId !== id;
    });
  }
</script>

<label>
  <input type="checkbox" name="show showList" bind:checked={showList} />
  Show/Hide List
</label>
{#if showList}
  <div style:opacity="0.5" style:max-width="800px">
    <TodoList
      {todos}
      {error}
      {isLoading}
      {disabledItems}
      scrollOnAdd="top"
      disableAdding={isAdding}
      bind:this={todoList}
      on:addtodo={handleAddTodo}
      on:removeTodo={handleRemoveTodo}
      on:toggleTodo={handleToggleTodo}
      let:todo
      let:index
    >
      <!-- <svelte:fragment slot="title">{index + 1}- {todo.title}</svelte:fragment> -->
    </TodoList>
  </div>
  {#if todos}
    <p>
      Number of todos: {#key todos.length}<span
          style:display="inline-block"
          in:fly|local={{ y: -10 }}
        >
          {todos.length}
        </span>
      {/key}
    </p>
  {/if}
{/if}

<style>
</style>
