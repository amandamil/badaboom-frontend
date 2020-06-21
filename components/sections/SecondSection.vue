<template>
  <section class="section section--green section--what-is-it">
    <div class="container container--text-center">
      <h2
        v-animate="animationOption"
        class="section-title section-title--small section-title--second"
      >
        <div class="text">
          <vue-typed-js :strings="words" :loop="true" :back-speed="50">
            <span class="typing" />
          </vue-typed-js>
          <p>
            Our technology enables you to create a highly commercial eyewear
            label that is defined by the essence of your brand DNA.
          </p>
        </div>
      </h2>
      <div class="section__image">
        <SunglassFlashing />
      </div>
    </div>
  </section>
</template>

<script>
import SunglassFlashing from '~/components/SunglassFlashing'

export default {
  name: 'SecondSection',
  components: {
    SunglassFlashing
  },
  data() {
    return {
      words: ['The Quicker way', 'The Smarter way', 'The New way'],
      animationOption: {
        stagger: [
          {
            el: '.text',
            options: {
              name: 'fade-in-up',
              delay: 0.5,
              duration: 1
            }
          }
        ]
      }
    }
  }
}
</script>
