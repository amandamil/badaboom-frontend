<template>
  <div class="section section--green">
    <div class="container container--text-center">
      <h2
        v-animate="animationOption"
        class="section-title section-title--small section-title--second"
      >
        <div class="text">
          <span>
            The
            <div>{{ dynamicWord }}</div>
            way
          </span>
          With instant access to the world’s leading manufactures, you can build
          and produce bespoke eyewear collections
        </div>
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SecondSection',
  data() {
    return {
      interval: null,
      dynamicWord: null,
      dynamicWords: ['Quicker', 'Smarter', 'New'],
      animationOption: {
        stagger: [
          {
            el: '.text',
            options: {
              name: 'fade-in-up',
              delay: 0.3,
              duration: 1
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.startTimer()
  },
  beforeDestroy() {
    this.stopTimer()
  },
  methods: {
    stopTimer() {
      clearInterval(this.interval)
    },
    startTimer() {
      let step = 0
      this.interval = setInterval(() => {
        if (step > this.dynamicWords.length - 1) step = 0
        this.dynamicWord = this.dynamicWords[step]
        step++
      }, 2000)
    }
  }
}
</script>
