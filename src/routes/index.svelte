<script context="module" lang="ts">
import type { Load } from "@sveltejs/kit";
//   import { enhance } from "$lib/actions/form";
  export const load: Load = async ({ fetch }) => {
    const res = await fetch("/todos.json");
    if (res.ok) {
      const todos = await res.json();
      return {
        props: { todos }
      }
    }
    const { message } = await res.json();
    return {
      error: new Error(message)
    }
  };

</script>

<script lang="ts">
    import ToDoItem from "$lib/todo-item.svelte";
    export let todos: Todo[];
    const title = "Todo";

</script>
<style>
    .todos {
        width: 100%;
        max-width: 42rem;
        margin: 4rem auto 0 auto;
    }
    .new {
        margin: 0 0 0.5rem 0;
    }
    .new input {
        font-size: 28px;
        width: 100%;
        padding: 0.5em 1em 0.3em 1em;
        box-sizing: border-box;
        background: rgba(255, 255, 255, 0.05);
        text-align: center;
    }
    .todos :global(input) {
        border: 1px solid transparent;
    }
    .todos :global(input:focus-visible) {
        border: 1px solid hotpink;
        box-shadow: 4px 4px black;
        outline: none;
    }

</style>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="todos">
    <h1>{title}</h1>
    
    <form action="/todos.json" method="post" class="new">
        <input type="text" name="text" aria-label="Add a todo" placeholder="+ type to add a todo">
    </form>
    {#each todos as todo}
        <ToDoItem {todo}/>
    {/each}
</div>