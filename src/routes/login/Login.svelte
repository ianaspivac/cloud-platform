<script>
    import Form from "../../common/Form.svelte"
    import RedirectLink from "../../common/RedirectLink.svelte"
    import store from '$lib/stores/store'
    import { goto } from "$app/navigation"
    const HOST = "https://3f86-188-138-181-144.ngrok-free.app"

    let fields = [
        {fullName: "Email", name: "email", inputType: "email", value: "", error: ""},
        {fullName: "Password", name: "password", inputType: "password", value: "", error: ""}
    ]

    async function login(e) {
        const formData = new FormData(e.target)
        let data = {}
		for (let field of formData) {
			const [key, value] = field
            data[key] = value
		}

        const response = await fetch(`${HOST}/v1/user/login`, {
			method: 'POST',
			body: JSON.stringify(data)
		})
        const token = await response.json()
		
        if (response.ok) {
            store.update(() => token.token)
            // localStorage.setItem("token", JSON.stringify(token))
            goto("/courses")
        }
	}

</script>

<div class="form-container">
    <div class="application-name"><h1>ScholarLabs</h1></div>
    <div class="form-name"><h2>Sign in</h2></div>
    <Form fields={fields} submitValue="Sign in" action={login}/>
    <RedirectLink link="/register" linkText="Create account"/>
</div>
