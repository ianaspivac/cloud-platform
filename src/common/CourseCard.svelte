<script>
    import '../styles/courses.scss';
    import placeholder from '$lib/images/placeholder.png';

    export let course;

    let fullDescription = false;

    // function formatDate(date) {
    //     return new Date(date).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"});
    // }

    function imagePlaceholder(img) {
        return img || placeholder
    }
</script>

<div class="course" on:mouseenter={()=> fullDescription = true} on:mouseleave={()=> fullDescription = false}>
    {#if !fullDescription}
        <div class="card__image">
            <img src={imagePlaceholder(course.image)} alt="Course"/>
        </div>
    {/if}

    <div class="card__title">
        <h2 class="card__title__h2">
            {course.title}
        </h2>

        <!-- <p class="card__title__author">
            {course.author_uuid}
        </p> -->
    </div>

    {#if fullDescription}
        <div class="card__full-description">
            <p>
                {course.short_description}
            </p>
        </div>
        {/if}

    <div class="card__description {course.enrolled ? "enrolled" : ""}">
        {#if course.enrolled}
            Enrolled
        {/if}
    </div>
    <a href="/course/{course.uuid}" class="card__btn btn-container {course.btnClass}">
        {course.btnText}
    </a>
</div>
