<template>
  <section class="section section--purple section--wdiw-2">
    <div class="container container--text-center">
      <h2
        v-animate="animationOption"
        class="section-title section-title--small section-title--left"
      >
        <div class="text">
          Based on your inputs, out algorithm automatically searches our
          portfolio and presents products that are specific to your needs
        </div>
      </h2>
      <div class="section__image">
        <SquaresAnimation :delay="1.5" />
      </div>
    </div>
  </section>
</template>

<script>
import SquaresAnimation from '~/components/SquaresAnimation'

export default {
  name: 'FourthSection',
  components: {
    SquaresAnimation
  },
  data() {
    return {
      animationOption: {
        name: 'fade-in-up',
        delay: 1,
        duration: 1
      }
    }
  }
}
</script>
