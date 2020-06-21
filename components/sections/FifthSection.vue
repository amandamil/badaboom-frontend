<template>
  <section class="section section--purple">
    <div class="container container--text-center">
      <h2
        v-animate="animationOption"
        class="section-title section-title--small section-title--right"
      >
        Select styles, colours and add bespoke design details to balance your
        collection
      </h2>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FifthSection',
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
