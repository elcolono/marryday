<template>
    <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
        <div class="container">
            <a class="navbar-brand" href="/">MOWO Spaces{{JSON.stringify(data)}}</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav"
                aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="oi oi-menu"></span> Menu
            </button>

            <div class="collapse navbar-collapse" id="ftco-nav">
                <!-- {% main_menu max_levels=3 template="menus/custom_main_menu.html" sub_menu_template="menus/custom_sub_menu.html" %} -->
            </div>
        </div>
    </nav>
</template>
<script>
export default {
  props: ["data"]
};
</script>