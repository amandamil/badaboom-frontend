<template>
  <section class="section section--gray">
    <div class="container container--text-center">
      <div v-animate="animationOption" class="section-text">
        <h2 class="section-text__left">
          Who’s it for?
          <div class="green">BUYERS</div>
        </h2>
        <p class="section-text__right">
          Reduce time, travel and operation costs, whilst staying up to date
          with the latest trends and products
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NinethSection',
  data() {
    return {
      animationOption: {
        stagger: [
          {
            el: '.section-text__left',
            options: {
              name: 'split',
              delay: 0.5,
              duration: 0.75,
              splitText: true,
              splitTextMode: 'lines',
              iterateDelay: 0.15
            }
          },
          {
            el: '.section-text__right',
            options: {
              name: 'split',
              duration: 0.5,
              splitText: true,
              splitTextMode: 'lines',
              iterateDelay: 0.15
            }
          }
        ]
      }
    }
  }
}
</script>
