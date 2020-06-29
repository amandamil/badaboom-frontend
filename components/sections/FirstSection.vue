<template>
  <div class="section section--first">
    <video v-if="isMobile" class="section__background" autoplay muted loop>
      <source src="~assets/videos/background-mobile.mp4" type="video/mp4" />
    </video>
    <video v-else class="section__background" autoplay muted loop>
      <source src="~assets/videos/background-desktop.mp4" type="video/mp4" />
    </video>
    <div class="container container--text-center">
      <h1
        v-animate="animationOption"
        class="section-title section-title--first"
      >
        <div class="text">
          The world's entire <br />
          eyewear portfolio <br />
          ...in seconds, <span>Badaboom!</span>
        </div>
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FirstSection',
  data() {
    return {
      animationOption: {
        stagger: [
          {
            el: '.text',
            options: {
              name: 'fade-in-up',
              delay: 1,
              duration: 0.75
            }
          }
        ]
      }
    }
  },
  computed: {
    isMobile() {
      return !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    }
  }
}
</script>
