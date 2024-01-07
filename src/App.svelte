<script>
  import TodoList from "./lib/TodoList.svelte";
  import { v4 as uuid } from "uuid";
  let showList = true;
  let todos = [
    {
      id: uuid(),
      title: "Todo 1",
      completed: true,
    },
    {
      id: uuid(),
      title: "Todo 2",
      completed: false,
    },
    {
      id: uuid(),
      title: "Todo 3",
      completed: true,
    },
  ];
  let todoList;
  function handleAddTodo(e) {
    e.preventDefault();

    todos = [
      ...todos,
      {
        id: uuid(),
        title: e.detail.title,
        completed: false,
      },
    ];
    todoList.clearInput();
  }
  function handleRemoveTodo(e) {
    todos = todos.filter((t) => t.id !== e.detail.id);
  }
  function handleToggleTodo(e) {
    todos = todos.map((todo) => {
      if (todo.id === e.detail.id) {
        return { ...todo, completed: e.detail.value };
      }
      return { ...todo };
    });
  }
</script>

<label>
  <input type="checkbox" name="show showList" bind:checked={showList} />
  Show/Hide List
</label>
{#if showList}
  <TodoList
    {todos}
    bind:this={todoList}
    on:addtodo={handleAddTodo}
    on:removeTodo={handleRemoveTodo}
    on:toggleTodo={handleToggleTodo}
  />
{/if}

<style>
</style>
