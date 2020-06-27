<template>
  <section class="section section--purple">
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
import debounce from 'lodash/debounce'

export default {
  name: 'SeventhSection',
  data() {
    return {
      tl: null,
      animationOption: {
        name: 'fade-in',
        delay: 0.75,
        duration: 0.75
      }
    }
  },
  beforeDestroy() {
    this.$observer.unobserve(this.$el)
    this.$root.$off('onLeave', this.debounceHandler)
  },
  async mounted() {
    this.$root.$on('onLeave', this.debounceHandler)

    await this.$nextTick()
    this.setAnimation()
  },
  methods: {
    setAnimation() {
      const { scalableText, container } = this.$refs
      const options = {
        backgroundColor: '#3c3c3b',
        ease: Power2.easeOut
      }
      this.tl = new TimelineMax({
        paused: true,
        onStart: this.onStart,
        onComplete: this.onComplete,
        onReverseComplete: this.onReverseComplete
      })
      this.tl
        .to(scalableText, 1.75, { scale: 110, ease: Power4.easeIn })
        .to(container, 0.75, options, '-=0.75')
        .to(scalableText, 0.15, { opacity: 0 })
    },
    onStart() {
      this.$root.$emit('setAllowScrolling', false)
    },
    onComplete() {
      this.$root.$emit('setAllowScrolling', true)
      this.$root.$emit('setBlockScroll', { down: false, up: false })
      this.$root.$emit('go-next')
    },
    onReverseComplete() {
      this.$root.$emit('setBlockScroll', { down: false, up: false })
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
    handleOnLeave({ section, nextSection, direction, preventScroll }) {
      if (this.$el.isEqualNode(nextSection.item) && direction === 'up') {
        if (preventScroll) return

        this.$root.$emit('setBlockScroll', { down: false, up: true })
        setTimeout(() => {
          this.tl.reverse()
        }, 1000)
      }

      if (this.$el.isEqualNode(section.item) && direction === 'down') {
        this.$root.$emit('setBlockScroll', { down: true, up: false })
        this.tl.play()
      }
    }
  }
}
</script>
