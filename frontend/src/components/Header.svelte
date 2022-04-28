<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    const showLoginModal = () => {
        dispatch('showLoginModal');
    }

    const showRegisterModal = () => {
        dispatch('showRegisterModal');
    }
</script>

<header>
    <nav>
        <p class="app-title">To-do</p>
        <div>
            <button class="secondary" on:click={showLoginModal}>Login</button>
            <button class="primary" on:click={showRegisterModal}>Register</button>
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
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }

    .app-title{
        font-size: 30px;
        font-weight: bold;
        user-select: none;
        text-transform: uppercase;
    }
</style>