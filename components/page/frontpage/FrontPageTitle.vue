<template>
  <div class="grid bg-black text-white grid-cols-14 grid-rows-30 font-william">
    <!--    <NuxtLink to="/chapters/peabody">Peabody</NuxtLink>-->
    <div class="col-start-1 col-end-11 grid grid-cols-5 grid-rows-5">
      <div class="font-bold text-frontTitle col-start-1 col-span-4 row-span-3 z-10 leading-veryTight pl-24">
        <span>DATA BY</span>
        <span class="ml-32">DESIGN</span>
      </div>
      <div class="text-3xl col-start-4 col-span-2 row-start-4">
        An Interactive History of Data Visualization<br>
        1786-1900
      </div>
      <div class="text-xl col-start-2 col-span-2 row-start-5">
        What is the story we tell about the emergence of modern data visualization?
      </div>
      <div class="text-xl col-start-4 col-span-2 row-start-5">
        How might we tell that story differently?
      </div>
    </div>
    <Captioned class="col-start-11 col-span-4 row-span-8 bg-nightingale_blue p-16">
      <img class="max-w-full" src="../../../assets/images/ch5-08b-amalg.jpg"/>
      <template v-slot:caption>
        <span class="text-offwhite">
          The Amalgamation of White and Black elements of the population in the United States by W.E.B Du Bois.
        Atlanta University. Library of Congress.
        </span>
      </template>
    </Captioned>
  </div>
<!--  </div>-->
</template>

<script>
import Captioned from "../../global/docs-inclusions/Captioned";
export default {
  name: "FrontPageTitle",
  components: {Captioned}
}
</script>

<style scoped>

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

</style>