<script>
    import Course from "../../common/CourseCard.svelte"
    import PageHeadingCourses from "../../common/PageHeadingCourses.svelte"
    import DummyCourseCard from "../../common/DummyCourseCard.svelte"
    import { page } from '$app/stores'


    let name = "Created courses"
    let filters = []
    let courseCard = {
        class: "created",
        btnText: "Create a course",
        link: "/courses/new"
    }

    let courses = [
		{
            id: 1,
			title: "Some great title",
			author: "James Bond",
			updatedAt: Date.now(),
			rating: 4.5,
			countReviews: 5,
			fullDescription: "Here is a very interesting description",
			image: ""
		}
	]

    let user = {
        id: 2,
        enrolledCourses: [1, 2, 3],
        createdCourses: [4]
    }

    courses.forEach((course)=>{
        course.btnText = "Go to created course"
        course.btnClass = "violet"
    })

    function searchCourse(param) {
        courses = [
            {
                id: 2,
                title: "Some great title",
                author: "Mihai Eminescu",
                updatedAt: Date.now(),
                rating: 4.5,
                countReviews: 5,
                fullDescription: "Here is a very interesting description",
                image: ""
            }              
        ]
    }
</script>

<div>
    <PageHeadingCourses bind:filters={filters} name={name} search={searchCourse}/>
    <div class="list-courses">
        {#each courses as course}
            <Course course={course}/>
        {/each}
    <DummyCourseCard course={courseCard}/>
    </div>
</div>