<script>
    import "../../../../styles/course.scss"
    import { goto } from "$app/navigation"
    import attachment from '$lib/images/attachment.svg'
    import code from '$lib/images/code.svg'
    import link from '$lib/images/link.svg'
    import list from '$lib/images/list.svg'
    import quote from '$lib/images/quote.svg'
    import SvelteMarkdown from 'svelte-markdown'
    import host from "$lib/stores/host"
    import token from '$lib/stores/token'
	import axios from "axios";
    import { page } from '$app/stores'

    export let course;

    let inputRef
    let courseTouched = false // turns false on submit
    let contentTouched = false
    let previewMode = false

    let pages = [
        {
            id: 0,
            title: "New chapter",
            isAssignment: false,
            text: ""
        }
    ]


    let currentActive = 0
    $: currentPage = pages.find(page => page.id == currentActive)

    let text = ""
    let symbolMapping = {
        bold: "****",
        italic: "**",
        cut: "~~~~",
        h1: "# ",
        h2: "## ",
        h3: "### ",
        code: "`` ```",
        link: "[]()",
        quote: "> ",
        list: "- "
    }

    let toolboxOptions = [
        { text: "B", class: "bold", name: "bold" },
        { text: "I", class: "italic", name: "italic" },
        { text: "S", class: "cut", name: "cut" },
        { text: "H1", class: "", name: "h1" },
        { text: "H2", class: "", name: "h2" },
        { text: "H3", class: "", name: "h3" },
    ]

    let toolboxSpecialOptions = [
        { class: "code", name: "code"},
        { class: "link", name: "link" },
        { class: "quote", name: "quote" },
        { class: "list", name: "list" },
        { class: "attachment", name: "attachment" }
    ]

    export function preview() {
        previewMode = !previewMode
    }
 
    function deleteChapter(index) {
        // chaptersObj = chaptersObj.filter(function(el){ return el.index != index })
        // chaptersObj = chaptersObj.map(function(chapter, idx){   
        //     return {...chapter, index: idx}
        // })

        // and send delete request
    }

    function newPage() {
        let newPageId = pages.length
        pages = [...pages, {title: "New chapter", id: newPageId, isAssignment: false, text: ""}]
        currentActive = newPageId
    }

    function attachmentOpen() {

    }

    function clearInput() {
        text = ""
    }

    function addMarkdown(name) {
        text += symbolMapping[name]
    }

    async function save(event) {
        let dataContent

        if (currentPage.isAssignment){
            dataContent = {
                lesson: {
                    text: currentPage.text
                }
            }
         } else {
            dataContent = {
                assignment: {
                    description: currentPage.text
                }
            }
        }

        let data = {
            title: currentPage.title,
            type: currentPage.isAssignment ? "LESSON" : "ASSIGNMENT",
            data: dataContent
        }

        console.log(data)

        await axios.post(`${$host}/v1/course/${course.id}/page`, 
			data,
            {
                headers: {
                Authorization: `Bearer ${$token}`
            }
		}).then((response) => {
            console.log(response)
        }, (error) => {
            console.log(error);
        });
     
    }

    export function deleteCourse() {
        goto("/courses")
    }

</script>
<div>
    <div class="editor-box">
        <ul class="chapters-list">
            {#each pages as page}
            <li class={page.id == currentActive ? "active" : ""}>
                <a href="?page_id={page.id}&editor=true" on:click={()=> currentActive = page.id}>{page.title}</a>      
            </li>
            {/each}
            <li>
                <button on:click={newPage}>+ New chapter</button>       
            </li>
        </ul>

        <div class="editor {previewMode ? "hidden" : ""}">
            <div class="editor__chapter">
                <input bind:value={currentPage.title}/>
            </div>

            <div>
                <input type="checkbox" id="assignment" class="assignment_checkbox" name="assignment" bind:checked={currentPage.isAssignment}/>
                <label for="assignment">Assignment</label>
            </div>
    
            {#if currentPage.isAssignment}
                <div>
                    <label for="prototype">Environment prototype</label>
                    <select name="prototype" id="prototype">
                    <option value="docker">Docker</option>
                    <option value="VM">Virtual machine</option>
                    </select>
                </div>
            {/if}

            <div class="editor__toolbox">
                <ul>
                    {#each toolboxOptions as option}
                        <li><input class={option.class} type="button" value={option.text} on:click={()=> addMarkdown(option.name)}/></li>
                    {/each}
                </ul>
                |
                <ul>
                    {#each toolboxSpecialOptions as option}
                        <li><input class="option {option.class}" type="button" value="" on:click={()=> option.name === "attachment" ? attachmentOpen() : addMarkdown(option.name)}/></li>
                    {/each}
                </ul>
            </div>

            <form on:submit|preventDefault={save}>
                <div class="editor__textfield">
                    <textarea  bind:this={inputRef} name="course-text" rows="10" cols="30" bind:value={currentPage.text} on:change={()=> contentTouched = true}/>
                </div>
                <div class="editor__actions">
                    <div class="editor__save btn-container green-fill">
                        <input type="submit" value="Save"/>
                    </div>
                    <div class="editor__delete-chapter btn-container red-fill">
                        <input type="button" on:click={()=> console.log("delete")} value="Delete chapter"/>
                    </div>
                    <div class="editor__clear btn-container red-fill">
                        <input type="button" on:click={clearInput} value="Clear text field"/>
                    </div>
                </div>
            </form>
        </div>

        <div class="course-preview {!previewMode ? "hidden" : ""}">
            <div class="page-container">
                <h1 class="page-title">{currentPage.title}</h1>
                <SvelteMarkdown source={currentPage.text} />
            </div>
        </div>
    </div>
</div>