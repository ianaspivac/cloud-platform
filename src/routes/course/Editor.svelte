<script>
    import "../../styles/course.scss"
    import { goto } from "$app/navigation"
    import SvelteMarkdown from 'svelte-markdown'
    import { page } from '$app/stores'

    export let pages;
    export let course;

    let inputRef
    let courseTouched = false // turns false on submit
    let contentTouched = false
    let previewMode = false

    $: currentActive =  $page.url.searchParams.get("page_id") || pages[0].id
    $: currentPage = pages.find(page => page.id == currentActive)

    $: currentPageData = currentPage.type == 1 ? currentPage.data : currentPage.data.assignment
    $: textContent = currentPage.type == 1 ? currentPageData.text : currentPageData.description

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

    export function isPreview() {
        return previewMode
    }
 
    function deleteChapter(index) {
        // chaptersObj = chaptersObj.filter(function(el){ return el.index != index })
        // chaptersObj = chaptersObj.map(function(chapter, idx){   
        //     return {...chapter, index: idx}
        // })

        // and send delete request
    }

    function newChapter() {
        // let newChapterIndex = chaptersObj.length
        // chaptersObj = [...chaptersObj, {name: "New chapter", index: newChapterIndex, active: true}]
        // selectChapter(newChapterIndex)
    }

    function attachmentOpen() {

    }

    function clearInput() {
        editText = ""
    }

    function addMarkdown(name) {
        editText += symbolMapping[name]
    }

    function save() {
        goto(`/course/${course.id}`)
    }

    // export function deleteCourse() {
    //     goto("/courses")
    // }

</script>
<div>
    <!-- <h1 class="editor-course_title">
        {course.name}
    </h1> -->
    <!-- <input class="editor-course_title" bind:value={course.name}/>
    <div class="editor-course_description{previewMode ? " preview" : ""}">
        <input bind:value={course.fullDescription} on:change={()=> courseTouched = true}/>
    </div> -->
    <div class="editor-box">
        <ul class="chapters-list">
            {#each pages as page}
            <li class={page.id == currentActive ? "active" : ""}>
                <a href="?page_id={page.id}&editor=true" on:click={()=> currentActive = page.id}>{page.title}</a>      
            </li>
            {/each}
            <li>
                <button on:click={newChapter}>+ New chapter</button>       
            </li>
        </ul>

        <div class="editor {previewMode ? "hidden" : ""}">
            <div class="editor__chapter">
                <input bind:value={currentPage.title}/>
            </div>

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
                    <textarea  bind:this={inputRef} name="course-text" rows="10" cols="30" bind:value={textContent} on:change={()=> contentTouched = true}/>
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
                <SvelteMarkdown source={textContent} />
            </div>
        </div>
    </div>
</div>