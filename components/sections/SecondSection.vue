<template>
  <section class="section section--green">
    <div class="container container--text-center">
      <h2
        v-animate="animationOption"
        class="section-title section-title--small section-title--second"
      >
        <div class="text">
          <vue-typed-js :strings="words" :loop="true" :back-speed="50">
            <span class="typing" />
          </vue-typed-js>
          <p>
            With instant access to the world’s leading manufactures, you can
            build and produce bespoke eyewear collections
          </p>
        </div>
      </h2>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SecondSection',
  data() {
    return {
      words: ['The Quicker way', 'The Smarter way', 'The New way'],
      animationOption: {
        stagger: [
          {
            el: '.text',
            options: {
              name: 'fade-in-up',
              delay: 0.5,
              duration: 1
            }
          }
        ]
      }
    }
  }
}
</script>
