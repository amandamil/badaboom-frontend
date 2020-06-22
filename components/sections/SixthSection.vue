<template>
  <section class="section section--purple section--wdiw-4">
    <div class="container container--text-center">
      <h2
        v-animate="animationOption"
        class="section-title section-title--small section-title--left"
      >
        Place your order and let us handle all factory coordination, production
        management, quality control and delivery
      </h2>
      <div class="section__image">
        <SquaresAnimation :squares="squares" :delay="1.5" />
      </div>
    </div>
  </section>
</template>

<script>
import SquaresAnimation from '~/components/SquaresAnimation'

export default {
  name: 'SixthSection',
  components: {
    SquaresAnimation
  },
  data() {
    return {
      squares: ['tool-square', 'sunglass-square', 'box-square', 'plane-square'],
      animationOption: {
        name: 'fade-in-up',
        delay: 1,
        duration: 1
      }
    }
  }
}
</script>
