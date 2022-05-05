<script>
	let name = 'world';
	let authToken = localStorage.getItem('authToken') ? localStorage.getItem('authToken') : '';

	let loginModalVisible = false;
	let registerModalVisible = false;
	let alertVisible = false;
	let alertMessage = 'Test';
	let alertType = 'success';

	import Header from './components/Header.svelte';
	import Main from './components/Main.svelte';
	import Login from './components/auth/Login.svelte';
	import Register from './components/auth/Register.svelte';
	import Alert from './components/Alert.svelte';

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

	const alert = (msg, type) => {
		alertVisible = true;
		alertMessage = msg;
		alertType = type;
	}

	const hideAlertModal = () => {
		alertVisible = false;
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
				alert('Login successful', 'success');
				hideLoginModal();
			}
			else{
				alert(res, 'error');
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
				alert('User registered successfully', 'success');
				hideRegisterModal();
			}
			else{
				alert(res.error, 'error');
			}
		})
	}

	const logout = () => {
		localStorage.removeItem('authToken');
		authToken = '';
		alert('Logged out successfully', 'success');
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
{#if alertVisible}
	<Alert {alertType} on:hide={hideAlertModal}>
		{alertMessage}
	</Alert>
{/if}

<style>

</style>