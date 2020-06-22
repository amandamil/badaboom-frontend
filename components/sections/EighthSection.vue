<template>
  <section class="section section--gray">
    <div class="container container--text-center">
      <div v-animate="animationOption" class="section-text">
        <h2 class="section-text__left">
          Who’s it for?
          <div class="green">BRAND OWNERS</div>
        </h2>
        <p class="section-text__right">
          Create a beautiful and highly commercial private label quickly
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'EighthSection',
  data() {
    return {
      animationOption: {
        stagger: [
          {
            el: '.section-text__left',
            options: {
              name: 'split',
              delay: 0.75,
              duration: 1,
              splitText: true,
              splitTextMode: 'lines',
              iterateDelay: 0.2
            }
          },
          {
            el: '.section-text__right',
            options: {
              name: 'split',
              duration: 0.75,
              splitText: true,
              splitTextMode: 'lines',
              iterateDelay: 0.2
            }
          }
        ]
      }
    }
  }
}
</script>
