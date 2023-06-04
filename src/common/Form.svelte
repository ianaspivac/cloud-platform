<script>
    import '../styles/forms.scss'
    import FormInput from "./FormInput.svelte"

    export let fields;
    export let submitValue;
    export let action;
    export let customclass = "";

    $: disabled = isInvalid(fields)

	function isInvalid(fields) {
        let invalid = false
        
        fields.forEach((field)=>{
            if (!field.value.trim().length) {
                invalid = true
                return
            }

        })

        return invalid
    }

    function submit(e) {
        action(e)
    }
</script>

<form on:submit|preventDefault={submit} class={customclass}>
    {#each fields as field}
        <FormInput name={field.name} fullName={field.fullName} labelId={field.labelId} inputType={field.inputType} inputId={field.inputId} bind:inputValue={field.value} bind:error={field.error}/>
    {/each}
    <div class="submit-container"><input type="submit" value={submitValue} disabled={disabled}/></div>
</form>