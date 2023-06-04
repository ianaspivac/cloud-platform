<script>
    import style from '../../styles/environments.scss'
    import '../../styles/tables.scss'
    import EnvironmentCard from "./EnvironmentCard.svelte"
    import PageHeading from '../../common/PageHeading.svelte'
	import axios from 'axios';
    import token from "$lib/stores/token"
    import host from "$lib/stores/host"

    // let environments = [
    //     {name: "Assignment 1", env_identifier: "Ubuntu 20.04", type: "docker"},
    //     {name: "Assignment 2", env_identifier: "Ubuntu 20.04", type: "docker"},
    //     {name: "Assignment 3", env_identifier: "Arch 5.19", type: "docker"}
    // ]

    let environments = []

    let pageActions = [
        {name: "Back", method: ()=> history.back(), class: "violet"},
        {name: "+ Create", link: "/environments/new", class: "green-fill"}
    ]

    async function getEnvs() {
        const response = await axios.get(`${$host}/v1/env`,
            {
                headers: {
                Authorization: `Bearer ${$token}`
            }
		}).then(function (response) {
            environments = response.data 
            console.log(response.data);              
        }).catch(function (error) {
            environments = []             
        })
    }

    getEnvs()


</script>

<div class="environments-page">
        <div class="environments-header">
            <PageHeading name="Environments" actions={pageActions}/>
            {#if environments.length}
                <div class="table-header">
                    <ul>
                        <li>Name</li>
                        <!-- <li>Environment</li>
                        <li>Type</li> -->
                    </ul>
                </div>
                {#each environments as environment}
                    <EnvironmentCard name={environment.name} id={environment.uuid}/>
                {/each}
            {:else}
                <h2>No available environmens yet.</h2>       
            {/if}
        </div>

</div>
