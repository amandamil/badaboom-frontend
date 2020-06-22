<template>
  <!-- eslint-disable prettier/prettier -->
  <section class="section section--green" @inview="play">
    <div class="container container--text-center">
      <div class="features">
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
      </div>
    </div>
  </section>
</template>

<script>
import Feature from '~/components/Feature'

export default {
  name: 'FeaturesSection',
  components: {
    Feature
  },
  data() {
    return {
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
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/partials/_variables';

.features {
  width: 100%;
  padding: 200px 0;

  &__title {
    font-size: 44px;
    font-weight: 600;
    color: $gray;
    margin-bottom: 85px;
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
    padding: 150px 0;

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
    padding: 150px 0;

    &__title {
      margin-bottom: 45px;
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

    &__title {
      text-align: center;
    }
  }
}
</style>
