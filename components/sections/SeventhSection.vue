<template>
  <section class="section section--purple" @inview="play">
    <div ref="container" class="container container--text-center">
      <svg-icon
        ref="scalableText"
        v-animate="animationOption"
        name="logo-text"
        class="scalable-logo"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: 'SeventhSection',
  data() {
    return {
      tl: null,
      animationOption: {
        name: 'fade-in',
        delay: 1,
        duration: 1
      }
    }
  },
  beforeDestroy() {
    this.$observer.unobserve(this.$el)
  },
  async mounted() {
    this.$observer.observe(this.$el)

    await this.$nextTick()
    this.setAnimation()
  },
  methods: {
    play() {
      this.tl.play()
    },
    setAnimation() {
      const { scalableText, container } = this.$refs
      const options = {
        backgroundColor: '#3c3c3b',
        ease: Power2.easeOut
      }
      this.tl = new TimelineMax({
        paused: true,
        delay: 3,
        onComplete: this.onComplete
      })
      this.tl
        .to(scalableText, 2, { scale: 100, ease: Power4.easeIn })
        .to(container, 1, options, '-=0.75')
    },
    onComplete() {
      this.$root.$emit('go-next')
      this.$root.$emit('setAllowScrolling', false)
      setTimeout(() => {
        this.tl.stop()
        this.tl.progress(0)
        this.$root.$emit('setAllowScrolling', true)
      }, 3000)
    }
  }
}
</script>
