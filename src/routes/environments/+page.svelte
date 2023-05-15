<script>
    import style from '../../styles/environments.scss'
    import '../../styles/tables.scss'
    import EnvironmentCard from "./EnvironmentCard.svelte"
    import PageHeading from '../../common/PageHeading.svelte'

    let environments = [
        {name: "Assignment 1", env_identifier: "Ubuntu 20.04", type: "docker"},
        {name: "Assignment 2", env_identifier: "Ubuntu 20.04", type: "docker"},
        {name: "Assignment 3", env_identifier: "Arch 5.19", type: "docker"}
    ]

    let pageActions = [
        {name: "Back", method: ()=> history.back(), class: "violet"},
        {name: "+ Create", link: "/environments/new", class: "green-fill"}
    ]
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
