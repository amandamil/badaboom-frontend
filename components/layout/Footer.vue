<template>
  <footer class="footer">
    <transition name="fade" mode="out-in">
      <button v-if="!hideButton" class="footer__button" @click="openModal">
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
    </transition>

    <transition name="fade" mode="out-in">
      <div v-if="!hideButton" class="footer__arrow-down" @click="goToNext">
        <transition name="fade" mode="out-in">
          <svg-icon v-if="inversion" name="arrow-down-gray" />
          <svg-icon e-else name="arrow-down" />
        </transition>
      </div>
    </transition>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    inversion: {
      type: Boolean,
      default: false
    },
    hideButton: {
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
    },
    openModal() {
      this.$root.$emit('openModal')
    }
  }
}
</script>
