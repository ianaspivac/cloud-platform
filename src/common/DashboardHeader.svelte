<script>
    import '../styles/styles.scss';

    export let headings
</script>

<div class="table-headings">
    {#each headings as heading}
        <div>{heading}</div>
    {/each}
</div>