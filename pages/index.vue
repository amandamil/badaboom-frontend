<template>
  <no-ssr>
    <full-page ref="fullpage" :options="options">
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <SixthSection />
      <SeventhSection />
      <EighthSection />
      <NinethSection />
      <TenthSection />
      <FeaturesSection />
      <QuoteSection />
      <SunglassesSection />
    </full-page>
  </no-ssr>
</template>

<script>
import NoSsr from 'vue-no-ssr'
import FullPageMixin from './mixins/fullpage'

import FirstSection from '~/components/sections/FirstSection'
import SecondSection from '~/components/sections/SecondSection'
import ThirdSection from '~/components/sections/ThirdSection'
import FourthSection from '~/components/sections/FourthSection'
import FifthSection from '~/components/sections/FifthSection'
import SixthSection from '~/components/sections/SixthSection'
import SeventhSection from '~/components/sections/SeventhSection'
import EighthSection from '~/components/sections/EighthSection'
import NinethSection from '~/components/sections/NinethSection'
import TenthSection from '~/components/sections/TenthSection'
import FeaturesSection from '~/components/sections/FeaturesSection'
import QuoteSection from '~/components/sections/QuoteSection'
import SunglassesSection from '~/components/sections/SunglassesSection'

export default {
  name: 'Body',
  components: {
    NoSsr,
    FirstSection,
    SecondSection,
    ThirdSection,
    FourthSection,
    FifthSection,
    SixthSection,
    SeventhSection,
    EighthSection,
    NinethSection,
    TenthSection,
    FeaturesSection,
    QuoteSection,
    SunglassesSection
  },
  mixins: [FullPageMixin],
  mounted() {
    this.$root.$on('go-next', this.goToNext)
    this.$root.$on('setAllowScrolling', this.setAllowScrollingHandler)
  },
  methods: {
    goToNext() {
      this.$refs.fullpage.api.moveSectionDown()
    },
    setAllowScrollingHandler(value) {
      this.$refs.fullpage.api.setAllowScrolling(value)
    }
  }
}
</script>
