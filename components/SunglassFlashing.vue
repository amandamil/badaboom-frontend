<template>
  <!-- eslint-disable prettier/prettier -->
  <div class="sunglass-flashing" @inview="play">
    <img
      ref="sunglass"
      :src="image"
      class="sunglass-flashing__image"
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
    delay: {
      type: Number,
      default: 1.5
    }
  },
  data() {
    return {
      tl: null
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
    // setFilter(value) {
    //   const filters = {
    //     brightness: '0.3',
    //     grayscale: '100%'
    //   }
    //   this.$refs.sunglass.style.filter = `${filters.brightness} ${filters.grayscale}`
    //   debugger
    //   // console.log('filters >>', )
    // },
    setAnimation() {
      const { brightBorder } = this.$refs
      // const toSunglassOptions = {
      //   webkitFilter: 'brightness(1) grayscale(0%)',
      //   filter: 'brightness(1) grayscale(0%)',
      //   ease: Bounce.easeOut
      // }
      const filters = {
        brightness: '0.3'
        // grayscale: '100%'
      }

      this.tl = new TimelineMax({
        paused: true,
        repeat: -1,
        yoyo: true,
        delay: this.delay,
        onUpdate: () => {
          this.$refs.sunglass.style.filter = `${filters.brightness}` // ${filters.grayscale}`
        }
      })
        .to(brightBorder, 1, { opacity: 1, ease: Bounce.easeOut })
        .to(
          filters,
          1,
          { brightness: '1' }, // grayscale: '0%', ease: Bounce.easeOut },
          '-=1'
        )

      // this.tl = new TimelineMax({
      //   paused: true,
      //   repeat: -1,
      //   yoyo: true,
      //   delay: this.delay
      // })
      // this.tl
      //   .to(brightBorder, 1, { opacity: 1, ease: Bounce.easeOut })
      //   .to(sunglass, 1, toSunglassOptions, '-=1')
    }
  }
}
</script>

<style lang="scss">
.sunglass-flashing {
  position: relative;

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    -webkit-filter: brightness(0.3) grayscale(100%);
    filter: brightness(0.3) grayscale(100%);
    transition: all 0.3s ease;
  }

  &__border {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0.8;

    &.bright {
      opacity: 0;
    }
  }
}
</style>
