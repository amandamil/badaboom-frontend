<template>
  <div :class="inversionClass">
    <Header :inversion="isInversion" />
    <nuxt />
    <Footer :inversion="isInversion" />
    <transition name="fade" mode="in-out">
      <Modal v-show="isShow" @close-modal="closeModal" />
    </transition>
  </div>
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import Modal from '~/components/Modal'

export default {
  components: {
    Header,
    Footer,
    Modal
  },
  data() {
    return {
      isShow: false,
      activeSection: 0,
      inversionSections: [2, 11, 12, 13]
    }
  },
  computed: {
    isInversion() {
      return this.inversionSections.includes(this.activeSection + 1)
    },
    inversionClass() {
      return this.isInversion ? 'inversion' : ''
    }
  },
  watch: {
    isInversion(value) {
      value
        ? document.querySelector('body').classList.add('inversion')
        : document.querySelector('body').classList.remove('inversion')
    }
  },
  mounted() {
    this.$root.$on('openModal', this.openModal)
    this.$root.$on('active-section', this.activeSectionHandler)
  },
  beforeDestroy() {
    this.$root.$off('openModal', this.openModal)
  },
  methods: {
    openModal() {
      this.isShow = true
    },
    closeModal() {
      this.isShow = false
    },
    activeSectionHandler(index) {
      this.activeSection = index
    }
  }
}
</script>
