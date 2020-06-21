<template>
  <header class="header">
    <div class="header__logo">
      <transition name="fade" mode="out-in">
        <svg-icon :name="logoIcon" />
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
      tl: null
    }
  },
  computed: {
    logoIcon() {
      return this.inversion ? 'logo-dark-gray' : 'logo'
    }
  },
  async mounted() {
    await this.$nextTick()
    this.setAnimation()
  },
  methods: {
    setAnimation() {
      const { navigation, circle, menu, closeIcon, openIcon } = this.$refs
      const { top, left } = openIcon.getBoundingClientRect()
      const menuItems = menu.querySelectorAll('li')

      this.tl = new TimelineMax({ paused: true })
      this.tl
        .set(circle, { top: top + 15, left: left - 15 })
        .set(navigation, { display: 'flex' })
        .to(circle, 0.75, {
          opacity: 1,
          width: '100px',
          height: '100px',
          scale: 50
        })
        .to(openIcon, 0.25, { opacity: 0 }, -0.5)
        .set(openIcon, { display: 'none' })
        .staggerFromTo(
          [...menuItems],
          0.15,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1 },
          0.1,
          '-=0.25'
        )
        .to(closeIcon, 0.5, {
          display: 'block',
          opacity: 1
        })
    },
    openMenu() {
      this.tl.play()
    },
    closeMenu() {
      this.tl.reverse()
    }
  }
}
</script>
