<script>
	let name = 'world';
	const loggedIn = true;

	let loginModalVisible = false;
	let registerModalVisible = false;

	import Header from './components/Header.svelte';
	import Main from './components/Main.svelte';
	import Login from './components/auth/Login.svelte';
	import Register from './components/auth/Register.svelte';

	const showLoginModal = () => {
		console.log("login modal: open");
		loginModalVisible = true;
	}

	const showRegisterModal = () => {
		console.log("register modal: open");
		registerModalVisible = true;
	}

	const hideLoginModal = () => {
		console.log("login modal: close");
		loginModalVisible = false;
	}

	const hideRegisterModal = () => {
		console.log("register modal: close");
		registerModalVisible = false;
	}

	const login = (data) => {
		console.log("login: ", JSON.stringify(data.detail));
		fetch('http://localhost:4200/api/auth/login', {
			method: 'POST',
			body: JSON.stringify(data.detail),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => console.log(res.json()));
		hideLoginModal();
	}
</script>

<Header on:showLoginModal={showLoginModal} on:showRegisterModal={showRegisterModal}/>
<Main {loggedIn}/>
{#if loginModalVisible}
	<Login on:hide={hideLoginModal} on:login={(data) => { login(data) }}/>
{/if}
{#if registerModalVisible}
	<Register on:hide={hideRegisterModal}/>
{/if}

<style>

</style>