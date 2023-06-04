<script>
	import Course from '../../common/CourseCard.svelte';
	import PageHeadingCourses from '../../common/PageHeadingCourses.svelte';
	import DummyCourseCard from '../../common/DummyCourseCard.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import host from '$lib/stores/host';
	import token from '$lib/stores/token';
	import axios from 'axios';
	import Loader from '../../common/Loader.svelte';

	let name = 'Enrolled courses';
    let loading = false
	let filters = [
		// {name: "Progress", code: "progress", active: false},
		// {name: "Recently opened", code: "recently-opened", active: false}
	];

	let courses;

	onMount(async () => {
		try {
            loading = true
			let response = await axios.get(`${$host}/v1/course/mycourses`, {
				headers: {
					Authorization: `Bearer ${$token}`
				}
			});

			courses = response.data;
            loading = false
			if (courses) {
				courses.forEach((course) => {
					course.btnText = 'Go to course';
					course.btnClass = 'green';
				});
			} else {
				courses = [];
			}
		} catch (error) {
            loading = false
			console.error(error);
		}
	});

	let courseCard = {
		class: 'enrolled',
		btnText: 'Browse courses',
		link: '/courses'
	};

	// let courses = [
	// 	{
	//         id: 1,
	// 		title: "Some great title",
	// 		author: "James Bond",
	// 		updatedAt: Date.now(),
	// 		rating: 4.5,
	// 		countReviews: 5,
	// 		fullDescription: "Here is a very interesting description",
	// 		image: ""
	// 	}
	// ]

	// let user = {
	//     id: 2,
	//     enrolledCourses: [1, 2, 3],
	//     createdCourses: [4]
	// }

	function searchCourse(param) {
		courses = [
			{
				id: 2,
				title: 'Some great title',
				author: 'Mihai Eminescu',
				updatedAt: Date.now(),
				rating: 4.5,
				countReviews: 5,
				fullDescription: 'Here is a very interesting description',
				image: ''
			}
		];
	}
</script>

{#if loading}
	<Loader />
{/if}

<div>
	<PageHeadingCourses bind:filters {name} search={searchCourse} />
	<div class="list-courses">
		{#if courses}
			{#each courses as course}
				<Course {course} />
			{/each}
		{/if}
		<DummyCourseCard course={courseCard} />
	</div>
</div>
