<script>
    import style from '../../styles/environments.scss'
    import '../../styles/tables.scss'
    import EnvironmentCard from "./EnvironmentCard.svelte"
    import PageHeading from '../../common/PageHeading.svelte'
	import axios from 'axios';
    import token from "$lib/stores/store"
    const HOST = "https://3f86-188-138-181-144.ngrok-free.app"

    let environments = [
        {name: "Assignment 1", env_identifier: "Ubuntu 20.04", type: "docker"},
        {name: "Assignment 2", env_identifier: "Ubuntu 20.04", type: "docker"},
        {name: "Assignment 3", env_identifier: "Arch 5.19", type: "docker"}
    ]

    let pageActions = [
        {name: "Back", method: ()=> history.back(), class: "violet"},
        {name: "+ Create", link: "/environments/new", class: "green-fill"}
    ]

    async function getEnvs() {
        const response = await axios.get(`${HOST}/v1/env`,
            {
                headers: {
                Authorization: `Bearer ${$token}`
            }
		}).then(function (response) {
            console.log(response.data);              
        })
 
    }

    getEnvs()


</script>

<div class="environments-page">
    <div class="environments-header">
        <PageHeading name="Environments" actions={pageActions}/>
        <div class="table-header">
            <ul>
                <li>Name</li>
                <li>Environment</li>
                <li>Type</li>
            </ul>
        </div>
    </div>
    {#each environments as environment}
        <EnvironmentCard name={environment.name} version={environment.version} id={environment.id} ip={environment.ip}/>
    {/each}
</div>
