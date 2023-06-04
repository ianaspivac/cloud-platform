<script>
    export let fullName;
    export let labelId;
    export let inputType;
    export let inputId;
    export let name;
    export let inputValue;
    export let error;

    const ref = (node) => {
        if (inputType != "textarea") {
            node.type = inputType
        }
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

        return 3
    }

    function validate() {
        error = ""
        let valid = false
        let message = "Must contain a number, an uppercase, a lowercase letter and a symbol."

        if (name == "password") {
            const symbols = "~`!@#$%^&*()_-+{[}]|\\\"',./";
            for (let i = 0; i < inputValue.length; i++) {
                if (symbols.includes(inputValue[i])) {
                    valid = true
                    break
                }
            }

            if (!valid) {
                error = message
                return
            }

            valid = false

            // Check for number
            for (let i = 0; i < inputValue.length; i++) {
                if (inputValue[i] >= "0" && inputValue[i] <= "9") {
                    valid = true
                    break
                }
            }

            if (!valid) {
                error = message
                return
            }

            valid = false

            // Check for lowercase letter
            for (let i = 0; i < inputValue.length; i++) {
                if (inputValue[i] >= "a" && inputValue[i] <= "z") {
                    valid = true
                    break
                }
            }

            if (!valid) {
                error = message
                return
            }

            valid = false

            // Check for uppercase letter
            for (let i = 0; i < inputValue.length; i++) {
                if (inputValue[i] >= "A" && inputValue[i] <= "Z") {
                    valid = true
                    break
                }
            }

            if (!valid) {
                error = message
            }
        }
    }
    
    let maxLengthInput = maxLength(name, inputType)
    let minLengthInput = minLength(name, inputType)
    
</script>

<div class="form-input-container">
    <label id="label_{name}" for={name} hidden>{fullName}</label>
    {#if inputType == "textarea"}
        <textarea class={error ? "invalid-input" : ""} use:ref id={name} name={name} maxlength={maxLengthInput} minlength={minLengthInput} placeholder={fullName} bind:value={inputValue} required/>
    {:else}
        <input class={error ? "invalid-input" : ""} use:ref id={name} name={name} maxlength={maxLengthInput} minlength={minLengthInput} placeholder={fullName} bind:value={inputValue} on:input={validate} required>
    {/if} 
    {#if error}
        <div class="error">{error}</div>
    {/if}
</div>
