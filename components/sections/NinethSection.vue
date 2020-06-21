<template>
  <section class="section section--purple">
    <div class="container container--text-center">
      <h2
        v-animate="animationOption"
        class="section-title section-title--small section-title--second"
      >
        Fill out a few questions about your label’s brand and target customer
      </h2>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NinethSection',
  data() {
    return {
      animationOption: {
        options: {
          name: 'fade-in-up',
          delay: 0.5,
          duration: 1
        }
      }
    }
  }
}
</script>
