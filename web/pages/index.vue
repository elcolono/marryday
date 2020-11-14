<template>
  <div>
    <TheHeader :data="mainMenus" />
    <!-- <p>{{ JSON.stringify(page) }}</p> -->
    <div :key="index" v-for="(section, index) in page.items[0].content">
      <!-- {{ section.type }} -->
      <PageHeadingSection v-if="section.type == 'page_heading_section_block'" :title="page.title" :self="section.value" />
      <HeroSection v-if="section.type == 'hero_section_block'" :self="section.value" />
      <ServiceSection v-if="section.type == 'service_section_block'" :self="section.value" />
      <PricingSection v-if="section.type == 'pricing_section_block'" :self="section.value" />
      {{ JSON.stringify(section) }}
    </div>
    <TheFooter :data="flatMenus" />
  </div>
</template>

<script>
export default {
  setComponentName() {
    this.dynamic = () => import(`@/components/${this.componentName}.vue`);
  },
  head: {
    script: [
      { src: "js/jquery.min.js", body: true },
      { src: "js/jquery-migrate-3.0.1.min.js", body: true },
      { src: "js/bootstrap.min.js", body: true },
      { src: "js/jquery.waypoints.min.js", body: true },
      { src: "js/jquery.stellar.min.js", body: true },
      { src: "js/owl.carousel.min.js", body: true },
      { src: "js/jquery.animateNumber.min.js", body: true },
      { src: "js/main.js", body: true },
    ],
  },
  layout: "base",
  async asyncData({ params, $axios, error }) {
    ///api/v2/pages/?type=home.Subpage&fields=seo_text,content`
    try {
      const page = await $axios.$get(
        `${process.env.baseUrl}/api/v2/pages/?type=home.HomePage&fields=seo_text,content`
      );
      const mainMenus = await $axios.$get(
        `${process.env.baseUrl}/api/main-menus`
      );
      const flatMenus = await $axios.$get(
        `${process.env.baseUrl}/api/flat-menus`
      );
      return { page, mainMenus, flatMenus };
    } catch (e) {
      return error({
        message: "Error during request" + e,
        statusCode: 404,
      });
    }
  },
};
</script>
<style scoped>
</style>
