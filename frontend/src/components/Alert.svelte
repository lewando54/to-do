<script>
    import { createEventDispatcher } from 'svelte';
    export let alertType = 'success';

    import {onMount, onDestroy} from 'svelte';

    import { fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    const dispatch = createEventDispatcher();

    let timeout = null;

    export const hide = (message) => {
        dispatch('hide');
    };

    onMount(() => {
        timeout = setTimeout(() => {
			hide();
		}, 3000);
    });

    onDestroy(() => {
        timeout = null;
    })
</script>

<!-- Alert box -->
<div transition:fly={{ duration: 400, x: 200, opacity: 0, easing: quintOut}} class={'alert-box ' + alertType}>
    <div class="alert-box__close" on:click={hide}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
    </div>
    <div class="alert-box__content">
        <div class="alert-box__icon">
            {#if alertType == 'success'}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
            {:else if alertType == 'warning'}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                </svg>
            {:else if alertType == 'error'}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                </svg>
            {/if}
        </div>
        <div class="alert-box__text">
            <p class="alert-box__message">
                <slot></slot>
            </p>
        </div>
    </div>
</div>

<style>
    div.alert-box{
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        width: 23rem;
        height: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
        border-radius: 5px;
    }

    .alert-box__content{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .alert-box__text{
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        width: 100%;
    }

    .alert-box__message{
        width: 100%;
        text-align: center;
        margin: 0;
    }

    .alert-box__icon{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 1rem;
    }

    .alert-box__close{
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
        color: #fff;
        align-self: flex-end;
        cursor: pointer;
    }

    .success{
        background-color: #4CAF50;
        color: #d0ffd1;
    }

    .warning{
        background-color: #ff9800;
        color: #ffedd2;
    }

    .error{
        background-color: #f44336;
        color: #ffdcd9;
    }
</style>