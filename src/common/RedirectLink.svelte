<script>
    export let link;
    export let linkText;

</script>
<div class="link">
    <a data-sveltekit-reload href={link}>
        {linkText}
    </a>
</div>