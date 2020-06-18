import get from 'lodash/get'
import Observer from './Observer'

export default class PreloaderObserver extends Observer {
  observe(el) {
    if (get(window, '$nuxt.$store')) {
      window.$nuxt.$store.watch(
        (state) => state.ui.isPreloaderVisible,
        (v) => !v && super.observe(el),
        { immediate: true }
      )
    } else {
      super.observe(el)
    }
  }
}
