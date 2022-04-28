<script>
    import Todo from '../components/Todo.svelte';
    export let loggedIn = false;
</script>

<main>
    {#if !loggedIn}
        <h1>A simple Todo App</h1>
        <p>Made by <a href="https://github.com/lewando54" target="_blank">lewando54</a></p>
    {:else}
        <Todo />
    {/if}
</main>

<style>
    main{
        padding: 1rem;
        text-align: center;
    }
</style>
