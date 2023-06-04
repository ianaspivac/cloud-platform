<script>
    import Course from "../../common/CourseCard.svelte";
    import PageHeadingCourses from "../../common/PageHeadingCourses.svelte";
    import { page } from '$app/stores';
	import { onMount } from "svelte";
	import axios from "axios";
    import token from "$lib/stores/token.js"
    import DummyCourseCard from "../../common/DummyCourseCard.svelte";
    import host from "$lib/stores/host.js"
    import Loader from "../../common/Loader.svelte";

    let courses = []
    let loading = false

    onMount(async () => {
        try {
            loading = true
            console.log(JSON.stringify($host))
            let response = await axios.get(`${$host}/v1/course`)
            let data = response.data
            if (data !== null)
            {
                courses = data
                courseRelation(courses)
                loading = false
            }
        } catch (e) {
            loading = false
            console.error('Error fetching data')
        }
    })

    let name = "All courses";
    let filters = [
        {name: "Most popular", code: "most-popular", active: false}
    ]

    let courseCard = {
        class: "created",
        btnText: "Create a course",
        link: "/course/new"
    }

    function courseRelation(courses) {
        courses.forEach((course)=>{
            course.btnText = "Go to course"
            course.btnClass = "green"
            course.enrolled = false
        })
    }

    function searchCourse(param) {
        // courses = [
        //     {
        //         id: 2,
        //         title: "Some great title",
        //         author: "Mihai Eminescu",
        //         fullDescription: "Here is a very interesting description",
        //         image: "",
        //         enrolled: true,
        //         created: false
        //     }              
        // ]
        // courseRelation(courses)
    }

</script>

{#if loading}
	<Loader />
{/if}

<div>
    <PageHeadingCourses bind:filters={filters} name={name} search={searchCourse}/>
    <div class="list-courses">
        {#if courses.length}
            {#each courses as course}
                <Course course={course}/>
            {/each}
        {/if}
        <DummyCourseCard course={courseCard}/>
    </div>
</div>