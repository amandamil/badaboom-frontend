import Vue from 'vue'
// import SplitText from '~/utils/SplitText'

// if (process.browser) {
//   require('gsap/TweenMax')
//   require('gsap/TimelineMax')
// }

const animations = {
  'fade-in': {
    start: { opacity: 0, force3D: false },
    finish: { opacity: 1 }
  },
  'fade-in-up': {
    start: { opacity: 0, y: 20, force3D: false },
    finish: { opacity: 1, y: 0 }
  },
  'fade-in-right': {
    start: { xPercent: -100 },
    finish: { xPercent: 0 }
  },
  'fade-in-left': {
    start: { xPercent: 100 },
    finish: { xPercent: 0 }
  },
  split: {
    start: { opacity: 0, y: 30 },
    finish: { opacity: 1, x: 0 }
  },
  'move-up': {
    start: { y: 10 },
    finish: { y: 0 }
  },
  'move-left': {
    start: { xPercent: 100 },
    finish: { xPercent: 0 }
  },
  'move-right': {
    start: { xPercent: -100 },
    finish: { xPercent: 0 }
  }
}

/**
 * Return animation options + set default value
 * @param value {Object}
 * @returns {{name: (*|string), duration: (*|number), delay: (*|number), splitText: (*|string), splitTextMode: ([chars, words, lines]|string), iterateDelay: (*|number), clearProps: (*|string), onComplete: (*|function) }}
 */
function getOptions(value = {}) {
  return {
    name: value.name || 'fade-in',
    duration: value.duration || 0.5,
    delay: value.delay || 0,
    splitText: value.splitText || false,
    splitTextMode: value.splitTextMode || 'words',
    iterateDelay: value.iterateDelay || 0,
    clearProps: value.clearProps || false,
    onComplete: value.onComplete
  }
}

/**
 * Split text
 * @returns {{tl: (*|TimelineMax)}}
 * @param el
 * @param options
 */
function splitTextAnimation(el, options) {
  const { name, duration, delay, splitTextMode, iterateDelay } = getOptions(
    options
  )
  const tl = new TimelineMax({ delay })

  let nodes = el
  if (!Vue.prototype.$resp.smDown) {
    const text = new SplitText(el, { type: splitTextMode })
    nodes = text[splitTextMode]
  }

  tl.set(nodes, { visibility: 'visible' })
  tl.staggerFrom(nodes, duration, animations[name].start, iterateDelay)
  return tl
}

/**
 * Set clear props + onComplete function
 * @returns {{tl: (*|TimelineMax)}}
 * @param el
 * @param tl
 * @param options
 */
function addClearProps(el, tl, options) {
  const { clearProps, onComplete } = getOptions(options)

  tl.eventCallback('onComplete', () => {
    if (typeof onComplete === 'function') onComplete()
    if (clearProps) TweenMax.set(el, { clearProps })
  })

  return tl
}

/**
 * Set animation styles
 * @param value {Object}
 * @returns {{el: (*|vnode), options: (*|object)}}
 */
function setAnimation(el, options = {}) {
  const { name, splitText } = getOptions(options)

  if (options.stagger) {
    // Section animation
    options.stagger.forEach(
      ({ el: animationEl, options: animationOptions }) => {
        const { name, splitText } = getOptions(animationOptions)

        const nodes = el.querySelectorAll(animationEl)
        if (!nodes.length) return

        if (splitText) {
          TweenMax.set(nodes, { visibility: 'hidden' })
          return
        }

        TweenMax.set(nodes, animations[name].start)
      }
    )
    return
  }

  // Single element
  if (splitText) {
    TweenMax.set(el, { visibility: 'hidden' })
    return
  }
  TweenMax.set(el, animations[name].start)
}

/**
 * Play animation
 * @param value {Object}
 * @returns {{el: (*|vnode), options: (*|object)}}
 */
function playAnimation(el, options = {}) {
  const mainLine = new TimelineMax()

  // Section animation
  if (options.stagger) {
    options.stagger.forEach(
      ({ el: animationEl, options: animationOptions }) => {
        const nodes = el.querySelectorAll(animationEl)
        if (!nodes.length) return

        const { name, duration, delay, splitText, iterateDelay } = getOptions(
          animationOptions
        )
        const tl = new TimelineMax({ delay })

        if (splitText) {
          tl.add(splitTextAnimation(nodes, animationOptions))
        } else {
          tl.staggerTo(nodes, duration, animations[name].finish, iterateDelay)
        }

        mainLine.add(addClearProps(nodes, tl, animationOptions))
      }
    )
    return
  }

  // Single animation
  const { name, duration, delay, splitText } = getOptions(options)

  if (splitText) {
    mainLine.add(splitTextAnimation(el, options))
  } else {
    mainLine.to(el, duration, animations[name].finish, delay)
  }

  addClearProps(el, mainLine, options)
}

Vue.directive('animate', {
  bind(el, { value: options }, { context }) {
    context.$observer.observe(el)
    setAnimation(el, options)
  },

  inserted(el, { value: options }, vnode) {
    el.addEventListener('inview', (e) => {
      playAnimation(el, options)
    })
  },

  unbind(el, binding, { context }) {
    context.$observer.unobserve(el)
  }
})
