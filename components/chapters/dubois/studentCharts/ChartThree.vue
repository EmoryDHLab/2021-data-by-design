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
      <div class="w-3/5 flex flex-col items-center space-y-10">
        <p class="font-bold">
          The previous chart visualized information about the 163 college
          graduates of Atlanta University, as of 1909, in the context of the
          3856 total Black college graduates in the entire United States.
        </p>
        <p class="font-bold">
          As part of the 1910 Atlanta University Study, The College-Bred Negro
          American, these same 3856 Black college graduates were surveyed about
          their lives. This chart visualizes their words.
        </p>
      </div>
    </div>
    <QuoteChart />
    <p class="font-duboisNarrow uppercase text-center mt-20">
      This visualization attempts to further humanize the data associated with
      the 3856 Black college graduates whose lives were recorded as data in the
      Atlanta University Study of 1910, entitled The College-Bred Negro
      American. As part of this study, these 3856 graduates were sent a survey
      which, among a range of questions about their lives and accomplishments,
      included four questions that encouraged long-form response: their thoughts
      on their own “early life and training,” their plans to educate their
      children, the “chief hindrances” they had faced, and their “present
      practical philosophy in regard to the Negro race in America”--abbreviated
      in the published study as “philosophy of life.” About 800 responses to the
      survey were received; these are the responses published in the 1910 Study.
    </p>
  </div>
</template>

<script>
import Legend from "./Legend";
import PieChart from "./PieChart";
import studentData from "~/api/static/data/chartOne.json";
import USAMap from "./USAMap";
import QuoteChart from "./QuoteChart";

export default {
  components: {
    QuoteChart,
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
