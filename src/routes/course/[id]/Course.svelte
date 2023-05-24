<script>
    import '../../../styles/course.scss'
    import { goto } from "$app/navigation"
    import { page } from '$app/stores'
    import SvelteMarkdown from 'svelte-markdown'
    import token from '$lib/stores/token'

    export let course
    export let pages
    export let currentPage

    $: currentActive = $page.url.searchParams.get("page_id") || pages[0].id
    // $: currentPage = page
    // $: currentPage = pages.find(page => page.id == currentActive)

    $: currentPageData = currentPage.type == "LESSON" ? currentPage.data.lesson : currentPage.data.assignment
    $: textContent = currentPage.type == "LESSON" ? currentPageData.text : currentPageData.description


    let minimize = false

    function toggleNavbar() {
        minimize = !minimize
    }

</script>

<div class="course-container">
    <div class="chapters-list {minimize ? "minimize" : ""}">
        <div class="chapters-list-title"><div>Course contents</div> <button on:click={toggleNavbar}>Hide</button></div>
        <ul>
            {#each pages as page}
                <li class="{page.id == currentActive ? "active" : ""}{page.type == 2 ? " task" : ""}"><a href="?page_id={page.id}" on:click={()=> currentActive = page.id}>{page.title}</a></li>
            {/each}
        </ul>
        <div class="show-navbar"><button on:click={toggleNavbar}>Show</button></div>
    </div>
    <div class="page-container">
        <h1 class="page-title">{currentPage.title}</h1>
        {#if currentPage.type == 2}
            <div class="page-container_grade">
                Grade: {currentPageData.grade || "not graded"}
            </div>
        {/if}
        <!-- <input type="text" class="page-title" value={currentPage.title}/> --> 
        <div class="course-content">
            <SvelteMarkdown source={textContent} />
        </div>
        {#if currentPage.type == 2}
            <div class="btn-container {currentPageData.environment_uuid ? "green" : "green-fill"}">
                <a href="#">{currentPageData.environment_uuid ? "Open environment" : "Create environment"}</a>
            </div>
                
        {/if}
    </div>

</div>