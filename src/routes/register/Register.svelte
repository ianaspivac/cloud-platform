<script>
    import Form from "../../common/Form.svelte";
    import RedirectLink from "../../common/RedirectLink.svelte";
    import { goto } from "$app/navigation"
    import host from "$lib/stores/host"
    import Message from "../../common/Message.svelte";
    import Loader from "../../common/Loader.svelte";

    let loading = false;
    let message = false;
    let messageData = {
        isError: false,
        text: ""
    }
    let fields = [
        {fullName: "Username", name:"username", inputType: "text", value: "", error: ""},
        {fullName: "Email", name: "email", inputType: "email", value: "", error: ""},
        {fullName: "Password", name: "password", inputType: "password", value: "", error: ""},
        {fullName: "Confirm Password", name: "confirm_password", inputType: "password", value: "", error: ""}
    ]

    async function register(e) {
        let headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*')

        const formData = new FormData(e.target)
        let data = {}
        loading = true

		for (let field of formData) {
			const [key, value] = field
            if (key != "confirm_password") {
                data[key] = value
            }
		}

		const res = await fetch(`${$host}/v1/user/register`, {
			method: 'POST',
			body: JSON.stringify(data)
		})    
        
        loading = false
        
        if (res.ok) {
            message = true;
			messageData.isError = false
			messageData.text = "User created succesfully!"

			setTimeout(() => {
				message = false;
                goto("/login")
			}, 1500);
        } else {
            message = true;
			messageData.isError = true
			messageData.text = "User already exists"

			setTimeout(() => {
				message = false;
			}, 1500);
        }
	}
</script>

{#if loading}
	<Loader />
{/if}
{#if message}
	<Message isError={messageData.isError} text={messageData.text} />
{/if}

<div class="form-container">
    <div class="application-name"><h1>ScholarLabs</h1></div>
    <div class="form-name"><h2>Create account</h2></div>
    <Form fields={fields} submitValue="Sign up" action={register}/>
    <RedirectLink link="/login" linkText="Have account?"/>
</div>
