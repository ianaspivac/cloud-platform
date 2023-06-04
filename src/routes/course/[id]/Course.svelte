<script>
	import '../../../styles/course.scss';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import SvelteMarkdown from 'svelte-markdown';
	import token from '$lib/stores/token';
	import Loader from '../../../common/Loader.svelte';
	import axios from 'axios';
	import host from '$lib/stores/host';
	import { onMount } from 'svelte';

	export let course;
	export let pages;
	export let currentPage;
	export let enrolled;

	let loading = false;
	let newAssignment = false;

	$: currentActive = $page.url.searchParams.get('page_id') || pages[0].id;

	// $: currentPage = page
	// $: currentPage = pages.find(page => page.id == currentActive)

	$: currentPageData =
		currentPage.type == 'LESSON' ? currentPage.data.lesson : currentPage.data.assignment;
	$: textContent =
		currentPage.type == 'LESSON' ? currentPageData.text : currentPageData.description;

	$: newAssignment = currentPageData.prototype_uuid;

	let savedPages = [currentPage];
	let minimize = false;
	let environment_uuid;

	onMount(async () => {
		if (currentPage.type == 'ASSIGNMENT') {
			getisAssignmentNew(currentPage.data.assignment.uuid);
		}
	});

	function toggleNavbar() {
		minimize = !minimize;
	}

	async function getisAssignmentNew(assignmentId) {
		try {
			let response = await axios.get(`${$host}/v1/assignment/${assignmentId}`, {
				headers: {
					Authorization: `Bearer ${$token}`
				}
			});

			let data = response.data;
			newAssignment = false;
			environment_uuid = data.environment_uuid;
		} catch (e) {
			console.error('Error fetching data');
			newAssignment = true;
		}
	}

	async function openEnv() {
		loading = true;

		let data = {
			prototype_uuid: currentPageData.prototype_uuid,
			assignment_uuid: currentPageData.uuid,
			course_uuid: course.id
		};

		if (newAssignment) {
			try {
				let response = await axios.post(`${$host}/v1/assignment`, data, {
					headers: {
						Authorization: `Bearer ${$token}`
					}
				});

				let responseData = response.data;
				goto(`/environments/${responseData.environment_uuid}`);
			} catch (e) {
				loading = false;
				console.error('Error fetching data');
			}
		} else {
			goto(`/environments/${environment_uuid}`);
		}
	}

	async function setActive(pageId) {
		const savedPage = savedPages.find((page) => page.id === pageId);

		if (savedPage) {
			currentPage = savedPage;
			currentActive = pageId;
		} else {
			loading = true;
			try {
				let responsePage = await axios.get(`${$host}/v1/course/${course.id}/page/${pageId}`, {
					headers: {
						Authorization: `Bearer ${$token}`
					}
				});

				currentPage = responsePage.data;
				currentActive = pageId;
				savedPages.push(currentPage);

				if (currentPage.type == 'ASSIGNMENT') {
					getisAssignmentNew(currentPage.data.assignment.uuid);
				}

				loading = false;
			} catch (e) {
				console.error('Error fetching data');
			}
		}
	}
</script>

{#if loading}
	<Loader />
{/if}

<div class="course-container">
	<div class="chapters-list {minimize ? 'minimize' : ''}">
		<div class="chapters-list-title">
			<div>Course contents</div>
			<button on:click={toggleNavbar}>Hide</button>
		</div>
		<ul>
			{#each pages as page}
				<li
					class="{page.id == currentActive ? 'active' : ''}{page.type == 'ASSIGNMENT'
						? ' task'
						: ''}"
				>
					<a href="?page_id={page.id}" on:click={() => setActive(page.id)}>{page.title}</a>
				</li>
			{/each}
		</ul>
		<div class="show-navbar"><button on:click={toggleNavbar}>Show</button></div>
	</div>
	<div class="page-container">
		<h1 class="page-title">{currentPage.title}</h1>
		{#if currentPage.type == 'ASSIGNMENT'}
			<div class="page-container_grade">
				Grade: {currentPageData.grade || 'not graded'}
			</div>
		{/if}

		<div class="course-content">
			<SvelteMarkdown source={textContent} />
		</div>
		{#if currentPage.type == 'ASSIGNMENT'}
			<div class="btn-container {newAssignment ? 'green' : 'green-fill'}">
				<button on:click={() => openEnv()}
					>{newAssignment ? 'Start assignment' : 'Continue assignment'}</button
				>
			</div>
		{/if}
	</div>
</div>
