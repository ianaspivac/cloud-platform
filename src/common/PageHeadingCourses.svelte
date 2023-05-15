<script>
    import { goto } from "$app/navigation"
    import { page } from "$app/stores"
    import style from "../styles/styles.scss"

    export let search
    // export let activeFilter
    export let filters
    export let name
    export let query = ""

    function searchQuery(param) {
        search(param)
    }

    function applyFilter(param) {
        let query = new URLSearchParams($page.url.searchParams.toString())

        query.set("filter", param)        
        goto(`?${query.toString()}`)
        activeFilter(param)
    }

    function setClass(isActive) {
        if (isActive)
            return "active"
        return ""
    }

    function activeFilter(param=null) {
        let filterParam = param || $page.url.searchParams.get("filter")

        filters = filters.map(filter =>
            filter.code === filterParam
                ? { ...filter, active: true }
                : { ...filter, active: false }
            )

    }
</script>

<div class="page-heading-courses">
    <div class="page-heading-left">
        <div class="page-name"><h1>{name}</h1></div>
        <div class="page-filters">
            {#each filters as filter}
                <div class="page-filter {setClass(filter.active)}"><input type="button" on:click={applyFilter(filter.code)} value={filter.name}/></div>
            {/each}
        </div>
    </div>
        <form class="search-container">
            <label for="search" hidden>Search course</label>
            <input type="search" id="search" name="search" placeholder="Search by name, author" value={query}>
            <input type="submit" value="Search" on:click={searchQuery(query)} hidden>
        </form>
</div>