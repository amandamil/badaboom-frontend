<template>
  <!-- eslint-disable prettier/prettier -->
  <section class="section section--green section--feature-gray">
    <div class="container container--text-center">
      <div class="features">
        <div ref="wrapper" class="features__wrapper">
          <div class="section-start" />
          <h2 v-animate="animationOption" class="features__title">What’s under the hood?</h2>
          <div class="features__list">
            <Feature
              v-for="(feature, index) in features"
              :key="index"
              :image="feature.image"
              :title="feature.title"
              :paragraphs="feature.paragraphs"
            />
          </div>
          <div class="features__overlay" />
          <div class="section-end" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import Feature from '~/components/Feature'

export default {
  name: 'FeaturesSection',
  components: {
    Feature
  },
  data() {
    return {
      preventTransition: false,
      onLoaded: false,
      animationOption: {
        name: 'fade-in-up',
        duration: 0.75,
        delay: 0.5
      },
      features: [
        {
          image: {
            src: require('~/assets/images/feature-1.png'),
            alt: 'World leading suppliers'
          },
          title: 'World leading suppliers',
          paragraphs: [
            'Badaboom digitally connects you to a vast network of suppliers. All of which our team has worked with for decades due to their quality and production excellence.',
            'All prices are negotiated up-front.'
          ]
        },
        {
          image: {
            src: require('~/assets/images/feature-2.png'),
            alt: 'Industry expertise'
          },
          title: 'Industry expertise',
          paragraphs: [
            'A squad of design experts, logistics professionals, and account managers is digitally synced with you at every step of building your label, from selecting products to updating you on production.'
          ]
        },
        {
          image: {
            src: require('~/assets/images/feature-3.png'),
            alt: 'Smart recommendations'
          },
          title: 'Smart recommendations',
          paragraphs: [
            'Badaboom uses machine learning to understand your needs, search our portfolio and curate a thorough and balanced collection with a high chance of success.'
          ]
        },
        {
          image: {
            src: require('~/assets/images/feature-4.png'),
            alt: 'The latest product releases'
          },
          title: 'The latest product releases',
          paragraphs: [
            'We continuously analyse global purchasing behaviours and trends to curate the newest frames from around the world. This ensures our constantly evolving portfolio will push the latest product as well as the classics.'
          ]
        },
        {
          image: {
            src: require('~/assets/images/feature-5.png'),
            alt: 'Product visualisation'
          },
          title: 'Product visualisation',
          paragraphs: [
            'Badaboom uses 3D software to visualize every product and color you want in stunning reality - without having to wait for prototypes.'
          ]
        },
        {
          image: {
            src: require('~/assets/images/feature-6.png'),
            alt: 'Streamlined communication'
          },
          title: 'Streamlined communication',
          paragraphs: [
            'Badaboom handles communication with multiple factories, handling your entire order so that you have one streamlined, transparent point of communication.'
          ]
        }
      ]
    }
  },
  computed: {
    sectionAnchor() {
      return this.$el.getAttribute('data-anchor')
    }
  },
  beforeDestroy() {
    this.$root.$off('afterLoad', this.afterLoadHandler)
    this.$el
      .querySelector('.features')
      .removeEventListener('scroll', this.throttleScrollHandler)
  },
  async mounted() {
    await this.$nextTick()
    this.$root.$on('afterLoad', this.afterLoadHandler)
    this.$root.$on('onLeave', this.debounceHandler)
    this.$el
      .querySelector('.features')
      .addEventListener('scroll', this.throttleScrollHandler)
  },
  methods: {
    throttleScrollHandler: throttle(function() {
      this.scrollHandler(...arguments)
    }, 500),
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
        this.onLoaded &&
        direction === 'up'
      ) {
        this.$root.$emit('setBlockScroll', { down: false, up: false })
        this.$root.$emit('go-prev')
      }
    },
    afterLoadHandler({ direction, anchor }) {
      if (this.sectionAnchor !== anchor) return

      if (direction === 'up') {
        this.$root.$emit('setBlockScroll', { down: false, up: true })
      }

      if (direction === 'down') {
        this.$root.$emit('setBlockScroll', { down: true, up: false })
        this.onLoaded = true
      }
    },
    scrollHandler(e) {
      const elHeight = $(this.$el).height()
      const startOffset = $('.section-start').offset().top
      const endOffset = $('.section-end').offset().top
      this.onLoaded = false

      if (endOffset < elHeight) {
        this.$root.$emit('setBlockScroll', { down: false, up: false })
        this.$root.$emit('go-next')
        return
      }

      if (startOffset >= 0) {
        this.$root.$emit('setBlockScroll', { down: false, up: false })
        this.$root.$emit('go-prev')
        return
      }

      this.$root.$emit('setBlockScroll', { down: true, up: true })
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/partials/_variables';

.section {
  &--feature-gray {
    .container {
      padding: 0;
    }
  }
}

.features {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: scroll;

  .section-start {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    opacity: 0;
    height: 1px;
  }

  .section-end {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    opacity: 0;
    height: 1px;
  }

  &__overlay {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  &__title {
    font-size: 44px;
    font-weight: 600;
    color: $gray;
    margin-bottom: 85px;
  }

  &__wrapper {
    position: relative;
    padding: 200px 5% 350px;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;

    .feature {
      width: calc(33.33% - 40px / 3);
      flex-basis: calc(33.33% - 40px / 3);
      margin: 0 20px 200px 0;

      &:nth-child(3n) {
        margin-right: 0;
      }

      &:nth-last-child(-n + 3) {
        margin-bottom: 0;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .features {
    &__wrapper {
      padding: 150px 5%;
    }

    &__list {
      .feature {
        width: calc(50% - 10px);
        flex-basis: calc(50% - 10px);
        margin: 0 20px 75px 0;

        &:nth-child(2n + 1) {
          margin-right: 20px;
        }

        &:nth-child(2n) {
          margin-right: 0;
        }

        &:nth-last-child(-n + 2) {
          margin-bottom: 0;
        }
      }
    }

    &__title {
      font-size: 31px;
    }
  }
}

@media screen and (max-width: 768px) {
  .features {
    &__wrapper {
      padding: 100px 5%;
    }

    &__overlay {
      display: none;
    }

    &__title {
      font-size: 26px;
      margin-bottom: 45px;
      text-align: center;
    }

    &__list {
      .feature {
        width: 100%;
        flex-basis: 100%;
        margin: 0 0 75px !important;

        &:nth-child(2n + 1) {
          margin-right: 0;
        }

        &:nth-child(2n) {
          margin-right: 0;
        }

        &:nth-last-child(-n + 2) {
          margin-bottom: 0;
        }

        &:last-child {
          margin-bottom: 0 !important;
        }
      }
    }
  }

  .feature {
    &__image {
      margin-bottom: 25px;
    }

    &__title {
      font-size: 23px;
      margin-bottom: 20px;
    }
  }
}
</style>
