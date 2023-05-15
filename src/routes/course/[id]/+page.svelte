<script>
	import PageHeading from "../../../common/PageHeading.svelte";
    import Course from "./Course.svelte"
    import store from "$lib/stores/store.js"
	import { goto } from "$app/navigation";

    let user = {
        id: 1,
    }

    let course = {
        id: 1,
        name: "Some great title",
        fullDescription: "Here is a very interesting description",
        enrolled: false,
        created: true
    }

    function enroll() {
        if ($store) {
            // request to enroll
            console.log("enroll")
        } else {
            goto("/login")
        }
        
    }

    function unenroll() {
        // request to unenroll
    }

    let pageActionsCreator = [
        {name: "Back", method: ()=> history.back(), class: "violet"},
        {name: "Edit", link: "/course/1/edit", class: "green-fill"},
        {name: "Dashboard", link: "/course/1/creator-dashboard", class: "violet-fill"}
    ]

    let pageActionsEnrolled = [
        {name: "Back", method: ()=> history.back(), class: "violet"},
        {name: "Unenroll", method: ()=> unenroll(), class: "red-fill"},
        {name: "Dashboard", link: "/course/1/student-dashboard", class: "violet-fill"}
    ]

    let pageActionsAnonymous = [
        {name: "Back", method: ()=> history.back(), class: "violet"},
        {name: "Enroll", method: ()=> enroll(), class: "green-fill"}
    ]

    let pageActions
    if (course.created) {
        pageActions = pageActionsCreator
    } else if (course.enrolled) {
        pageActions = pageActionsEnrolled
    } else {
        pageActions = pageActionsAnonymous
    }

</script>

<div class="course-page">
    <PageHeading name={course.name} actions={pageActions}/>
    <Course course={course}/>
</div>
