<script>
    import '../../../styles/course.scss'
    import { goto } from "$app/navigation"

    let chapters = [
        {
            id: 1,
            name: "UgaBooga"
        },
        {
            id: 2,
            name: "Chapter 2"
        },

        {
            id: 2,
            name: "Chapter 2"
        },

        {
            id: 2,
            name: "Chapter 2"
        },

        {
            id: 2,
            name: "Chapter 2"
        },

        {
            id: 2,
            name: "Chapter 2 dsdasdsadasd sdsadasdsda asdsdasdsadasdad"
        },

        {
            id: 2,
            name: "Chapter 2 dsdasdsadasd sdsadasdsda asdsdasdsadasdad"
        },

        {
            id: 2,
            name: "Chapter 2 dsdasdsadasd sdsadasdsda asdsdasdsadasdad"
        },

        {
            id: 2,
            name: "Chapter 2 dsdasdsadasd sdsadasdsda asdsdasdsadasdad"
        },

        {
            id: 2,
            name: "Chapter 2 dsdasdsadasd sdsadasdsda asdsdasdsadasdad"
        },

        {
            id: 2,
            name: "Chapter 2 dsdasdsadasd sdsadasdsda asdsdasdsadasdad"
        },

        {
            id: 2,
            name: "Chapter 2 dsdasdsadasd sdsadasdsda asdsdasdsadasdad"
        },

        {
            id: 2,
            name: "Chapter 2 dsdasdsadasd sdsadasdsda asdsdasdsadasdad"
        },

    ]

    let minimize = false

    function toggleNavbar() {
        minimize = !minimize
    }

</script>

<div class="course-container">
    <div class="chapters-list {minimize ? "minimize" : ""}">
        <div class="chapters-list-title"><div>Course contents</div> <button on:click={toggleNavbar}>Hide</button></div>
        <ul>
            {#each chapters as chapter, index}
                <li class={index == 0 ? "active" : ""}><a href="?chapter={chapter.id}">{chapter.name}</a></li>
            {/each}
        </ul>
        <div class="show-navbar"><button on:click={toggleNavbar}>Show</button></div>
    </div>

    <div class="course-content">

        <h1>This is heading 1</h1>
        <h2>This is heading 2</h2>
        <h3>This is heading 3</h3>
        <p>Lorem <b>ipsum dolor</b> <em><b>sit amet</b></em>, consectetur adipiscing elit. Praesent enim erat, scelerisque in venenatis sed, cursus vitae sapien. Duis tristique mi eu turpis sagittis imperdiet in eget odio. Praesent porttitor gravida congue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sollicitudin enim vel nunc bibendum suscipit. Integer fermentum nisl nisi, ut ultricies erat pellentesque sit amet. Maecenas iaculis pellentesque purus. Praesent vitae maximus nisi, et semper dui. Nunc dignissim nibh eu rhoncus lobortis. Nam egestas, augue eu convallis molestie, libero nulla mollis metus, luctus imperdiet diam risus non leo. Etiam eu porttitor nisl. Pellentesque nec orci condimentum, congue diam eget, fringilla velit. Nullam pharetra congue massa nec mollis. Quisque ut lacus in diam tempus pretium id a nibh. Aliquam ut augue at augue aliquet eleifend dignissim id massa. Suspendisse ac lorem non diam malesuada efficitur et porttitor leo.</p>
        <p>Lorem <em>ipsum dolor sit amet</em>, consectetur adipiscing elit. Praesent enim erat, scelerisque in venenatis sed, cursus vitae sapien. Duis tristique mi eu turpis sagittis imperdiet in eget odio. Praesent porttitor gravida congue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sollicitudin enim vel nunc bibendum suscipit. Integer fermentum nisl nisi, ut ultricies erat pellentesque sit amet. Maecenas iaculis pellentesque purus. Praesent vitae maximus nisi, et semper dui. Nunc dignissim nibh eu rhoncus lobortis. Nam egestas, augue eu convallis molestie, libero nulla mollis metus, luctus imperdiet diam risus non leo. Etiam eu porttitor nisl. Pellentesque nec orci condimentum, congue diam eget, fringilla velit. Nullam pharetra congue massa nec mollis. Quisque ut lacus in diam tempus pretium id a nibh. Aliquam ut augue at augue aliquet eleifend dignissim id massa. Suspendisse ac lorem non diam malesuada efficitur et porttitor leo.</p>
        <ul>
            <li>List item 1 <code>piece of code</code></li>
            <li>List item 2 <a href="#">this is a link</a></li>
            <li>List item 1</li>
        </ul>
        <p><s>This text is cutten</s></p>
        <pre class="codeblock">
var s = 2;
printf(s);
        </pre>
        <blockquote>
            This is a beautiful quote.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent enim erat, scelerisque in venenatis sed, cursus vitae sapien. Duis tristique mi eu turpis sagittis imperdiet in eget odio
        </blockquote>

        <div class="assignment">
            Assignment 1
            <a href="#">Go to assignment</a>
        </div>

    </div>

</div>