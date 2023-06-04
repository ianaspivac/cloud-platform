<script>
	import { goto } from '$app/navigation';
	import Course from '../Course.svelte';
	import PageHeading from '../../../../common/PageHeading.svelte';
	import placeholder from '$lib/images/white.png';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import host from '$lib/stores/host';
	import token from '$lib/stores/token';
	import { page } from '$app/stores';
	import Loader from '../../../../common/Loader.svelte';

	// let course = {
	// 	id: 1,
	// 	name: 'Ruby on Rails',
	// 	fullDescription:
	// 		'sadasdasd sdioajdoisajdoiasjdoi joiasdjoiasjdoasij siadjasi jdasi jdoasij isj idjasidjasidjasidsajdiasjdoias',
	// 	enrolled: true,
	// 	creator: false
	// };

	let course = {
		id: $page.params.id
	};

	let loading = false;

	export function deleteCourse() {
		goto('/courses');
	}

	onMount(async () => {
		loading = true;
		try {
			let response = await axios.get(`${$host}/v1/course/${course.id}/summary`, {
				headers: {
					Authorization: `Bearer ${$token}`
				}
			});

			let data = response.data;
			course = data;
			loading = false;
		} catch (error) {
			loading = false;
			console.error(error);
		}
	});

	let pages = [];

	let actions = [
		{ name: 'Back', method: () => history.back(), class: 'violet' },
		{ class: 'violet-fill', link: `/course/${course.id}`, name: 'Go to course' }
	];

	function imagePlaceholder() {
		return course.image || placeholder;
	}
</script>
{#if loading}
	<Loader />
{/if}

<div class="course-description-page">
	<PageHeading name="" {actions} />
	<div>
		<div class="course-banner">
			<!-- <img src={imagePlaceholder()} alt="Course" /> -->
			<h1>{course.title}</h1>
		</div>

		<p>{course.description}</p>
	</div>
</div>
