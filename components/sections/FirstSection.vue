<template>
  <div class="section section--first">
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
              delay: 0.3,
              duration: 1
            }
          }
        ]
      }
    }
  }
}
</script>
