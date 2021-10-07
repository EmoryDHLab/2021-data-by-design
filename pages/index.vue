<template>
  <div class="container">
<!--    <NuxtLink to="/chapters/peabody">Peabody</NuxtLink>-->
    <div class="big-title">
      <span class="line-one">DATA BY</span>
      <span class="line-two">DESIGN</span>
    </div>
    <div class="subtitle">
      An Interactive History of Data Visualization<br>
      1786-1900
    </div>
    <div class="question-one">
        What is the story we tell about the emergence of modern data visualization?
      </div>
    <div class="question-two">
      How might we tell that story differently?
    </div>
    <div class="cover-img-container"></div>
    <Captioned class="cover-img">
      <img src="../assets/images/ch5-08b-amalg.jpg"></img>
      <template v-slot:caption>
        <span :style="{color: 'white'}">
          The Amalgamation of White and Black elements of the population in the United States by W.E.B Du Bois.
        Atlanta University. Library of Congress.
        </span>
      </template>
    </Captioned>
    <div>
      Timeline
    </div>
  </div>
</template>

<script>
import LocalImage from "@/components/global/docs-inclusions/LocalImage.vue";
import Captioned from "@/components/global/docs-inclusions/Captioned.vue";
export default {
  components: {Captioned}
}
</script>
<style>
.container {
  background-color: black;
  display: grid;
  grid-template-columns: repeat(14, 1fr);
  grid-template-rows: repeat(10, 81px);
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

</style>
