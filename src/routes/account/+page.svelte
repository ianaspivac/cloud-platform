<script>
	import PageHeading from "../../common/PageHeading.svelte";
    import '../../styles/account.scss';

    let pageActions = [
        {name: "Back", method: ()=> history.back(), class: "violet"},
        {name: "Edit", link: "/account/edit", class: "green-fill"},
        {name: "Delete account", link: "#", class: "red-fill"},
    ]

    let createdCourses = [
        {
            id: 3,
            name: "Patterns in Java"
        },
        {
            id: 4,
            name: "Svelte"
        }
    ]

    let enrolledCourses = [
        {
            id: 1,
            name: "JavaScript in deep"
        },
        {
            id: 2,
            name: "Ruby on Rails"
        }
    ]

    let user = {
        name: "John Miller",
        email: "johnmiller@mail.com"
    }

</script>

<div class="course-page">
    <PageHeading name="Account" actions={pageActions}/>
    <div class="account-info">
        <div>
            {user.name}
        </div>
        <div>
            {user.email}
        </div>
    </div>
    <div class="account-created-courses">
        <h2>Created courses</h2>
        <ul>
            {#each createdCourses as course}
                <li class="table-row">
                    <div>{course.name}</div>
                    <div class="environment-actions table-actions">
                        <div class="btn-container green"><a href="/course/{course.id}">Go to course</a></div>
                        <div class="btn-container violet"><a href="/course/{course.id}/creator-dashboard">Go to dashboard</a></div>
                    </div>
                </li> 
            {/each}
        </ul>
    </div>
    <div class="account-enrolled-courses">
        <h2>Enrolled courses</h2>
        <ul>
            {#each enrolledCourses as course}
                <li class="table-row">
                    <div>{course.name}</div>
                    <div class="environment-actions table-actions">
                        <div class="btn-container green"><a href="/course/{course.id}">Go to course</a></div>
                        <div class="btn-container violet"><a href="/course/{course.id}/creator-dashboard">Go to dashboard</a></div>
                    </div>
                </li> 
            {/each}
        </ul>
    </div>
</div>
