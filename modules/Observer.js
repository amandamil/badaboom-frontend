import 'intersection-observer'
import isElement from 'lodash/isElement'
import createEvent from '~/utils/create-event'

// Events that fire on observed element
const EVENTS = {
  INVIEW: 'inview',
  OUTVIEW: 'outview'
}

export default class Observer {
  constructor(
    settings = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    }
  ) {
    const events = initEvents()
    this.observer = new IntersectionObserver(callback, settings)

    function callback(entries, observer) {
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i]
        const options = {
          repeat: false
        }

        Object.assign(options, getDataOptions(entry.target.dataset))

        if (entry.isIntersecting) {
          entry.target.dispatchEvent(events.INVIEW)
          if (!options.repeat) observer.unobserve(entry.target)
        } else {
          entry.target.dispatchEvent(events.OUTVIEW)
        }
      }
    }
  }

  observe(el) {
    if (isElement(el)) {
      this.observer.observe(el)
    } else {
      // eslint-disable-next-line no-console
      console.error(`Intersection Observer: ${el} is not DOM element!`)
    }
  }

  unobserve(el) {
    if (isElement(el)) {
      this.observer.unobserve(el)
    } else {
      // eslint-disable-next-line no-console
      console.error(`Intersection Observer: ${el} is not DOM element!`)
    }
  }

  disconnect() {
    this.observer.disconnect()
  }
}

/**
 * Create events from EVENTS list
 */
function initEvents() {
  return Object.keys(EVENTS).reduce((events, eventName) => {
    events[eventName] = createEvent(EVENTS[eventName])
    return events
  }, {})
}

/**
 *
 * @param dataset - list of data attributes
 * @return {{repeat : boolean}}
 */
function getDataOptions(dataset) {
  if (!dataset) return {}

  return {
    repeat: dataset.observerRepeat === 'true' // add data-observer-repeat='true' for prevent unobserve
  }
}
