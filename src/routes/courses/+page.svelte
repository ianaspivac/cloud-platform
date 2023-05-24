<script>
    import Course from "../../common/CourseCard.svelte";
    import PageHeadingCourses from "../../common/PageHeadingCourses.svelte";
    import { page } from '$app/stores';
	import { onMount } from "svelte";
	import axios from "axios";
    import token from "$lib/stores/token.js"
    import host from "$lib/stores/host.js"

    let courses = []

    onMount(async () => {
        try {
            let response = await axios.get(`${$host}/v1/course`)
        
            courses = response.data
            courseRelation(courses)

        } catch (e) {
            console.error('Error fetching data')
        }
    })

    let name = "All courses";
    let filters = [
        {name: "Most popular", code: "most-popular", active: false}
    ]

    // {name: "Top Rated", code: "top-rated", active: false},
    //     {name: "Newest", code: "newest", active: false}


    let user = {
        id: 2
    }

    function courseRelation(courses) {
        courses.forEach((course)=>{
            course.btnText = "Go to course"
            course.btnClass = "green"
            course.enrolled = false
            // if (course.created) {
            //     course.btnText = "Go to created course"
            //     course.btnClass = "violet"
            // } else {
            //     course.btnText = "Go to course"
            //     course.btnClass = "green"
            // }

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

   

    // await axios.get(`${$host}/v1/course`,
    //     {
    //         headers: {
    //         Authorization: `Bearer ${$token}`
    //     }
    // }).then((response) => {
    //     console.log(response)
    // }, (error) => {
    //     console.log(error);
    // });

</script>

<div>
    <PageHeadingCourses bind:filters={filters} name={name} search={searchCourse}/>
    <div class="list-courses">
        {#each courses as course}
            <Course course={course}/>
        {/each}
    </div>
</div>