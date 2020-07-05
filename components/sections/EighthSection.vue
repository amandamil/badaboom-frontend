<template>
  <!-- eslint-disable prettier/prettier -->
  <section class="section section--gray" data-observer-repeat="true" @inview="inview">
    <div class="container container--text-center">
      <div class="section-text">
        <h2 class="section-text__left">
          Who’s it for?
          <div ref="greenText" class="green">{{ greenText }}</div>
        </h2>
        <p ref="rightText" class="section-text__right">
          {{ rightText }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  name: 'EighthSection',
  data() {
    return {
      tl: null,
      preStep: 0,
      step: 0,
      disabled: false,
      disableAnimation: false,
      greenTexts: ['BRAND OWNERS', 'BUYERS', 'PRODUCT MANAGERS'],
      rightTexts: [
        'Create a beautiful and highly commercial private label quickly',
        'Reduce time, travel and operation costs, whilst staying up to date with the latest trends and products',
        'With access to 1000’s of frames and logistics covered – you can focus on designing the perfect collection'
      ]
    }
  },
  computed: {
    greenText() {
      return this.greenTexts[this.step]
    },
    rightText() {
      return this.rightTexts[this.step]
    },
    sectionAnchor() {
      return this.$el.getAttribute('data-anchor')
    }
  },
  watch: {
    preStep(value, prevValue) {
      const { greenText, rightText } = this.$refs
      const tl = new TimelineMax()

      if (this.disableAnimation) {
        return
      }

      tl.staggerTo([greenText, rightText], 0.5, {
        opacity: 0,
        onComplete: this.setStep.bind(null, value)
      })
      tl.staggerTo([greenText, rightText], 0.5, {
        opacity: 1
      })
    },
    step(value) {
      this.$root.$emit('setPreventScroll', !!value)
    }
  },
  beforeDestroy() {
    this.$observer.unobserve(this.$el)
    this.$root.$off('afterLoad', this.afterLoadHander)
    this.$root.$off('onLeave', this.debounceHandler)
  },
  mounted() {
    this.$observer.observe(this.$el)
    this.$root.$on('afterLoad', this.afterLoadHander)
    this.$root.$on('onLeave', this.debounceHandler)
    this.resetAnimation()
  },
  methods: {
    increasePreStep() {
      this.preStep = this.preStep + 1
    },
    decreasePreStep() {
      this.preStep = this.preStep - 1
    },
    setStep(value) {
      this.step = value
    },
    hideSectionContent() {
      const { greenText, rightText } = this.$refs
      TweenMax.set([greenText, rightText], { opacity: 0, y: 30 })
    },
    resetAnimation() {
      const { greenText, rightText } = this.$refs
      TweenMax.to([greenText, rightText], 0.5, { opacity: 0, y: 30 })
    },
    playAnimation() {
      this.disableAnimation = false
      const { greenText, rightText } = this.$refs
      TweenMax.staggerFromTo(
        [greenText, rightText],
        0.5,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, delay: 1 },
        0
      )
    },
    afterLoadHander({ direction, anchor, displaySectionStart }) {
      if (this.sectionAnchor !== anchor) {
        this.hideSectionContent()
        return
      }

      this.$root.$emit('setBlockScroll', { down: true, up: true })
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
    async handleOnLeave({
      section,
      nextSection,
      direction,
      displaySectionStart
    }) {
      if (this.$el.isEqualNode(nextSection.item)) {
        if (direction === 'down' || displaySectionStart) {
          this.disableAnimation = true
          this.preStep = 0
          this.setStep(0)
        } else {
          this.disableAnimation = true
          const maxStep = this.greenTexts.length - 1
          this.preStep = maxStep
          this.setStep(maxStep)
        }

        await this.$nextTick()
        this.playAnimation()
      }

      if (!this.$el.isEqualNode(section.item)) {
        return
      }

      if (!this.disabled) {
        this.disableScrolling()
      }

      const maxStep = this.greenTexts.length - 1
      switch (true) {
        case direction === 'up' && this.step !== 0:
          this.decreasePreStep()
          return
        case direction === 'down' && this.step <= maxStep - 1:
          this.increasePreStep()
          return
        case direction === 'up' && this.step === 0:
          if (displaySectionStart) return
          this.enableScrolling()
          this.$root.$emit('go-prev')
          return
        case direction === 'down' && this.step === maxStep:
          this.enableScrolling()
          this.$root.$emit('go-next')
          break
      }
    },
    inview() {
      this.disableScrolling()
    },
    disableScrolling() {
      this.disabled = true
      this.$root.$emit('setBlockScroll', { down: true, up: true })
    },
    enableScrolling() {
      this.disabled = false
      this.$root.$emit('setBlockScroll', { down: false, up: false })
    }
  }
}
</script>
