<script>
	let name = 'world';
	let authToken = localStorage.getItem('authToken') ? localStorage.getItem('authToken') : '';

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

	const showError = (error) => {
		console.log(error);
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
		.then(res => res.json())
		.then(res => {
			console.log("login: ", res);
			if(res.ok) {
				authToken = res.ok;
				localStorage.setItem('authToken', authToken);
				hideLoginModal();
			}
			else{
				alert(res);
			}
		})
	}

	const register = (data) => {
		console.log("register: ", JSON.stringify(data.detail));
		fetch('http://localhost:4200/api/auth/register', {
			method: 'POST',
			body: JSON.stringify(data.detail),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(res => {
			console.log("register: ", res);
			if(res.ok) {
				authToken = res.ok;
				localStorage.setItem('authToken', authToken);
				hideRegisterModal();
			}
			else{
				alert(res.error);
			}
		})
	}

	const logout = () => {
		localStorage.removeItem('authToken');
		authToken = '';
	}
</script>

<Header 
	{authToken} 
	on:showLoginModal={showLoginModal} 
	on:showRegisterModal={showRegisterModal} 
	on:logout={logout}
/>
<Main {authToken}/>
{#if loginModalVisible}
	<Login 
		on:hide={hideLoginModal} 
		on:login={(data) => { login(data) }}
	/>
{/if}
{#if registerModalVisible}
	<Register on:hide={hideRegisterModal}/>
{/if}

<style>

</style>