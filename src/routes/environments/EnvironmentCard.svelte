<script>
    import '../../styles/tables.scss';

    export let name;
    export let id;
    // export let env_identifier;
    // export let type;
</script>

<div class="environment-card table-row">
    <ul class="environment-info">
        <li>{name}</li>
        <!-- <li>{env_identifier}</li>
        <li>{type}</li> -->
    </ul>
    <div class="environment-actions table-actions">
        <div class="btn-container green"><a target="_blank" href="/environments/{id}">Open</a></div>
        <div class="btn-container red-fill"><input type="button" value="Delete"/></div>
    </div>

</div>