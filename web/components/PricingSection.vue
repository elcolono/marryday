<template>
<section class="ftco-section bg-light" :class="self.custom_classes">
    <div class="container">
        <div v-if="self.heading" class="row justify-content-center mb-5 pb-3">
            <div class="col-md-7 text-center heading-section ftco-animate">
                <h2 class="mb-4">Our Best Pricing</h2>
            </div>
        </div>
        <div class="row d-flex align-items-center">
            <div :key="index" v-for="(pricing, index) in self.pricings" class="col-sm ftco-animate">
                <div class="block-7">
                    <div class="text-center">
                        <h2 class="heading">{{ pricing.heading }}</h2>

                        <!-- Price -->
                        <span class="price"><sup>€</sup> <span class="number">{{ pricing.price }}
                            <small class="per" v-if="pricing.type == 'monthly'">/Monat</small><small class="per" v-else>/Monat</small></span></span>
                            <ul class="pricing-text mb-4">
                                <li :key="index" v-for="(feature, index) in pricing.feature"><strong>
                                    
                                    <svg v-if="feature.available" class="check-icon" fill="none"
                                            stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <svg v-else class="check-icon" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>{{ feature.description }}</strong></li>
                            </ul>
                            <a href="#" class="btn btn-tertiary d-block px-3 py-3 mb-4">Details</a>
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