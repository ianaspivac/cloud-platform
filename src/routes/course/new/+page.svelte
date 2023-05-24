<script>
	import CourseCommon from "../CourseCommon.svelte";
    import { goto } from "$app/navigation"
	import PageHeading from "../../../common/PageHeading.svelte";
    import host from "$lib/stores/host"
    import token from '$lib/stores/token'
	import axios from "axios";
	import Form from "../../../common/Form.svelte";

    
    let fields = [
        {fullName: "Title", name: "title", inputType: "text", value: "", error: ""},
        {fullName: "Short Description", name: "short_description", inputType: "text", value: "", error: ""},
        {fullName: "Full description", name: "description", inputType: "text", value: "", error: ""}
    ]

    async function createCourse(event) {
        const formData = new FormData(event.target)
        let data = {}

        for (let field of formData) {
			const [key, value] = field
            data[key] = value
		}

        await axios.post(`${$host}/v1/course/new`, 
			data,
            {
                headers: {
                Authorization: `Bearer ${$token}`
            }
		}).then((response) => {
            let courseId = response.data.uuid;
            
            goto(`/course/${courseId}/edit`);
        }, (error) => {
            console.log(error);
        });
     
    }
</script>

<div>
   <!-- <CourseCommon pageName="Course edit" additonalActions={actions}/> -->
   <PageHeading name="Course creation" actions={[]}/>
   <Form fields={fields} submitValue="Create" action={createCourse}/>
</div>