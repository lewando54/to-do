<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let authToken = '';

    const showLoginModal = () => {
        dispatch('showLoginModal');
    }

    const showRegisterModal = () => {
        dispatch('showRegisterModal');
    }

    const logout = () => {
        dispatch('logout');
    }
</script>

<header>
    <nav>
        <p class="app-title">To-do</p>
        <div>
            {#if authToken == '' || authToken == undefined}
                <button class="secondary" on:click={showLoginModal}>Login</button>
                <button class="primary" on:click={showRegisterModal}>Register</button>
            {:else}
                <button class="primary" on:click={logout}>Logout</button>
            {/if}
        </div>
    </nav>
</header>

<style>
    nav{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        height: 60px;
        background: #fff;
        box-shadow: 0 0 10px #0000004d;
    }

    .app-title{
        font-size: 30px;
        font-weight: bold;
        user-select: none;
        text-transform: uppercase;
    }
</style>