<template>
  <no-ssr>
    <full-page ref="fullpage" :options="options">
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <EighthSection />
      <FeaturesSection />
      <!-- <QuoteSection /> -->
      <SunglassesSection />
    </full-page>
  </no-ssr>
</template>

<script>
import NoSsr from 'vue-no-ssr'
import FullPageMixin from '~/mixins/fullpage'

import FirstSection from '~/components/sections/FirstSection'
import SecondSection from '~/components/sections/SecondSection'
import ThirdSection from '~/components/sections/ThirdSection'
import EighthSection from '~/components/sections/EighthSection'
import FeaturesSection from '~/components/sections/FeaturesSection'
// import QuoteSection from '~/components/sections/QuoteSection'
import SunglassesSection from '~/components/sections/SunglassesSection'

export default {
  name: 'Body',
  components: {
    NoSsr,
    FirstSection,
    SecondSection,
    ThirdSection,
    EighthSection,
    FeaturesSection,
    // QuoteSection,
    SunglassesSection
  },
  mixins: [FullPageMixin]
}
</script>
