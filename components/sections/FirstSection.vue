<template>
  <div :class="['section section--first', { active: activeSection }]">
    <div class="container container--text-center">
      <video loop muted data-autoplay playsinline class="section__background">
        <source src="~assets/videos/background-desktop.mp4" type="video/mp4" />
      </video>
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
      active: 1,
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
    activeSection() {
      return this.actice === 1
    }
  },
  created() {
    this.$root.$on('active-section', this.activeSectionHandler)
  },
  beforeDestroy() {
    this.$root.$off('active-section', this.activeSectionHandler)
  },
  methods: {
    activeSectionHandler(value) {
      this.active = value
    }
  }
}
</script>
