<template>
  <section class="section section--purple" @inview="play">
    <div class="container container--text-center">
      <h2 v-animate="animationOption" class="section-title section-title--gray">
        <div ref="splitAnimation" class="section-title__animation-container">
          <span class="left">BADA</span>
          <span class="right">BOOM</span>
          <div class="line line--one"></div>
          <div class="line line--two"></div>
        </div>
      </h2>
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
        options: {
          name: 'fade-in-up',
          delay: 0.5,
          duration: 1
        }
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
      this.tl = new TimelineMax({ paused: true })
      const textLeftEl = this.$refs.splitAnimation.querySelector('.left')
      const textRigthEl = this.$refs.splitAnimation.querySelector('.right')
      const lineEls = this.$refs.splitAnimation.querySelectorAll('.line')
      const lineOneEl = this.$refs.splitAnimation.querySelector('.line--one')
      const lineTwoEl = this.$refs.splitAnimation.querySelector('.line--two')
      const offset = (textLeftEl.offsetWidth + textRigthEl.offsetWidth) / 12
      const offsetHeight = textLeftEl.offsetHeight / 2
      TweenMax.set(textLeftEl, { x: offset, opacity: 0 })
      TweenMax.set(textRigthEl, { x: -offset, opacity: 0 })

      const animationOptions = {
        width: '100%',
        opacity: 1,
        delay: 0.5,
        ease: Power2.out
      }

      this.tl
        .set(lineEls, { y: offsetHeight })
        .staggerTo(lineEls, 1, animationOptions)
        .to(lineOneEl, 0.5, { y: 0, ease: Power2.out })
        .to(lineTwoEl, 0.5, { y: offsetHeight * 2, ease: Power2.out }, '-=0.5')
        .staggerTo([textLeftEl, textRigthEl], 1.5, {
          x: 0,
          opacity: 1,
          ease: Power2.out
        })
        .staggerTo(lineEls, 0.5, { opacity: 0 }, '-=0.5')
    }
  }
}
</script>
