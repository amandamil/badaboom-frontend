<template>
  <!-- eslint-disable prettier/prettier -->
  <div class="sunglass-flashing">
    <img
      ref="sunglass"
      :src="image"
      class="sunglass-flashing__image"
      alt="sunglass"
    />
    <img
      ref="gray"
      :src="imageGray"
      class="sunglass-flashing__image gray"
      alt="sunglass"
    />
    <img
      ref="brightBorder"
      src="~/assets/images/light-border-bright.png"
      class="sunglass-flashing__border bright"
      alt="sunglass"
    />
    <img
      ref="border"
      src="~/assets/images/light-border.png"
      class="sunglass-flashing__border"
      alt="sunglass"
    />
  </div>
</template>

<script>
export default {
  name: 'SunglassFlashing',
  props: {
    image: {
      type: String,
      required: true
    },
    imageGray: {
      type: String,
      required: true
    },
    delay: {
      type: Number,
      default: 1.5
    }
  },
  computed: {
    isSafari() {
      return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    }
  }
}
</script>

<style lang="scss">
.sunglass-flashing {
  position: relative;

  &__image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;

    &.gray {
      animation: flashing 1s ease-out 0.25s infinite alternate-reverse;
    }
  }

  &__border {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0.8;

    &.bright {
      animation: reverseFlashing 1s ease-out 0s infinite alternate-reverse;
    }
  }
}

@keyframes flashing {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}

@keyframes reverseFlashing {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
}
</style>
