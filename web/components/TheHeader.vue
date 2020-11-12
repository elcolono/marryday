<template>
    <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
        <div class="container">
            <a class="navbar-brand" href="/">MOWO Spaces</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav"
                aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="oi oi-menu"></span> Menu
            </button>

            <div class="collapse navbar-collapse" id="ftco-nav">
                <!-- {% main_menu max_levels=3 template="menus/custom_main_menu.html" sub_menu_template="menus/custom_sub_menu.html" %} -->
                <ul class="navbar-nav ml-auto">
                    <li :key="index" v-for="(item, index) in data[0].menu_items" :class="item.handle" class="nav-item">
                        <a class="nav-link" :href="item.link_page ? item.link_page.slug : item.link_url">{{ item.link_text }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
  props: ["data"]
};
</script>