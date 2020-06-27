<template>
  <!-- eslint-disable prettier/prettier -->
  <section class="section section--green">
    <div class="container container--text-center">
      <div v-animate="animationOption" class="sunglasses-container">
        <div class="sunglasses-container__title">Ready to build?</div>
        <no-ssr>
          <Flickity
            ref="slider"
            :options="flickityOptions"
            class="sunglasses-container__slider"
          >
            <div
              v-for="(image, i) in sliderImages"
              :key="i"
              class="sunglasses-container__item"
            >
              <SunglassFlashing :image="image" :delay="0.5" />
            </div>
          </Flickity>
        </no-ssr>
        <button class="sunglasses-container__button" @click="openModal">
          <svg-icon name="right-arrow" />KEEP ME UPDATED
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import NoSsr from 'vue-no-ssr'
import SunglassFlashing from '~/components/SunglassFlashing'

export default {
  name: 'SunglassesSection',
  components: {
    NoSsr,
    SunglassFlashing
  },
  data() {
    return {
      flickityOptions: {
        initialIndex: 1,
        resize: false,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: true,
        accessibility: false,
        cellAlign: 'center',
        autoPlay: 3000
      },
      sliderImages: [
        require('~/assets/images/sunglass-blue.png'),
        require('~/assets/images/sunglass-violet.png'),
        require('~/assets/images/sunglass-pink.png'),
        require('~/assets/images/sunglass-blue-light.png'),
        require('~/assets/images/sunglass-gray-light.png'),
        require('~/assets/images/sunglass-with-shadow.png')
      ],
      animationOption: {
        stagger: [
          {
            el: '.sunglasses-container__title',
            options: {
              name: 'fade-in-up',
              delay: 0.75,
              duration: 0.75
            }
          },
          {
            el: '.sunglasses-container__wrapper',
            options: {
              name: 'fade-in-scale',
              duration: 0.75
            }
          },
          {
            el: '.sunglasses-container__button',
            options: {
              name: 'fade-in',
              duration: 0.5
            }
          }
        ]
      }
    }
  },
  methods: {
    openModal() {
      this.$root.$emit('openModal')
    }
  }
}
</script>
