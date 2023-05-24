<script>
    import axios from "axios"
    import host from "$lib/stores/host"
    import token from '$lib/stores/token'

    async function create(e) {
        const formData = new FormData(e.target)
        // console.log(f)
        // let data = {}
		// for (let field of formData) {
		// 	const [key, value] = field
        //     data[key] = value
		// }

        // let data = {
        //     type: "docker",
        //     env_identifier: "ubuntu",
        //     name: "bebra"
        // }

        let data = {
            prototype_uuid: "TEST",
            name: "bebra"
        }

        const response = await axios.post(`${$host}/v1/env`, 
			data,
            {
                headers: {
                Authorization: `Bearer ${$token}`
            }
		})

        if (response.ok) {
            goto("/environments")
        }
	}
</script>

<form on:submit|preventDefault={create}>
    <input type="text" name="name" placeholder="Name"/>
    <input type="text" name="env_identifier" placeholder="Environment"/>
    <input type="text" name="type" placeholder="Type"/>
    <input type="submit" value="Create"/>
</form>