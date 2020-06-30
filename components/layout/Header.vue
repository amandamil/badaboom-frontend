<template>
  <!-- eslint-disable prettier/prettier -->
  <header :class="['header', { 'is-open': isOpen }]">
    <div class="header__logo">
      <a href="/">
        <transition name="fade" mode="out-in">
          <svg-icon v-if="inversion" name="logo-dark-gray" />
          <svg-icon v-else name="logo" />
        </transition>
      </a>
    </div>
    <nav ref="navigation" class="header__navigation">
      <ul id="menu" ref="menu">
        <li v-for="(link, index) in navigation" :key="index">
          <a :href="`#${link.href}`" :class="activeLink(link)" @click="goToSection(link)">{{ link.text }}</a>
        </li>
      </ul>
      <div ref="circle" class="header__navigation-circle" />
      <div ref="menuLogo" class="header__navigation-logo">
        <svg-icon name="logo" />
      </div>
      <div ref="menuButton" class="header__navigation-button" @click="openModal">
        <svg-icon name="arrow-right-gray" />REQUEST ACCESS
      </div>
    </nav>
    <div class="header__menu">
      <div class="header__menu-button">
        <svg-icon ref="closeIcon" name="close-menu" class="close" @click="closeMenu" />
        <transition name="fade" mode="out-in">
          <svg-icon v-if="inversion" ref="openIcon" name="open-menu-gray" @click="openMenu" />
          <svg-icon v-else ref="openIcon" name="open-menu" @click="openMenu" />
        </transition>
      </div>
    </div>
  </header>
</template>

<script>
import isElement from 'lodash/isElement'

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
      isOpen: false,
      activeAnchor: null,
      navigation: [
        { href: 'what-is-it', text: 'What is it?' },
        { href: 'how-does-it-works', text: 'How Does it work?' },
        { href: 'whos-it-for', text: "Who's it for?" },
        { href: 'features', text: 'Features' }
      ]
    }
  },
  computed: {
    activeLink() {
      return (link) => (link.href === this.activeAnchor ? 'active' : '')
    }
  },
  async mounted() {
    await this.$nextTick()

    this.$root.$on('afterLoad', this.afterLoadHandler)
    if (window.innerWidth <= 992) {
      this.setAnimation()
    }
  },
  methods: {
    afterLoadHandler({ anchor }) {
      this.activeAnchor = anchor
    },
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
    goToSection({ href }) {
      if (this.isOpen) this.tl.reverse()
      const activeSection = document.querySelector('section.section.active')
      const activeAnchor = isElement(activeSection)
        ? activeSection.getAttribute('data-anchor')
        : ''
      if (href === activeAnchor) return
      this.$root.$emit('setBlockScroll', { down: false, up: false })
      this.$root.$emit('displaySectionStart', true)
      this.$root.$emit('goToSection', href)
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
