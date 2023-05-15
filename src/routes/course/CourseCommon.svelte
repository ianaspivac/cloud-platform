<script>
	import PageHeading from "../../common/PageHeading.svelte";
    import Editor from "./Editor.svelte";

    export let pageName
    export let additonalActions

    let editor

    let pages = []
    let actions = [
        {class: "violet", link: "/", name: "Back"},
        {class: "violet-fill", name: "Preview", method: ()=> editor.preview()}
    ]

    actions = actions.concat(additonalActions)
</script>

<div>
    <PageHeading name={pageName} actions={actions}/>
    <Editor bind:this={editor}/>
</div>