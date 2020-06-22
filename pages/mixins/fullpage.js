export default {
  data() {
    return {
      options: {
        menu: '#menu',
        anchors: [
          'page1',
          'page2',
          'page3',
          'page4',
          'page5',
          'page6',
          'page7',
          'page8',
          'page9',
          'page10',
          'page11',
          'page12',
          'page13'
        ],
        scrollOverflow: true,
        scrollingSpeed: 1000,
        easing: 'none',
        onLeave: (section, nextSection, direction) => {
          const height = window.innerHeight
          const ease = Power0.out
          const duration = 1

          this.$root.$emit('active-section', nextSection.index)

          if (direction === 'down') {
            TweenMax.to(section.item, duration, {
              y: height,
              ease
            })
            TweenMax.to(section.item.querySelector('.container'), duration, {
              opacity: 0,
              scale: 0.95,
              ease
            })
          } else {
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
  }
}
