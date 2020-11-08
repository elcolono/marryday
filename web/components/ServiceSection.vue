<template>
  <section class="ftco-section services-section bg-light">
    <div class="container">
      <div class="row justify-content-center mb-5">
        <div class="col-md-8 text-center heading-section ftco-animate">
          <h2 class="mb-3">{{ self.heading }}</h2>
        </div>
      </div>
      <div class="row">
        <div :key="index" v-for="(service, index) in self.services" class="col-lg-4 col-md-6 align-self-stretch ftco-animate">
          <div class="media block-6 services p-3">
            <div v-html="service.logo" class="icon d-flex align-items-center justify-content-center"></div>
            <div class="media-body text-center pt-4">
              <h3 class="heading">{{ service.heading }}</h3>
              <p class="mb-0">{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: ["self"]
};
</script>