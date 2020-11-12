<template>
  <div class="ftco-footer-widget mb-4 ml-md-5">
    <h2 class="ftco-heading-2">{{ menu.heading }}</h2>
    <ul class="list-unstyled">
      <li :key="index" v-for="(menu_item, index) in menu.menu_items">
        <a v-if="menu_item.link_page" class="py-2 d-block" :href="'/' + menu_item.link_page.slug">{{ menu_item.link_text }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["menu"]
};
</script>