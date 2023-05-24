<script>
    import { goto } from "$app/navigation"
	import Course from "../Course.svelte";

    let actions = [
        {class: "red-fill", method: ()=> deleteCourse(), name: "Delete course"}
    ]

    let course = {
        id: 1,
        name: "Ruby on Rails",
        fullDescription: "sadasdasd sdioajdoisajdoiasjdoi joiasdjoiasjdoasij siadjasi jdasi jdoasij isj idjasidjasidjasidsajdiasjdoias",
        enrolled: true,
        creator: false
    }

    export function deleteCourse() {
        goto("/courses")
    }

    let pages = []
    let actions = [
        {class: "violet", method: () => history.back(), name: "Back"},
        {class: "violet-fill", link: `/course/${course.id}`, name: "Go to course"}
    ]

</script>

<div class="course-description-page">
    <PageHeading name={course.name} {actions}/>
    <div>

    </div>
</div>