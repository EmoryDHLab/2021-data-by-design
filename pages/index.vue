<template>
  <div class="bg-black">
    <FrontPageTitle></FrontPageTitle>
    <Timeline></Timeline>
    <h3 class="text-white font-william font-bold text-center text-3xl mb-7">Chapters</h3>
    <ChapterCardGrid></ChapterCardGrid>
    <AboutSite></AboutSite>
    <SiteFooter v-if="!$isMobile" class="bg-nightingale_blue text-offwhite"></SiteFooter>
  </div>
</template>

<script>
import SiteFooter from "../components/page/sitewide/SiteFooter";
import FrontPageTitle from "../components/page/frontpage/FrontPageTitle";
import AboutSite from "../components/page/frontpage/AboutSite";
import ChapterCardGrid from "../components/page/frontpage/ChapterCardGrid";
import Timeline from "../components/page/frontpage/Timeline";
export default {
  components: {Timeline, FrontPageTitle, SiteFooter, AboutSite, ChapterCardGrid}
}
</script>

