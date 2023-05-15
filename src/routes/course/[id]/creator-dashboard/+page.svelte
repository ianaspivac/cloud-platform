<script>
	import DashboardHeader from "../../../../common/DashboardHeader.svelte";
	import PageHeading from "../../../../common/PageHeading.svelte";

    let course = {
        id: 2,
        name: "Golang"
    }
    let headings = ["Item", "Status", "Grade"]
    let assignments = [{
        title: "Assignment 1",
        students: [
            {
                fullName: "John Miller",
                email: "johnmiller@mail.com",
                status: "started",
                grade: "10",
                environmentId: "20"
            },
            {
                fullName: "John Miller",
                email: "johnmiller@mail.com",
                status: "started",
                grade: "10",
                environmentId: "20"
            }
        ]
    }, {
        title: "Assignment 3",
        students: [
            {
                fullName: "John Miller",
                email: "johnmiller@mail.com",
                status: "started",
                grade: "10",
                environmentId: "20"
            },
            {
                fullName: "John Miller",
                email: "johnmiller@mail.com",
                status: "started",
                grade: "10",
                environmentId: "20"
            }
        ]
    }
]

let pageActions = [
    {name: "Back", method: ()=> history.back(), class: "violet"}
]

</script>

<div class="dashboard">
    <PageHeading name="Dashboard: {course.name}" actions={pageActions}/>
    <DashboardHeader headings={headings}/>
    <ul class="assignments-list">
        {#each assignments as assignment}
            <li class="assignment">
                <h2 class="assignment-title">{assignment.title}</h2>
                <ul class="students-list">
                    {#each assignment.students as students}
                        <li class="student-assignment">
                            <div class="student-name">
                                <div>{students.fullName}</div>
                                <div>{students.email}</div>
                            </div>
                            <div class="student-status">
                                {students.status}
                            </div>
                            <div class="student-grade">
                                <input value={students.grade}/>
                            </div>
                            <div class="student-environment">
                                <a href="/environments/{students.environmentId}">
                                    Go to assignment
                                </a>
                            </div>
                        </li>
                    {/each}
                </ul>
            </li>
            <hr>
        {/each}    
   </ul>
</div>