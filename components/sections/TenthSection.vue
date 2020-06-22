<template>
  <section class="section section--gray">
    <div class="container container--text-center">
      <div v-animate="animationOption" class="section-text">
        <h2 class="section-text__left">
          Who’s it for?
          <div class="green">PRODUCT MANAGERS</div>
        </h2>
        <p class="section-text__right">
          With access to 1000’s of frames and logistics covered – you can focus
          on designing the perfect collection
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TenthSection',
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
