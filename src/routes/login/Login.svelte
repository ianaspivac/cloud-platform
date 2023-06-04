<script>
    import Form from "../../common/Form.svelte"
    import RedirectLink from "../../common/RedirectLink.svelte"
    import token from '$lib/stores/token'
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
        {fullName: "Email", name: "email", inputType: "email", value: "", error: ""},
        {fullName: "Password", name: "password", inputType: "password", value: "", error: ""}
    ]

    async function login(e) {
        loading = true
        const formData = new FormData(e.target)
        let data = {}
		for (let field of formData) {
			const [key, value] = field
            data[key] = value
		}

        const response = await fetch(`${$host}/v1/user/login`, {
			method: 'POST',
			body: JSON.stringify(data)
		})
        const resp = await response.json()
		
        loading = false

        if (response.ok) {
            $token = resp.token
            message = true;
			messageData.isError = false
			messageData.text = "User created succesfully!"
            setInterval(() => {
				message = false;
                goto("/courses")
			}, 1500);
            // localStorage.setItem("token", JSON.stringify(token))
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
    <div class="form-name"><h2>Sign in</h2></div>
    <Form fields={fields} submitValue="Sign in" action={login}/>
    <RedirectLink link="/register" linkText="Create account"/>
</div>
