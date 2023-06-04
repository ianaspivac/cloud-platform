<script>
	import PageHeading from '../../../common/PageHeading.svelte';
	import Course from './Course.svelte';
	import token from '$lib/stores/token.js';
	import { goto } from '$app/navigation';
	import Editor from '../Editor.svelte';
	import host from '$lib/stores/host';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import Loader from '../../../common/Loader.svelte';
	import Message from '../../../common/Message.svelte';

	let course = {};
	let sortedPages;
	let pages;
	let currentPage;
	let enrolled = false;
	let loading = false;
	let message = false;
	let messageData = {
		isError: false,
		text: ''
	};

	onMount(async () => {
		course = {
			id: $page.params.id,
			name: ''
		};

		try {
			loading = true;
			let response = await axios.get(`${$host}/v1/course/${course.id}/summary`, {
				headers: {
					Authorization: `Bearer ${$token}`
				}
			});

			let data = response.data;
			course.name = data.title;
			loading = false;
		} catch (error) {
			loading = false;
			console.error(error);
		}

		try {
			loading = true;
			let response = await axios.get(`${$host}/v1/course/mycourses`, {
				headers: {
					Authorization: `Bearer ${$token}`
				}
			});

			loading = false;
			let data = response.data;

			if (data !== null) {
				for (let courseData of data) {
					if (courseData.uuid == course.id) {
						enrolled = true;
						break;
					}
				}
			}
		} catch (error) {
			console.error(error);
			loading = false;
		}

		try {
			loading = true;
			let response = await axios.get(`${$host}/v1/course/${course.id}/toc`, {
				headers: {
					Authorization: `Bearer ${$token}`
				}
			});

			pages = response.data;
			sortedPages = pages.sort((page1, page2) => (page1.id > page2.id ? 1 : -1));
			let pageId = $page.url.searchParams.get('page_id') || sortedPages[0].id;

			try {
				loading = true;
				let responsePage = await axios.get(`${$host}/v1/course/${course.id}/page/${pageId}`, {
					headers: {
						Authorization: `Bearer ${$token}`
					}
				});

				currentPage = responsePage.data;
				loading = false;
			} catch (e) {
				loading = false;
				console.error(e);
			}
			loading = false;
		} catch (e) {
			console.error(e);
		}
	});

	// sortedPages = [
	// 	{
	// 		id: 1,
	// 		title: "Page",
	// 		type: "ASSIGNMENT"
	// 	}
	// ]

	// currentPage = {
	// 	id: 1,
	// 	title: "Assignment",
	// 	type: "ASSIGNMENT",
	// 	grade: 10,
	// 	data: {
	// 		assignment: {
	// 			description: "dasdasdasdasdasdasdasd",
	// 			environment_uuid: 1234
	// 		}
	// 	}

	// }

	let editor;

	// course = {
	// 	id: $page.params.id,
	// 	name: 'Some great title',
	// 	fullDescription: 'Here is a very interesting description',
	// 	enrolled: false,
	// 	created: true
	// };

	async function enroll() {
		try {
			let response = await axios.post(
				`${$host}/v1/course/${course.id}/enroll`,
				{},
				{
					headers: {
						Authorization: `Bearer ${$token}`
					}
				}
			);

			enrolled = true;
			message = true;
			messageData.isError = false;
			messageData.text = 'Enrolled';

			setTimeout(() => {
				message = false;
			}, 2000);
		} catch (e) {
			console.error('Error fetching data');
		}
	}

	async function unenroll() {
		try {
			let response = await axios.post(
				`${$host}/v1/course/${course.id}/unenroll`,
				{},
				{
					headers: {
						Authorization: `Bearer ${$token}`
					}
				}
			);

			enrolled = false;
			message = true;
			messageData.isError = true;
			messageData.text = 'Unenrolled';

			setTimeout(() => {
				message = false;
			}, 2000);
		} catch (e) {
			console.error('Error fetching data');
		}
	}

	// let pageActionsCreator = [
	// 	{ name: 'Back', method: () => history.back(), class: 'violet' },
	// 	{ name: 'Edit', link: '/course/1/edit', class: 'green-fill' },
	// 	{ name: 'Dashboard', link: '/course/1/creator-dashboard', class: 'violet-fill' }
	// ];

	// let pageActionsEnrolled = [
	// 	{ name: 'Back', method: () => history.back(), class: 'violet' },
	// 	{ name: 'Unenroll', method: () => unenroll(), class: 'red-fill' },
	// 	{ name: 'Dashboard', link: '/course/1/student-dashboard', class: 'violet-fill' }
	// ];

	let pageActionsEnrolled = [
		{ name: 'Back', method: () => history.back(), class: 'violet' },
		{ name: 'Unenroll', method: () => unenroll(), class: 'red-fill' }
	];

	let pageActionsAnonymous = [
		{ name: 'Back', method: () => history.back(), class: 'violet' },
		{ name: 'Enroll', method: () => enroll(), class: 'green-fill' }
	];

	// pageActions = [{ name: 'Back', method: () => history.back(), class: 'violet' }];
	let isEditPage = false;

	$: pageActions = enrolled ? pageActionsEnrolled : pageActionsAnonymous;

	// let isEditPage = $page.url.searchParams.get("edit") || false
	// if (isEditPage) {
	//     pageName = `Edit course:`
	//     pageActions = [
	//         {class: "violet", link: "/", name: "Back"},
	//         {class: "violet-fill", name: "Preview", method: ()=> editor.preview()},
	//         {class: "red-fill", method: ()=> console.log("delete"), name: "Delete course"}
	//     ]

	// } else {
	//     pageName = course.name
	//     if (course.created) {
	//         pageActions = pageActionsCreator;
	//     } else if (course.enrolled) {
	//         pageActions = pageActionsEnrolled;
	//     } else {
	//         pageActions = pageActionsAnonymous;
	//     }
	// }
</script>

{#if loading}
	<Loader />
{/if}
{#if message}
	<Message isError={messageData.isError} text={messageData.text} />
{/if}

<div class="course-page">
	<PageHeading name={course.name} actions={pageActions} />
	{#if isEditPage}
		<Editor bind:this={editor} pages={sortedPages} {course} />
	{:else if sortedPages && currentPage}
		<Course {course} {enrolled} pages={sortedPages} {currentPage} />
	{/if}
</div>
