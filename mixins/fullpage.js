import get from 'lodash/get'
import isObject from 'lodash/isObject'
import isFunction from 'lodash/isFunction'

export default {
  data() {
    return {
      preventScroll: false,
      blockScroll: { down: false, up: false },
      withoutTransition: {
        up: [3, 4, 5, 6, 7],
        down: [4, 5, 6, 7, 8]
      },
      options: {
        lockAnchors: true,
        anchors: [
          'page1',
          'what-is-it',
          'how-does-it-works',
          'page4',
          'page5',
          'page6',
          'page7',
          'whos-it-for',
          'features',
          'page10'
        ],
        scrollingSpeed: 1000,
        easing: 'none',
        scrollOverflow: false,
        normalScrollElements: '.features__list, .feature',
        onLeave: (section, nextSection, direction) => {
          this.$root.$emit('onLeave', {
            section,
            nextSection,
            direction,
            blockScroll: this.blockScroll,
            preventScroll: this.preventScroll
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

          if (isDisabledTransition) {
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
        }
      }
    }
  },
  afterLoad: (pastSection, section, direction) => {
    this.$root.$emit('afterLoad', { pastSection, section, direction })
  },
  created() {
    this.$root.$on('updateWithoutTransition', this.updateWithoutHandler)
    this.$root.$on('setBlockScroll', this.setBlockScroll)
    this.$root.$on('go-next', this.goToNext)
    this.$root.$on('go-prev', this.goToPrev)
    this.$root.$on('setAllowScrolling', this.setAllowScrollingHandler)
    this.$root.$on('setPreventScroll', this.setPreventScrollHandler)
    this.$root.$on('goToSection', this.goToSectionHandler)
  },
  beforeDestoy() {
    this.$root.$off('go-next', this.goToNext)
    this.$root.$off('go-prev', this.goToPrev)
    this.$root.$off('updateWithoutTransition', this.updateWithoutHandler)
    this.$root.$off('setPreventScroll', this.setPreventScrollHandler)
    this.$root.$off('setAllowScrolling', this.setAllowScrollingHandler)
    this.$root.$off('setBlockScroll', this.setBlockScroll)
    this.$root.$off('goToSection', this.goToSection)
  },
  methods: {
    goToNext() {
      this.callFullPageMethod('moveSectionDown')
    },
    goToPrev() {
      this.callFullPageMethod('moveSectionUp')
    },
    goToSection(anchor) {
      this.$root.$emit('onGoToSection', anchor)
      this.callFullPageMethod('moveTo', [anchor])
    },
    setAllowScrollingHandler(value, direction) {
      this.callFullPageMethod('setAllowScrolling', arguments)
    },
    setPreventScrollHandler(value) {
      this.preventScroll = value
    },
    updateWithoutHandler(array) {
      this.withoutTransition = array
    },
    setBlockScroll(value) {
      this.blockScroll = value
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
