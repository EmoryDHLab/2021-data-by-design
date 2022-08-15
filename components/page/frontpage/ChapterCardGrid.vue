<template>
  <div class="grid grid-cols-2 grid-rows-3">
    <ChapterCard class="cardBrooks bg-brooks_sec hover:text-white" chapter="brooks">
      <template v-slot:title>Every Datapoint a Person</template>
      <template v-slot:subtitle>The Brooks / Diagram of a Slave Ship</template>
      <template v-slot:caption>
        Before there are data, there are people. People who offer up their
        lives as data -- or whose lives become data without consent.
      </template>
    </ChapterCard>
    <ChapterCard class="cardPlayfair bg-playfair_sec hover:text-white" chapter="playfair">
      <template v-slot:title>What Visualization Reveals</template>
      <template v-slot:subtitle>William Playfair's Time-Series Charts</template>
      <template v-slot:caption>
        Data visualization has never been neutral or objective. There is a
        meaning -- and an argument -- conveyed through each design.
      </template>
    </ChapterCard>
    <ChapterCard class="cardWillard bg-willard_sec hover:text-white">
      <template v-slot:title>Narratives of Possession</template>
      <template v-slot:subtitle>
        Emma Willard and Shanawdithit’s Narrative Maps
      </template>
      <template v-slot:caption>
        Maps can create nations and contest them. <br />How have maps been used
        to document multiple pasts?
      </template>
    </ChapterCard>
    <ChapterCard class="cardPeabody bg-peabody_sec hover:text-white" chapter="peabody">
      <template v-slot:title>The Work of Knowledge</template>
      <template v-slot:subtitle>
        Elizabeth Palmer Peabody’s Chronological Grids as Argument
      </template>
      <template v-slot:caption>
        We have come to believe that data visualizations should be clear and
        efficient. Is there value in designs that make us pause and
        reflect?
      </template>
    </ChapterCard>
    <!--    Example for one col card -->
    <!--    <ChapterCard class="cardDubois bg-dubois_sec hover:text-white col-span-2" style="text-align: center">-->
    <!--      <template v-slot:title>Between Data and Truth</template>-->
    <!--      <template v-slot:subtitle>W. E. B. Du Bois’s “Data Portraits”</template>-->
    <!--      <template v-slot:caption>How can data visualization bear witness to oppression? How can it hold space for what cannot be conveyed through data alone? </template>-->
    <!--    </ChapterCard>-->
    <ChapterCard class="cardDubois bg-dubois_sec hover:text-white" chapter="dubois">
      <template v-slot:title>Between Data and Truth</template>
      <template v-slot:subtitle>W. E. B. Du Bois’s “Data Portraits”</template>
      <template v-slot:caption>
        How can data visualization bear witness to oppression? How can it hold
        space for what cannot be conveyed through data alone?
      </template>
    </ChapterCard>
    <ChapterCard class="cardLabour bg-labour_sec hover:text-white">
      <template v-slot:title>Labour</template>
      <template v-slot:subtitle>W. E. B. Du Bois’s “Data Portraits”</template>
      <template v-slot:caption>
        How can data visualization bear witness to oppression? How can it hold
        space for what cannot be conveyed through data alone?
      </template>
    </ChapterCard>
  </div>
</template>

<script>
import ChapterCard from "./ChapterCard";
export default {
  components: { ChapterCard },
  name: "ChapterCardGrid",
};
</script>

<style scoped>
.cardPlayfair:hover {
  background-size: cover;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../../../assets/images/playfair/1-northamerica.jpg") center;
}

.cardBrooks:hover {
  background-size: cover;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../../../assets/images/brooks/1-sof_slaveship.jpg") center;
}

.cardPeabody:hover {
  background-size: cover;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../../../assets/images/peabody/1500s.jpg") center;
}

.cardWillard:hover {
  background-size: cover;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../../../assets/images/ch4-13-willard.jpg") center;
}

.cardDubois:hover {
  background-size: cover;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../../../assets/images/dubois/ch5-01-phila.jpg") center;
}

.cardLabour:hover {
  background-size: cover;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../../../assets/images/railroadscaled.jpg") center;
}
</style>
