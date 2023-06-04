<script>
    import '../styles/styles.scss'

    export let isError = false;
    export let text;

</script>

<div class="message{isError ? " error-message" : ""}" >
    <p>{text}</p>
</div>