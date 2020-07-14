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
              <SunglassFlashing :image="image.image" :image-gray="image.imageGray" :delay="0.5" />
            </div>
          </Flickity>
        </no-ssr>
        <button class="sunglasses-container__button" @click="openModal">
          <svg-icon name="right-arrow" />REQUEST ACCESS
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import debounce from 'lodash/debounce'
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
        {
          image: require('~/assets/images/sunglass-blue.png'),
          imageGray: require('~/assets/images/sunglass-blue--gray.png')
        },
        {
          image: require('~/assets/images/sunglass-violet.png'),
          imageGray: require('~/assets/images/sunglass-violet--gray.png')
        },
        {
          image: require('~/assets/images/sunglass-pink.png'),
          imageGray: require('~/assets/images/sunglass-pink--gray.png')
        },
        {
          image: require('~/assets/images/sunglass-blue-light.png'),
          imageGray: require('~/assets/images/sunglass-blue-light--gray.png')
        },
        {
          image: require('~/assets/images/sunglass-gray-light.png'),
          imageGray: require('~/assets/images/sunglass-gray-light--gray.png')
        },
        {
          image: require('~/assets/images/sunglass-with-shadow.png'),
          imageGray: require('~/assets/images/sunglass-with-shadow--gray.png')
        }
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
  computed: {
    sectionAnchor() {
      return this.$el.getAttribute('data-anchor')
    }
  },
  beforeDestroy() {
    this.$root.$off('onLeave', this.debounceHandler)
    this.$root.$off('afterLoad', this.afterLoadHandler)
  },
  mounted() {
    this.$root.$on('onLeave', this.debounceHandler)
    this.$root.$on('afterLoad', this.afterLoadHandler)
  },
  methods: {
    openModal() {
      this.$root.$emit('openModal')
    },
    debounceHandler: debounce(
      function() {
        this.handleOnLeave(...arguments)
      },
      500,
      {
        leading: true,
        trailing: false
      }
    ),
    handleOnLeave({ section, nextSection, direction, displaySectionStart }) {
      if (
        !this.$el.isEqualNode(nextSection.item) &&
        this.$el.isEqualNode(section.item) &&
        direction === 'up'
      ) {
        this.$root.$emit('setAllowScrolling', false)
      }
    },
    afterLoadHandler({ direction, anchor }) {
      if (this.sectionAnchor !== anchor) return

      this.$root.$emit('setBlockScroll', { down: false, up: false })
    }
  }
}
</script>
