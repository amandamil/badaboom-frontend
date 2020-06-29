<template>
  <section class="section section--purple section--it-works">
    <div ref="container" class="container container--text-center">
      <div class="section-block section-block--one">
        <div class="section__image">
          <ChecksDrawing :play="playAnimation(0)" :delay="delay" />
        </div>
        <h2 class="section-title section-title--small section-title--right">
          <div class="section-title__green">How does it work?</div>
          Fill out a few questions about your label’s brand and target customer
        </h2>
      </div>

      <div class="section-block section-block--two">
        <h2 class="section-title section-title--small section-title--left">
          Based on your inputs, our algorithm automatically searches our
          portfolio and presents products that are specific to your needs
        </h2>
        <div class="section__image">
          <SquaresAnimation :play="playAnimation(1)" :delay="delay" />
        </div>
      </div>

      <div class="section-block section-block--three">
        <div class="section__image">
          <SquaresAnimation
            :play="playAnimation(2)"
            :delay="delay"
            :green="true"
          />
        </div>
        <h2 class="section-title section-title--small section-title--right">
          Select styles, colours and add bespoke design details to balance your
          collection
        </h2>
      </div>

      <div class="section-block section-block--four">
        <h2 class="section-title section-title--small section-title--left">
          Place your order and let us handle all factory coordination,
          production management, quality control and delivery
        </h2>
        <div class="section__image">
          <SquaresAnimation
            :play="playAnimation(3)"
            :squares="squares"
            :delay="delay"
          />
        </div>
      </div>

      <div class="section-block section-block--text-center">
        <svg-icon
          ref="logo"
          name="logo-text"
          class="section-title section-title--scalable-logo"
        />
      </div>
    </div>
  </section>
</template>

<script>
import isElement from 'lodash/isElement'
import debounce from 'lodash/debounce'
import ChecksDrawing from '~/components/ChecksDrawing'
import SquaresAnimation from '~/components/SquaresAnimation'

export default {
  name: 'ThirdSection',
  components: {
    ChecksDrawing,
    SquaresAnimation
  },
  data() {
    return {
      delay: 0,
      tl: null,
      step: null,
      played: false,
      disabled: false,
      imagePlaying: false,
      squares: ['tool-square', 'sunglass-square', 'box-square', 'plane-square']
    }
  },
  computed: {
    titles() {
      return [...this.$el.querySelectorAll('.section-title')]
    },
    images() {
      return [...this.$el.querySelectorAll('.section__image')]
    },
    playAnimation() {
      return (step) => this.step === step && this.imagePlaying
    },
    sectionAnchor() {
      return this.$el.getAttribute('data-anchor')
    },
    maxStep() {
      return this.titles.length - 1
    }
  },
  watch: {
    step(newStep, prevStep) {
      this.play(newStep, prevStep)
    }
  },
  beforeDestroy() {
    this.$root.$off('afterLoad', this.afterLoadHander)
    this.$root.$off('onLeave', this.debounceOnLeaveHandler)
  },
  async mounted() {
    this.$root.$on('afterLoad', this.afterLoadHander)
    this.$root.$on('onLeave', this.debounceOnLeaveHandler)

    await this.$nextTick()
    this.setAnimation()
    this.setLogoAnimation()
  },
  methods: {
    setAnimation() {
      TweenMax.set(this.titles, { opacity: 0, y: 30 })
      TweenMax.set(this.images, { opacity: 0 })
    },
    setLogoAnimation() {
      const { logo, container } = this.$refs
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
        .to(logo, 1.75, { scale: 110, ease: Power4.easeIn })
        .to(container, 0.75, options, '-=0.75')
        .to(logo, 0.15, { opacity: 0 })
    },
    onStart() {
      this.$root.$emit('setAllowScrolling', false)
    },
    onComplete() {
      this.played = true
      this.$root.$emit('setAllowScrolling', true)
      this.$root.$emit('setBlockScroll', { down: false, up: false })
      this.$root.$emit('go-next')
    },
    onReverseComplete() {
      this.played = false
    },
    play(step, prevStep) {
      const tl = new TimelineMax()
      const prevTitle = this.titles[prevStep]
      const prevImage = this.images[prevStep]
      if (isElement(prevTitle)) {
        tl.to(prevTitle, 0.5, { opacity: 0, y: 30 })
      }

      if (isElement(prevImage)) {
        tl.to(prevImage, 0.5, { opacity: 0 }, '-=0.5')
      }

      const nextTitle = this.titles[step]
      const nextImage = this.images[step]
      if (isElement(nextTitle)) {
        tl.to(nextTitle, 0.5, {
          delay: prevStep ? 0.5 : 0,
          opacity: 1,
          y: 0,
          onComplete: () => {
            this.imagePlaying = true
          }
        })
      }

      if (isElement(nextImage)) {
        tl.to(this.images[step], 0.5, { opacity: 1 })
      }

      this.imagePlaying = false
    },
    debounceOnLeaveHandler: debounce(
      function() {
        this.onLeaveHander(...arguments)
      },
      500,
      {
        leading: true,
        trailing: false
      }
    ),
    onLeaveHander({
      section,
      nextSection,
      direction,
      anchor,
      displaySectionStart
    }) {
      if (this.$el.isEqualNode(nextSection.item)) {
        return
      }

      if (!this.$el.isEqualNode(section.item)) {
        return
      }

      switch (true) {
        case direction === 'up' && this.step >= 1:
          this.decreaseStep()
          return
        case direction === 'down' && this.step < this.maxStep:
          this.increaseStep()
          return
        case direction === 'up' && this.step === 0:
          if (displaySectionStart) return
          this.step = null
          this.enableScrolling()
          this.$root.$emit('go-prev')
          return
        case direction === 'down' && this.step === this.maxStep:
          this.$root.$emit('setBlockScroll', { down: true, up: true })
          this.tl.play()
          break
      }
    },
    afterLoadHander({ direction, anchor, displaySectionStart }) {
      if (this.sectionAnchor !== anchor) return
      if (direction === 'down' || displaySectionStart) {
        this.step = 0
        if (this.played) {
          this.tl.reverse()
        }
      } else {
        this.step = this.maxStep
        this.tl.reverse()
      }
      this.disableScrolling()
    },
    increaseStep() {
      this.step = this.step + 1
    },
    decreaseStep() {
      this.step = this.step - 1
    },
    disableScrolling() {
      this.$root.$emit('setBlockScroll', { down: true, up: true })
    },
    enableScrolling() {
      this.$root.$emit('setBlockScroll', { down: false, up: false })
    }
  }
}
</script>
