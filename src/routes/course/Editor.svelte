<script>
    import "../../styles/course.scss"
    import { goto } from "$app/navigation"
    import attachment from '$lib/images/attachment.svg'
    import code from '$lib/images/code.svg'
    import link from '$lib/images/link.svg'
    import list from '$lib/images/list.svg'
    import quote from '$lib/images/quote.svg'
    import SvelteMarkdown from 'svelte-markdown'

    let chapters = [ "Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8", "Chapter 9", "Chapter 10", "Chapter 11"]
    let editText = ""
    let inputRef
    let htmlText = ""
    let previewMode = false

    let chaptersObj = chapters.map(function(chapterName, idx){   
       return {name: chapterName, active: false, index: idx}
    })

    chaptersObj[0].active = true

    let currentChapterIndex = chaptersObj[0].index

    let course = {
        id: 1,
        name: "Golang",
        description: "aaaa"
    }

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
 
    function selectChapter(index) {
        chaptersObj[currentChapterIndex].active = false
        currentChapterIndex = index
        chaptersObj[index].active = true
    }

    function deleteChapter(index) {
        chaptersObj = chaptersObj.filter(function(el){ return el.index != index })
        chaptersObj = chaptersObj.map(function(chapter, idx){   
            return {...chapter, index: idx}
        })

        // and send delete request
    }

    function newChapter() {
        let newChapterIndex = chaptersObj.length
        chaptersObj = [...chaptersObj, {name: "New chapter", index: newChapterIndex, active: true}]
        selectChapter(newChapterIndex)
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
<div class="editor-box">
    <ul class="chapters-list">
        {#each chaptersObj as chapter, index}
        <li class={chapter.active ? "active" : ""}>
            <button on:click={()=> selectChapter(chapter.index)}>{chapter.name}</button>       
        </li>
        {/each}
        <li>
            <button on:click={newChapter}>+ New chapter</button>       
        </li>
    </ul>

    <div class="editor {previewMode ? "hidden" : ""}">
        <div class="editor__chapter">
            <input bind:value={chaptersObj[currentChapterIndex].name}/>
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
                <textarea  bind:this={inputRef} name="course-text" rows="10" cols="30" bind:value={editText}/>
            </div>
            <div class="editor__actions">
                <div class="editor__save btn-container green-fill">
                    <input type="submit" value="Save"/>
                </div>
                <div class="editor__delete-chapter btn-container red-fill">
                    <input type="button" on:click={()=> deleteChapter(currentChapterIndex)} value="Delete chapter"/>
                </div>
                <div class="editor__clear btn-container red-fill">
                    <input type="button" on:click={clearInput} value="Clear text field"/>
                </div>
            </div>
        </form>
    </div>

    <div class="course-preview {!previewMode ? "hidden" : ""}">
        {editText}
        <SvelteMarkdown source={editText} />
    </div>
</div>