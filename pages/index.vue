<template>
  <div>
    <FrontPageTitle></FrontPageTitle>
    <AboutSite></AboutSite>
    <SiteFooter v-if="!$isMobile" class="bg-royalblue text-offwhite"></SiteFooter>
  </div>
</template>

<script>
import SiteFooter from "../components/page/sitewide/SiteFooter";
import FrontPageTitle from "../components/page/frontpage/FrontPageTitle";
import AboutSite from "../components/page/frontpage/AboutSite";
export default {
  components: {FrontPageTitle, SiteFooter, AboutSite}
}
</script>
<style>
.container {
  background-color: black;
  display: grid;
  grid-template-columns: repeat(14, 1fr);
  grid-template-rows: repeat(30, 81px);
  width: 100%;
  color: white;
  font-family: "VTC William";
}
.big-title {
  font-weight: bold;
  font-size: 224px;
  grid-column: 1 / 11;
  grid-row: 1 / 4;
  /*line-height: 80%;*/
  margin-left: 40px;
  z-index: 10;
  line-height: 80%;
}

.big-title .line-one {
}
.big-title .line-two {
  font-family: "VTC William Wide";
  /*grid-column: 2 / -1;*/
  /*grid-row: 3 / -1;*/
  margin-top: 10px;
  /*z-index: 10;*/
  margin-left: 112px;
}

.subtitle {
  font-size: 36px;
  grid-column: 6 / 10;
  grid-row: 6
}

.question-one {
  font-size: 24px;
  grid-column: 2 / 5;
  grid-row: 8 / span 2;
}

.question-two {
  font-size: 24px;
  grid-column: 6 / 9;
  grid-row: 8 / span 2;
}

.cover-img-container {
  background-color: #3B6FE0;
  grid-column: 10 / -1;
  grid-row: 1 / 10;
  margin-top: 40px;
}

.cover-img {
  grid-column: 11 / -2;
  grid-row: 2 / 8;
}

.cover-img img {
  max-width: 100%;
}

.about {
  display: grid;
  grid-column: 2 / -2;
  grid-row: 20 / span 5;
}

.about-title {
  font-size: 36px;
  grid-column: 5 / span 4;
}

</style>
