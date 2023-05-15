<script>
    export let fullName;
    export let labelId;
    export let inputType;
    export let inputId;
    export let name;
    export let inputValue;
    export let error;

    const ref = (node) => {
        node.type = inputType
    }

    function maxLength(name, type) {
        switch (type) {
            case "password":
                return 50
            case "email":
                return 75
        }

        if (name == "username") {
            return 75
        }

        return 255
    }

    function minLength(name, type) {
        switch (type) {
            case "password":
                return 8
            case "email":
                return 3
        }

        if (name == "username") {
            return 3
        }

        return 255
    }

    
    let maxLengthInput = maxLength(name, inputType)
    let minLengthInput = minLength(name, inputType)
    
</script>

<div class="form-input-container">
    <label id="label_{name}" for={name} hidden>{fullName}</label>
    <input class={error ? "invalid-input" : ""} use:ref id={name} name={name} maxlength={maxLengthInput} minlength={minLengthInput} placeholder={fullName} bind:value={inputValue} required>
    {#if error}
        <div class="error">{error}</div>
    {/if}
</div>
