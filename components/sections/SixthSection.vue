<template>
  <section class="section section--purple">
    <div class="container container--text-center">
      <h2
        v-animate="animationOption"
        class="section-title section-title--small section-title--left"
      >
        Place your order and let us handle all factory coordination, production
        management, quality control and delivery
      </h2>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SixthSection',
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
