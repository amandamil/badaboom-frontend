<template>
  <section class="section section--purple section--wdiw-3">
    <div class="container container--text-center">
      <div class="section__image">
        <SquaresAnimation :delay="1.25" :green="true" />
      </div>
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
import SquaresAnimation from '~/components/SquaresAnimation'

export default {
  name: 'FifthSection',
  components: {
    SquaresAnimation
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
