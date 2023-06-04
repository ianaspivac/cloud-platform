<script>
	import axios from 'axios';
	import host from '$lib/stores/host';
	import token from '$lib/stores/token';
	import { goto } from '$app/navigation';
	import '../../../styles/forms.scss';
	import Loader from '../../../common/Loader.svelte';
	import Message from '../../../common/Message.svelte';
	import Select from 'svelte-select';
	import { onMount } from 'svelte';

	let name = '';
	let prototype;
	let loading = false;
	let message = false;
	let messageData = {
		isError: false,
		text: ''
	};
	let items;
	// let fields = [
	//     {fullName: "Name", name: "name", inputType: "text", value: "", error: ""},
	//     {fullName: "Environment", name: "env_identifier", inputType: "text", value: "", error: ""},
	//     {fullName: "Type", name: "type", inputType: "text", value: "", error: ""}
	// ]

	$: disabled = isInvalid();

	function isInvalid() {
		let invalid = false;
		console.log(name);
		if (name.length == 0) {
			invalid = true;
		}

		return invalid;
	}

	onMount(async () => {
	    let prototypes = []
	    loading = true

	    const response = await axios.get(`${$host}/v1/prototype`,
	        {
	            headers: {
	            Authorization: `Bearer ${$token}`
	        }
	    }).then(function (response) {
	        for (let prototypeData of response.data) {
                let prototype = {}

	            prototype.value = prototypeData.uuid;
                prototype.label = prototypeData.name;
                prototypes.push(prototype)
	        }

	        items = prototypes
	        loading = false
	    }).catch(function (error) {
	        loading = false
	        console.log(error)
	    })
	})

	async function create(e) {
		const formData = new FormData(e.target);
		loading = true;

		let data = {};

		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}

        data.prototype_uuid = prototype.value

		const response = await axios
			.post(`${$host}/v1/env`, data, {
				headers: {
					Authorization: `Bearer ${$token}`
				}
			})
			.then(function (response) {
				loading = false;
				messageData.isError = false;
				messageData.text = 'Environment created!';
				message = true;

				setInterval(() => {
					message = false;
					goto('/environments');
				}, 1500);
			})
			.catch(function (error) {
				console.log(error);
				loading = false;
				messageData.isError = true;
				messageData.text = "Couldn't create";
				message = true;

				setInterval(() => {
					message = false;
				}, 1500);
			});
	}

	// let items = [
	//     { value: "TEST", label: "TEST" },
	//     { value: "MSSQL", label: "MSSQL" }
	// ]
</script>

<!-- <Form customclass="common-form" fields={fields} submitValue="Create" action={create}/> -->
{#if loading}
	<Loader />
{/if}

{#if message}
	<Message isError={messageData.isError} text={messageData.text} />
{/if}
<form class="common-form" on:submit|preventDefault={create}>
	<input type="text" name="name" placeholder="Environment name" bind:value={name} on:change={()=> console.log(name)} required/>
	<Select
		--item-color="#151516"
		--input-color="#151516"
		--placeholder-color="#737373"
		--item-hover-color="#151516"
		placeholder="Select prototype"
		{items}
		bind:value={prototype}
		required
	/>
	<div class="submit-container"><input type="submit" value="Create" /></div>
</form>
