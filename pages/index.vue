<template>
  <div>
    <FrontPageTitle></FrontPageTitle>
    <ChapterCardGrid></ChapterCardGrid>
    <AboutSite></AboutSite>
    <SiteFooter v-if="!$isMobile" class="bg-royalblue text-offwhite"></SiteFooter>
  </div>
</template>

<script>
import SiteFooter from "../components/page/sitewide/SiteFooter";
import FrontPageTitle from "../components/page/frontpage/FrontPageTitle";
import AboutSite from "../components/page/frontpage/AboutSite";
import ChapterCardGrid from "../components/page/frontpage/ChapterCardGrid";
export default {
  components: {FrontPageTitle, SiteFooter, AboutSite, ChapterCardGrid}
}
</script>
