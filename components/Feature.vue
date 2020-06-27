<template>
  <!-- eslint-disable prettier/prettier -->
  <div v-animate="animationOption" class="feature">
    <img :src="image.src" :alt="image.alt" v-bind="image" class="feature__image" />
    <div class="feature__title">{{ title }}</div>
    <div class="feature__description">
      <p v-for="(p, id) in paragraphs" :key="id">{{ p }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Feature',
  props: {
    image: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: ''
    },
    paragraphs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      animationOption: {
        stagger: [
          {
            el: '.feature__image',
            options: {
              name: 'fade-in-scale',
              duration: 0.5,
              delay: 0.5
            }
          },
          {
            el: '.feature__title',
            options: {
              name: 'fade-in-up',
              duration: 0.5,
              delay: -0.25
            }
          },
          {
            el: '.feature__description p',
            options: {
              name: 'fade-in-up',
              duration: 0.5,
              delay: -0.25
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/partials/_variables';

.feature {
  color: $gray;

  &__image {
    width: 100%;
    display: block;
    margin-bottom: 63px;
  }

  &__title {
    font-size: 44px;
    font-weight: 600;
    margin-bottom: 35px;
  }

  &__description {
    font-size: 22px;
    line-height: 29px;

    p {
      margin-bottom: 15px;
    }
  }
}

@media screen and (max-width: 1650px) {
  .feature {
    &__image {
      margin-bottom: 45px;
    }

    &__title {
      font-size: 31px;
    }

    &__description {
      font-size: 20px;
    }
  }
}
</style>
