<script>
    import Course from "../../common/CourseCard.svelte";
    import PageHeadingCourses from "../../common/PageHeadingCourses.svelte";
    import { page } from '$app/stores';

    let name = "All courses";
    let filters = [
        {name: "Most popular", code: "most-popular", active: false}
    ]

    // {name: "Top Rated", code: "top-rated", active: false},
    //     {name: "Newest", code: "newest", active: false}

    let courses = [
		{
            id: 1,
			title: "Some great title",
			author: "James Bond",
			fullDescription: "Here is a very interesting description",
			image: "",
            enrolled: true,
            created: false
		},
        {
            id: 2,
			title: "Calculus",
			author: "James Stewart",
			fullDescription: "Here is a very interesting description",
			image: "",
            enrolled: false,
            created: false
		},
        {
            id: 3,
			title: "Geometry",
			author: "Michael Roberts",
			fullDescription: "Here is a very interesting description",
			image: "",
            enrolled: false,
            created: true
		}
	]

    let user = {
        id: 2
    }

    function courseRelation(courses) {
        courses.forEach((course)=>{
            if (course.created) {
                course.btnText = "Go to created course"
                course.btnClass = "violet"
            } else {
                course.btnText = "Go to course"
                course.btnClass = "green"
            }

        })
    }

    function searchCourse(param) {
        courses = [
            {
                id: 2,
                title: "Some great title",
                author: "Mihai Eminescu",
                fullDescription: "Here is a very interesting description",
                image: "",
                enrolled: true,
                created: false
            }              
        ]
        courseRelation(courses)
    }

    courseRelation(courses)

</script>

<div>
    <PageHeadingCourses bind:filters={filters} name={name} search={searchCourse}/>
    <div class="list-courses">
        {#each courses as course}
            <Course course={course}/>
        {/each}
    </div>
</div>