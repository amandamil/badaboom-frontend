<template>
  <!-- eslint-disable prettier/prettier -->
  <section class="section section--gray-light">
    <div class="container container--text-center">
      <div v-animate="animationOption" class="section-text section-text--full-width">
        <div class="section-text__quote">
          <p class="section-text__quote-text">
            “It’s instant access to every notable factory in China underpinned by
            Assaf’s unparalleled experience of linking eyewear commerce from East
            to West”
          </p>
          <div class="section-text__quote-author">
            Patrick Johnson
            <br />Boots Eyewear, Head Buyer
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'QuoteSection',
  data() {
    return {
      animationOption: {
        stagger: [
          {
            el: '.section-text__quote-text',
            options: {
              name: 'split',
              delay: 0.75,
              duration: 0.75,
              splitText: true,
              splitTextMode: 'lines',
              iterateDelay: 0.2
            }
          },
          {
            el: '.section-text__quote-author',
            options: {
              name: 'fade-in-up',
              duration: 0.5
            }
          }
        ]
      }
    }
  }
}
</script>
