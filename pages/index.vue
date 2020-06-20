<template>
  <no-ssr>
    <full-page ref="fullpage" :options="options">
      <FirstSection />
      <SecondSection />
      <ThirdSection />
    </full-page>
  </no-ssr>
</template>

<script>
import NoSsr from 'vue-no-ssr'
import FullPageMixin from './mixins/fullpage'

import FirstSection from '~/components/sections/FirstSection'
import SecondSection from '~/components/sections/SecondSection'
import ThirdSection from '~/components/sections/ThirdSection'

export default {
  name: 'Body',
  components: {
    NoSsr,
    FirstSection,
    SecondSection,
    ThirdSection
  },
  mixins: [FullPageMixin],
  mounted() {
    this.$root.$on('go-next', this.goToNext)
  },
  methods: {
    goToNext() {
      this.$refs.fullpage.api.moveSectionDown()
    }
  }
}
</script>
