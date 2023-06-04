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
	
	let actionsPreview = [
        {class: "violet-fill", name: "Preview", method: ()=> editor.preview()}
    ]

	let actionsEdit = [
        {class: "green-fill", name: "Editor", method: ()=> editor.preview()}
    ]

	$: actions = actionsPreview
</script>

<div class="course-page">
	<PageHeading name="Edit course" {actions}/>
    <Editor bind:this={editor} {course}/>
</div>
