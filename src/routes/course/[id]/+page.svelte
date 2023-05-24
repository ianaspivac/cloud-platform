<script>
	import PageHeading from '../../../common/PageHeading.svelte';
	import Course from './Course.svelte';
	import token from '$lib/stores/token.js';
	import { goto } from '$app/navigation';
    import Editor from "../Editor.svelte";
	import host from "$lib/stores/host"
    import { page } from '$app/stores'
	import { onMount } from 'svelte';
	import axios from 'axios';

	let course = {}
	let sortedPages
	let pages
	let currentPage

	onMount(async () => {
		course = {
			id: $page.params.id
		}
		
        try {
            let response = await axios.get(`${$host}/v1/course/${course.id}/toc`,
			{
                headers: {
                Authorization: `Bearer ${$token}`
            }})
        
            pages = response.data
            sortedPages = pages.sort((page1, page2) => (page1.id > page2.id) ? 1 : -1)
			try {
				let responsePage = await axios.get(`${$host}/v1/course/${course.id}/page/${sortedPages[0].id}`,
				{
					headers: {
					Authorization: `Bearer ${$token}`
				}})
			
				currentPage = responsePage.data

			} catch (e) {
				console.error('Error fetching data')
			}

        } catch (e) {
            console.error('Error fetching data')
        }
    })



    let editor;
	let user = {
		id: 1
	};

	
	course = {
		id: $page.params.id,
		name: 'Some great title',
		fullDescription: 'Here is a very interesting description',
		enrolled: false,
		created: true
	};

	// function enroll() {
	// 	if ($token) {
	// 		// request to enroll
	// 		console.log('enroll');
	// 	} else {
	// 		goto('/login');
	// 	}
	// }

	function unenroll() {
		// request to unenroll
	}

	let pageActionsCreator = [
		{ name: 'Back', method: () => history.back(), class: 'violet' },
		{ name: 'Edit', link: '/course/1/edit', class: 'green-fill' },
		{ name: 'Dashboard', link: '/course/1/creator-dashboard', class: 'violet-fill' }
	];

	let pageActionsEnrolled = [
		{ name: 'Back', method: () => history.back(), class: 'violet' },
		{ name: 'Unenroll', method: () => unenroll(), class: 'red-fill' },
		{ name: 'Dashboard', link: '/course/1/student-dashboard', class: 'violet-fill' }
	];

	let pageActionsAnonymous = [
		{ name: 'Back', method: () => history.back(), class: 'violet' },
		{ name: 'Enroll', method: () => enroll(), class: 'green-fill' }
	];

	let pageActions;
    let pageName;

    let isEditPage = $page.url.searchParams.get("edit") || false
    if (isEditPage) {
        pageName = `Edit course:`
        pageActions = [
            {class: "violet", link: "/", name: "Back"},
            {class: "violet-fill", name: "Preview", method: ()=> editor.preview()},
            {class: "red-fill", method: ()=> console.log("delete"), name: "Delete course"}
        ]

    } else {
        pageName = course.name
        if (course.created) {
            pageActions = pageActionsCreator;
        } else if (course.enrolled) {
            pageActions = pageActionsEnrolled;
        } else {
            pageActions = pageActionsAnonymous;
        }
    }

</script>

<div class="course-page">
    <PageHeading name={pageName} actions={pageActions} />
    {#if isEditPage}
        <Editor bind:this={editor} pages={sortedPages} {course}/>
    {:else} 
		{#if sortedPages && currentPage}
			<Course {course} pages={sortedPages} {currentPage}/>
		{/if}
    {/if}
</div>
