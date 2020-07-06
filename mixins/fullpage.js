import get from 'lodash/get'
import isObject from 'lodash/isObject'
import isFunction from 'lodash/isFunction'

export default {
  data() {
    return {
      preventScroll: false,
      displaySectionStart: false,
      blockScroll: { down: false, up: false },
      withoutTransition: {
        up: [3],
        down: [4]
      },
      options: {
        lockAnchors: true,
        anchors: [
          'page1',
          'what-is-it',
          'how-does-it-works',
          'whos-it-for',
          'features',
          'page10'
        ],
        scrollingSpeed: 1000,
        easing: 'none',
        scrollOverflow: false,
        normalScrollElements: '.features__list, .feature',
        onLeave: (section, nextSection, direction) => {
          const anchor = section.item.getAttribute('data-anchor')
          this.$root.$emit('onLeave', {
            section,
            nextSection,
            direction,
            anchor,
            blockScroll: this.blockScroll,
            preventScroll: this.preventScroll,
            displaySectionStart: this.displaySectionStart
          })
          if (this.blockScroll[direction]) {
            return false
          }

          const nextSectionId = nextSection.index + 1
          const isDisabledTransition = get(
            this.withoutTransition,
            [direction],
            []
          ).includes(nextSectionId)

          if (isDisabledTransition && !this.displaySectionStart) {
            return true
          }

          const height = window.innerHeight
          const ease = Power0.out
          const duration = 0.5

          this.$root.$emit('active-section', nextSectionId)

          if (direction === 'down') {
            TweenMax.to(section.item, duration * 1.5, {
              y: height * 0.9,
              ease
            })
            TweenMax.to(
              section.item.querySelector('.container'),
              duration * 1.5,
              {
                opacity: 0,
                scale: 0.98,
                ease
              }
            )
          } else {
            TweenMax.set(nextSection.item, { y: height * 0.9 })
            TweenMax.set(nextSection.item.querySelector('.container'), {
              opacity: 0,
              scale: 0.98
            })
            TweenMax.to(
              nextSection.item.querySelector('.container'),
              // eslint-disable-next-line prettier/prettier
              duration, {
                opacity: 1,
                scale: 1,
                ease
              }
            )
            TweenMax.to(nextSection.item, duration, {
              y: 0,
              ease
            })
          }
        },
        afterLoad: (pastSection, section, direction) => {
          const anchor = section.item.getAttribute('data-anchor')
          this.$root.$emit('afterLoad', {
            pastSection,
            section,
            direction,
            anchor,
            displaySectionStart: this.displaySectionStart
          })

          if (this.displaySectionStart) {
            this.displaySectionStart = false
          }
        }
      }
    }
  },
  created() {
    this.$root.$on('updateWithoutTransition', this.updateWithoutHandler)
    this.$root.$on('setBlockScroll', this.setBlockScroll)
    this.$root.$on('go-next', this.goToNext)
    this.$root.$on('go-prev', this.goToPrev)
    this.$root.$on('displaySectionStart', this.displaySectionStartHandler)
    this.$root.$on('setAllowScrolling', this.setAllowScrollingHandler)
    this.$root.$on('setPreventScroll', this.setPreventScrollHandler)
    this.$root.$on('goToSection', this.goToSection)
    this.$root.$on('setNormalScroll', this.normalScrollElementsHandler)
  },
  beforeDestoy() {
    this.$root.$off('go-next', this.goToNext)
    this.$root.$off('go-prev', this.goToPrev)
    this.$root.$off('displaySectionStart', this.displaySectionStartHandler)
    this.$root.$off('updateWithoutTransition', this.updateWithoutHandler)
    this.$root.$off('setPreventScroll', this.setPreventScrollHandler)
    this.$root.$off('setAllowScrolling', this.setAllowScrollingHandler)
    this.$root.$off('setBlockScroll', this.setBlockScroll)
    this.$root.$off('goToSection', this.goToSection)
    this.$root.$off('setNormalScroll', this.normalScrollElementsHandler)
  },
  methods: {
    goToNext() {
      console.log('goToNext >> ')
      this.callFullPageMethod('moveSectionDown')
    },
    goToPrev() {
      console.log('goToPrev >> ')
      this.callFullPageMethod('moveSectionUp')
    },
    goToSection(anchor) {
      console.log('goToSection >> ', anchor)
      this.$root.$emit('onGoToSection', anchor)
      this.setAllowScrollingHandler(true)
      this.setBlockScroll({ down: false, up: false })
      this.callFullPageMethod('moveTo', [anchor])
    },
    displaySectionStartHandler(value) {
      this.displaySectionStart = value
    },
    setAllowScrollingHandler(value, direction) {
      console.log('setPreventScrollHandler >> ', value)
      this.callFullPageMethod('setAllowScrolling', arguments)
    },
    setPreventScrollHandler(value) {
      this.preventScroll = value
    },
    updateWithoutHandler(array) {
      this.withoutTransition = array
    },
    setBlockScroll(value) {
      console.log('setBlockScroll >> ', value)
      this.blockScroll = value
    },
    normalScrollElementsHandler(value) {
      this.normalScrollElements = value
    },
    callFullPageMethod(method, args = []) {
      const isFullpage = isObject(this.$refs.fullpage)
      if (!isFullpage) return
      if (isFunction(this.$refs.fullpage.api[method])) {
        this.$refs.fullpage.api[method](...args)
      }
    }
  }
}
