<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import { scale } from 'svelte/transition';

    let registerData = {
        username: '',
        password: ''
    };

    const onClose = () => dispatch('hide');

    const onSubmit = () => dispatch('register', registerData);
</script>

<div class="modal-wrapper" transition:scale>
    <div class="modal">
        <div class="modal-header">
            <h2>Register</h2>
            <button class="modal-exit" on:click={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>
        </div>
        <form on:submit|preventDefault={onSubmit}>
            <div class="modal-input">
                <label for="username">
                    Username
                </label>
                <input type="text" id="username" name="username" bind:value={registerData.username}>
            </div>
            <div class="modal-input">
                <label for="password">
                    Password
                </label>
                <input type="password" id="password" name="password" bind:value={registerData.password}>
            </div>
            <button class="primary" type="submit">Register</button>
        </form>
    </div>
</div>