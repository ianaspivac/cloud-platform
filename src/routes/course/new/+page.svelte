<script>
	import CourseCommon from '../CourseCommon.svelte';
	import { goto } from '$app/navigation';
	import PageHeading from '../../../common/PageHeading.svelte';
	import host from '$lib/stores/host';
	import token from '$lib/stores/token';
	import axios from 'axios';
	import Form from '../../../common/Form.svelte';
	import Loader from '../../../common/Loader.svelte';
	import Message from '../../../common/Message.svelte';

	let loading = false;
	let message = false;
	let messageData = {
		isError: false,
		text: ''
	};

	let fields = [
		{ fullName: 'Title', name: 'title', inputType: 'text', value: '', error: '' },
		{
			fullName: 'Short Description',
			name: 'short_description',
			inputType: 'text',
			value: '',
			error: ''
		},
		{
			fullName: 'Full description',
			name: 'description',
			inputType: 'textarea',
			value: '',
			error: ''
		}
	];

	async function createCourse(event) {
		const formData = new FormData(event.target);
		let data = {};
		loading = true;

		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}

		await axios
			.post(`${$host}/v1/course/new`, data, {
				headers: {
					Authorization: `Bearer ${$token}`
				}
			})
			.then(
				(response) => {
					let courseId = response.data.uuid;
					loading = false;
					messageData.isError = false;
					messageData.text = 'Course initialized!';
					message = true;
					setTimeout(() => {
						message = false;
						goto(`/course/${courseId}/edit`);
					}, 1500);
				},
				(error) => {
					console.log(error);
					loading = false;
					messageData.isError = true;
					messageData.text = "Couldn't create";
					message = true;

					setTimeout(() => {
						message = false;
					}, 1500);
				}
			);
	}
</script>

{#if loading}
	<Loader />
{/if}
{#if message}
	<Message isError={messageData.isError} text={messageData.text} />
{/if}

<div>
	<!-- <CourseCommon pageName="Course edit" additonalActions={actions}/> -->
	<PageHeading name="Course creation" actions={[]} />
	<Form customclass="common-form" {fields} submitValue="Create" action={createCourse} />
</div>
