<script>
	import DashboardHeader from "../../../../common/DashboardHeader.svelte";
	import PageHeading from "../../../../common/PageHeading.svelte";

    let course = {
        id: 2,
        name: "Golang"
    }
    let headings = ["Item", "Status", "Grade"]
    let assignments = [{
        name: "Assignment 1",
        status: "started",
        grade: "10",
        environmentId: "20"
        },
        {
        name: "Assignment 2",
        status: "started",
        grade: "9",
        environmentId: "22"
        }
    ]

let pageActions = [
    {name: "Back", method: ()=> history.back(), class: "violet"}
]

</script>

<div class="dashboard student-dashboard">
    <PageHeading name="Dashboard: {course.name}" actions={pageActions}/>
    <DashboardHeader headings={headings}/>
    <ul class="assignments-list">
        {#each assignments as assignment}
            <li class="assignment">
                <div class="student-assignment">
                    <div class="student-name">
                        <div>{assignment.name}</div>
                    </div>
                    <div class="student-status">
                        {assignment.status}
                    </div>
                    <div class="student-grade">
                        {assignment.grade}
                    </div>
                    <div class="student-environment">
                        <a href="/environments/{assignment.environmentId}">
                            Go to assignment
                        </a>
                    </div>
                </div>
            </li>
        {/each}    
   </ul>
</div>