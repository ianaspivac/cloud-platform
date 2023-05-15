<script>
    import '../styles/courses.scss';

    export let course;

</script>
<div class="course course-card-dummy {course.class}">
    <a href={course.link} class="card__btn btn-container">
        {course.btnText}
    </a>
</div>
