<script>
	import CourseCommon from "../../CourseCommon.svelte";
    import { goto } from "$app/navigation"

    let actions = [
        {class: "red-fill", method: ()=> deleteCourse(), name: "Delete course"}
    ]

    export function deleteCourse() {
        goto("/courses")
    }

</script>

<div>
   <CourseCommon pageName="Course edit" additonalActions={actions}/>
</div>