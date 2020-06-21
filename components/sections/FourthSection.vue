<template>
  <section class="section section--purple">
    <div class="container container--text-center">
      <h2
        v-animate="animationOption"
        class="section-title section-title--small section-title--left"
      >
        Based on your inputs, out algorithm automatically searches our portfolio
        and presents products that are specific to your needs
      </h2>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FourthSection',
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
