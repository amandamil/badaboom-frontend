<template>
  <div :class="['squares-animation', { green }]">
    <template v-if="squares.length">
      <svg-icon
        v-for="(square, index) in squares"
        :key="index"
        :name="square"
        :class="[classes[index], 'opacity']"
      />
    </template>
    <template v-else-if="green">
      <svg-icon
        v-for="(isGreen, index) in greenSunglassesArray"
        :key="index"
        name="sunglass-square"
        :class="[classes[index], { green: isGreen }, 'opacity']"
      />
    </template>
    <template v-else>
      <svg-icon name="sunglass-square" class="left-top opacity" />
      <svg-icon name="sunglass-square" class="right-top opacity" />
      <svg-icon name="sunglass-square" class="left-bottom opacity" />
      <svg-icon name="sunglass-square" class="right-bottom opacity" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'SquaresAnimation',
  props: {
    play: {
      type: Boolean,
      default: false
    },
    delay: {
      type: Number,
      default: 1
    },
    green: {
      type: Boolean,
      default: false
    },
    squares: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tl: null,
      greenSunglassesArray: [],
      classes: ['left-top', 'right-top', 'left-bottom', 'right-bottom']
    }
  },
  watch: {
    play(value) {
      if (value) {
        TweenMax.set(this.$el, { opacity: 1 })
        this.tl.play()
      } else {
        TweenMax.to(this.$el, 0.5, { opacity: 0 })
        // this.tl.reverse()
        setTimeout(() => {
          this.tl.stop()
          this.tl.progress(0)
          this.onReverseComplete()
        }, 500)
      }
    }
  },
  created() {
    this.setGreenSquares()
  },
  async mounted() {
    await this.$nextTick()
    this.setAnimation()
  },
  methods: {
    setGreenSquares() {
      const greenSquares = this.getTwoNumbers()
      for (let i = 0; i < 4; i++) {
        const isGreen = !!greenSquares.includes(i)
        this.greenSunglassesArray.push(isGreen)
      }
    },
    setAnimation() {
      const options = { opacity: 1, scale: 1, ease: Back.easeOut }
      let timelineOption = {
        paused: true,
        delay: this.delay
      }

      if (this.green) {
        timelineOption = {
          ...timelineOption,
          onComplete: this.onComplete
        }
      }

      this.tl = new TimelineMax(timelineOption)
      this.tl.staggerTo(this.$el.querySelectorAll('svg'), 0.5, options, 0.25)
    },
    onComplete() {
      TweenMax.staggerTo(
        this.$el.querySelectorAll('.green'),
        0.5,
        { backgroundColor: '#D1FF7A' },
        0.25
      )
    },
    onReverseComplete() {
      const greenSquares = this.$el.querySelectorAll('.green')
      if (greenSquares.length) {
        TweenMax.set(this.$el.querySelectorAll('.green'), {
          backgroundColor: 'transparent'
        })
      }
    },
    getTwoNumbers() {
      const first = this.getRandomFromRange(0, 3)
      let second = first
      while (second === first) {
        second = this.getRandomFromRange(0, 3)
      }
      return [first, second]
    },
    getRandomFromRange(min, max, except) {
      const minValue = Math.ceil(min)
      const maxValue = Math.floor(max)
      return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/partials/_variables';

.squares-animation {
  width: 520px;
  display: flex;
  flex-wrap: wrap;

  svg {
    transform: scale(0.85);
    width: calc(50% - 10px);
    height: 250px;
    margin: 0 18px 18px 0;
    flex-basis: calc(50% - 10px);

    &.green {
      background-color: transparent;
    }

    &.opacity {
      opacity: 0;
    }
  }

  .right-top {
    margin-right: 0;
  }

  .right-bottom,
  .left-bottom {
    margin-bottom: 0;
  }

  .right-bottom {
    margin-right: 0;
  }
}

@media screen and (max-width: 1440px) {
  .squares-animation {
    width: 400px;

    svg {
      max-width: calc(50% - 10px);
      height: 200px;
    }
  }
}

@media screen and (max-width: 992px) {
  .squares-animation {
    width: 250px;
    height: 250px;
    margin: 0 auto;

    svg {
      height: 250px;
      width: 250px;
      max-width: inherit;
      flex-basis: 100%;
      margin: 0;

      &:not(:last-child) {
        display: none;
      }
    }

    &.green {
      svg {
        background-color: $green;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .squares-animation {
    width: 200px;
    height: 200px;

    svg {
      width: 200px;
      height: 200px;
    }
  }
}
</style>
