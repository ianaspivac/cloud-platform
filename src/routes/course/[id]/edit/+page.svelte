<script>
	import PageHeading from '../../../../common/PageHeading.svelte';
	import Course from '../Course.svelte';
	import token from '$lib/stores/token.js';
	import { goto } from '$app/navigation';
    import Editor from "./Editor.svelte";
    import { page } from '$app/stores'

    let editor;

	let course = {
		id: $page.params.id
	}
	let actions = [
        {class: "violet-fill", name: "Preview", method: ()=> editor.preview()},
		{class: "green-fill", link: `/course/${course.id}`, name: "Go to course"},
    ]

</script>

<div class="course-page">
	<PageHeading name="Edit course" {actions}/>
    <Editor bind:this={editor} {course}/>
</div>
