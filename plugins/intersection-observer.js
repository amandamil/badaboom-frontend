import Vue from 'vue'
import PreloaderObserver from '../modules/PreloaderObserver'

Vue.use({
  install(Vue) {
    // eslint-disable-next-line no-prototype-builtins
    if (Vue.prototype.hasOwnProperty('$observer')) return
    Object.defineProperty(Vue.prototype, '$observer', {
      value: new PreloaderObserver({
        root: null,
        rootMargin: '-150px',
        threshold: 0
      })
    })
  }
})
