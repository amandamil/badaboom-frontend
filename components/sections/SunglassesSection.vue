<template>
  <!-- eslint-disable prettier/prettier -->
  <section class="section section--green">
    <div class="container container--text-center">
      <div v-animate="animationOption" class="sunglasses-container">
        <div class="sunglasses-container__title">Ready to build?</div>
        <div class="sunglasses-container__wrapper">
          <div class="sunglasses-container__list">
            <SunglassFlashing :image="require('~/assets/images/sunglass-blue.png')" :delay="1" />
            <SunglassFlashing :image="require('~/assets/images/sunglass-violet.png')" :delay="1.5" />
            <SunglassFlashing :image="require('~/assets/images/sunglass-pink.png')" :delay="0.5" />
          </div>
        </div>
        <button class="sunglasses-container__button">
          <svg-icon name="right-arrow" />KEEP ME UPDATED
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import SunglassFlashing from '~/components/SunglassFlashing'

export default {
  name: 'SunglassesSection',
  components: {
    SunglassFlashing
  },
  data() {
    return {
      animationOption: {
        stagger: [
          {
            el: '.sunglasses-container__title',
            options: {
              name: 'fade-in-up',
              delay: 0.75,
              duration: 1
            }
          },
          {
            el: '.sunglasses-container__wrapper',
            options: {
              name: 'fade-in-scale',
              duration: 1
            }
          },
          {
            el: '.sunglasses-container__button',
            options: {
              name: 'fade-in',
              duration: 0.75
            }
          }
        ]
      }
    }
  }
}
</script>
