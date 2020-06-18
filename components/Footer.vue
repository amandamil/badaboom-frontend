<template>
  <footer class="footer">
    <button class="footer__button" @click="$root.$emit('openModal')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14.999"
        height="18.771"
        viewBox="0 0 14.999 18.771"
      >
        <path
          d="M1207.071,1746.5l-.545-.839,13.163-8.546-13.163-8.547.545-.839,14.454,9.386Z"
          transform="translate(-1206.526 -1727.726)"
        />
      </svg>
      KEEP ME UPDATED
    </button>

    <div class="footer__arrow-down" @click="goToNext">
      <transition name="fade" mode="out-in">
        <svg-icon :name="arrowIcon" />>
      </transition>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    inversion: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    arrowIcon() {
      return this.inversion ? 'arrow-down-gray' : 'arrow-down'
    }
  },
  methods: {
    goToNext() {
      this.$root.$emit('go-next')
    }
  }
}
</script>
