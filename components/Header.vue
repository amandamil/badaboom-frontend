<template>
  <header :class="['header', { 'is-open': isOpen }]">
    <div class="header__logo">
      <transition name="fade" mode="out-in">
        <svg-icon v-if="inversion" name="logo-dark-gray" />
        <svg-icon v-else name="logo" />
      </transition>
    </div>
    <nav ref="navigation" class="header__navigation">
      <ul ref="menu">
        <li>
          <a href="#what-is-it">What is it?</a>
        </li>
        <li>
          <a href="#who-does-it-works">Who does it work?</a>
        </li>
        <li>
          <a href="#whos-it-for">Who's it for?</a>
        </li>
        <li>
          <a href="#features">Features</a>
        </li>
      </ul>
      <div ref="circle" class="header__navigation-circle" />
      <div ref="menuLogo" class="header__navigation-logo">
        <svg-icon name="logo" />
      </div>
      <!-- eslint-disable-next-line prettier/prettier -->
      <div ref="menuButton" class="header__navigation-button" @click="openModal">
        <svg-icon name="arrow-right-gray" />GET IN TOUCH
      </div>
    </nav>
    <div class="header__menu">
      <div class="header__menu-button">
        <!-- eslint-disable-next-line prettier/prettier -->
        <svg-icon ref="closeIcon" name="close-menu" class="close" @click="closeMenu" />
        <svg-icon ref="openIcon" name="open-menu" @click="openMenu" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    inversion: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tl: null,
      isOpen: false
    }
  },
  async mounted() {
    await this.$nextTick()

    if (window.innerWidth <= 992) {
      this.setAnimation()
    }
  },
  methods: {
    setAnimation() {
      const {
        navigation,
        circle,
        menu,
        closeIcon,
        openIcon,
        menuLogo,
        menuButton
      } = this.$refs
      const { top, left } = openIcon.getBoundingClientRect()
      const menuItems = menu.querySelectorAll('li')

      this.tl = new TimelineMax({
        paused: true,
        onReverseComplete: this.onReverseComplete
      })
      this.tl
        .set(circle, { top: top + 15, left: left - 15 })
        .set(navigation, { display: 'inline-flex' })
        .to(circle, 0.75, {
          opacity: 1,
          width: '100px',
          height: '100px',
          scale: 50
        })
        .to(openIcon, 0.25, { opacity: 0 }, -0.25)
        .set(openIcon, { display: 'none' })
        .set(closeIcon, { display: 'block' })
        .set(menuButton, { display: 'block' })
        .staggerFromTo(
          [...menuItems],
          0.15,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1 },
          0.1,
          '-=0.25'
        )
        .staggerTo([menuLogo, closeIcon], 0.5, { opacity: 1 })
        .to(menuButton, 0.25, { opacity: 1 })
    },
    openModal() {
      this.$root.$emit('openModal')
    },
    openMenu() {
      this.tl.play()
      this.isOpen = true
      this.$root.$emit('setAllowScrolling', false)
    },
    onReverseComplete() {
      this.isOpen = false
    },
    closeMenu() {
      this.tl.reverse()
      this.$root.$emit('setAllowScrolling', true)
    }
  }
}
</script>
