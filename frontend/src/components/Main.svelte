<script>
    import Todo from '../components/Todo.svelte';
    export let authToken = '';
</script>

<main>
    {#if authToken == '' || authToken == undefined}
        <h1>A simple Todo App</h1>
        <p>Made by <a href="https://github.com/lewando54" target="_blank">lewando54</a></p>
    {:else}
        <Todo on:task-added on:task-deleted/>
    {/if}
</main>

<style>
    main{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        text-align: center;
    }
</style>
