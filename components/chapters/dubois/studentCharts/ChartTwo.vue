<template>
  <div class="w-4/5">
    <div class="mt-6 flex flex-col font-duboisWide uppercase">
      <p
        class="font-bold xl:text-2xl 2xl:text-3xl text-xl tracking-wider text-center"
      >
        a series of statistical charts, illustrating details about the graduates
        of atlanta university, and other black college graduates in the united
        states, who contributed their knowledge, labor, and data to du bois’s
        research program.
      </p>
    </div>
    <div
      class="mt-6 flex items-center justify-between font-duboisNarrow uppercase text-center 2xl:text-xl text-lg"
    >
      <p class="2xl:text-2xl text-lg">
        prepared and executed by<br />
        tanvi sharma, anna mola,<br />
        nicholas yang, and lauren klein<br />
        under the auspices of <br />
        the digital humanities lab <br />
        emory university, atlanta, ga. <br />
        united states of america
      </p>
      <div class="w-2/5 flex flex-col items-center">
        <USAMap />
      </div>
    </div>
    <div
      class="flex flex-col items-center font-duboisNarrow uppercase text-center 2xl:text-2xl text-lg mt-8"
    >
      <p class="m-6 font-bold w-4/5">
        the previous chart visualized all 330 graduates of atlanta university as
        of 1898. in 1910, du bois and his students undertook a larger study of
        black college graduates across the entire united states.
      </p>
      <p class="m-6 font-bold">
        this chart visualizes the names, occupations, and present locations
        (when known) of the 163 college graduates of atlanta university who were
        included in the 1910 study, as determined by the 1909-1910 catalogue of
        the officers and students of atlanta university.
      </p>
    </div>
    <div class="flex items-center justify-between w-4/5 pb-10">
      <Legend :legendList="studentData.categories"></Legend>
      <PieChart :studentData="studentData" />
    </div>
    <div class="mt-6 font-dubois uppercase">
      <p class="text-center">
        this visualization attempts to honor the 3856 black college graduates
        from across the united states whose lives were behind the data included
        in the 1910 atlanta university study, the college-bred negro american. a
        subset of these graduates, whose names remain unknown, contributed
        research to the study in the form of data collection and analysis. in
        this chart, each of the 133 college graduates of atlanta university as
        of 1909, with known occupations (as determined by the alumni section of
        the 1909-1910 atlanta university catalog), are positioned in the
        appropriate area of the pie chart. hovering on each dot reveals the
        graduate’s name, occupation, and place of residence. additional
        categories represent the 9 college graduates with unknown occupations
        and the 21 graduates who were recorded in the 1909-1910 catalog as
        “deceased.” an additional 3693 gray dots represent the graduates of the
        other 140 colleges included in the study whose names were not recorded
        as data.
      </p>
    </div>
  </div>
</template>

<script>
import Legend from "./Legend";
import PieChart from "./PieChart";
import studentData from "~/api/static/data/chartTwo.json";
import USAMap from "./USAMap";

export default {
  components: {
    USAMap,
    PieChart,
    Legend,
  },
  data() {
    return {
      studentData,
    };
  },
};
</script>
