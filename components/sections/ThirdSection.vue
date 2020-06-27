<template>
  <section class="section section--purple section--wdiw-1">
    <div class="container container--text-center">
      <div class="section__image">
        <ChecksDrawing />
      </div>
      <h2
        v-animate="animationOption"
        class="section-title section-title--small section-title--right"
      >
        Fill out a few questions about your label’s brand and target customer
      </h2>
    </div>
  </section>
</template>

<script>
import ChecksDrawing from '~/components/ChecksDrawing'

export default {
  name: 'ThirdSection',
  components: {
    ChecksDrawing
  },
  data() {
    return {
      animationOption: {
        name: 'fade-in-up',
        delay: 0.75,
        duration: 0.75
      }
    }
  }
}
</script>
