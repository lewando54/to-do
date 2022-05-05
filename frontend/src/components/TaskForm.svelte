<script>
    let displayForm = false;
    let buttonClass = 'circle add-task';
    
    import { fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
</script>
<div class="container">
    <button class={buttonClass} on:click={() => {
        displayForm = !displayForm; 
        buttonClass = buttonClass == 'circle add-task' ? 'circle close-add-task' : 'circle add-task'
        }
    }>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
    </button>
    {#if displayForm}
    <form transition:fly={{ duration: 400, y: 200, opacity: 0, easing: quintOut}}>
        <div class="modal-input">
            <label for="task-title">Title</label>
            <input required id="task-title" type="text" placeholder="e.g. Take the dog for a walk" />
        </div>
        <div class="modal-input">
            <label for="task-title">Description</label>
            <textarea required placeholder="e.g. Walk minimum 3km on the standard route. Remember to bring some water!!!"></textarea>
        </div>
        <button type="submit" class="primary">Add task</button>
    </form>
    {/if}
</div>


<style>
    div.container{
        width: 100%;
    }

    @media screen and (min-width: 768px) {
        div.container{
            width: 40%;
        }
    }
    
    .circle{
        margin-bottom: 1rem;
        border: 0;
        border-radius: 100%;
        width: 1rem;
        height: 2rem;
        transition: all 0.2s ease-in-out;
        position: relative;
    }

    .circle svg{
        position: absolute;
        top: 8px;
        left: 8px;
        transition: all 0.2s ease-in-out;
    }

    .add-task{
        background-color: #009000;
        color: #fff;
    }

    .add-task svg{
        transform: rotate(45deg);
    }

    .close-add-task{
        background-color: #900000;
        color: #fff;
    }

    form{
        background-color: #f4f4f4;
        width: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        border: 1px solid #c3c3c3;
        padding: 1rem;
    }

    form textarea{
        padding: 0.5rem;
    }

    textarea{
        resize: vertical;
        max-height: 10rem;
        min-height: 3rem;
        border-radius: 5px;
    }
</style>