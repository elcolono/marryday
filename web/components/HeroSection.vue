<template>
  <div class="hero-wrap js-fullheight">
    <div class="overlay"></div>
    <div class="container px-0">
      <div
        class="row d-md-flex no-gutters slider-text align-items-center js-fullheight justify-content-start"
      >
        <div class="col-lg-6 d-flex align-items-center ftco-animate">
          <div class="text mt-5">
            <span class="subheading">{{data.subheading}}</span>
            <h1 class="mb-3">{{data.heading}}</h1>
            <p>{{data.description}}</p>
            <p><a :href="data.button_link" target="_blank" class="btn btn-secondary px-4 py-3">{{data.button}}</a></p>
          </div>
        </div>
        <div class="col-lg-6">
          <!-- <img class="img-fluid" src="{% static 'images/undraw_co-working_825n.svg' %}" alt=""> -->
          {{JSON.stringify(data)}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // name: "Test",
  props: ["data"]
};
</script>