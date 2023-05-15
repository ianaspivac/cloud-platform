<script>
    import '../styles/styles.scss'
    import { onMount, createEventDispatcher } from 'svelte'

    export let actions;
    export let name;

    const dispatch = createEventDispatcher()
	const handleMenuItemAction = (method) => dispatch('click', { method })
</script>

<div class="page-heading">
    <div class="page-name"><h1>{name}</h1></div>
    <div class="page-actions">
        {#each actions as action}
            <div class="page-action btn-container {action.class}">
                {#if action.link}
                    <a href={action.link}>{action.name}</a>
                {:else}
                    <button on:click={action.method}>{action.name}</button>
                {/if}
            </div>
        {/each}
</div>
</div>