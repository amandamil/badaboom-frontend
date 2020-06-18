<template>
  <header class="header">
    <div class="header__logo">
      <transition name="fade" mode="out-in">
        <svg-icon :name="logoIcon" />
      </transition>
    </div>
    <nav class="header__navigation">
      <ul>
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
    </nav>
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
  computed: {
    logoIcon() {
      return this.inversion ? 'logo-dark-gray' : 'logo'
    }
  }
}
</script>
