<template>
  <div>
    <!-- <p>{{ JSON.stringify(content) }}</p> -->
    <div :key="index" v-for="(section, index) in data.content">
      {{ section.type }}
      <HeroSection v-if="section.type == 'hero_section_block'" :data="section.value" />
      <ServiceSection v-if="section.type == 'service_section_block'" :self="section.value" />
    </div>
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
    const slug = params.slug;

    try {
      const data = await $axios.$get(
        `http://127.0.0.1:8000/api/v2/pages/${slug}/`
      );

      return { data };
    } catch (e) {
      return error({
        message: "This post does not exist" + e,
        statusCode: 404,
      });
    }
  },
};
</script>
<style scoped>
</style>
