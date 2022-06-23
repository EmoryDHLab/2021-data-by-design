<template>
  <StaticData
    :dataset="['us_features']"
    v-slot="staticData"
    @loaded="loadedData"
  >
    <div
      class="col-span-8 2xl:col-span-10 col-start-2 2xl:col-start-3 mt-6 flex flex-col font-dubois uppercase"
    >
      <p class="font-bold text-2xl">
        A series of statistical charts, illustrating the condition of the
        descendants of former african slaves now resident in the united states
        of america.
      </p>
      <p class="text-red-500">
        une série de cartes est diagrammes statistiques montrant la condition
        preésente des descendants des anciens esclaves africans actuellment
        érablis dans les etas unis d’ amérique.
      </p>
    </div>
    <div
      class="col-span-2 2xl:col-span-2 col-start-2 2xl:col-start-3 mt-6 flex font-dubois uppercase text-center"
    >
      <p>
        prepared and executed by negro students under the direction of atlanta
        university, atlanta, ga, united states of america.
      </p>
    </div>
    <div
      v-if="staticData"
      class="col-span-4 2xl:col-span-6 col-start-4 2xl:col-start-5 mt-6 flex"
    >
      <svg height="100%" width="100%" viewBox="0 0 1000 600">
        <path
          v-for="state in stateData"
          :key="state.name"
          :d="pathGenerator(state.feature)"
          :fill="state.color"
          stroke="darkslategray"
          stroke-width="1.5"
        />
        <circle
          v-for="city in cityData"
          :key="city.city"
          :cx="city.x"
          :cy="city.y"
          :r="5"
          fill="white"
          stroke="darkslategray"
          stroke-width="1.5"
        ></circle>
      </svg>
    </div>
    <div
      class="col-span-2 2xl:col-span-2 col-start-8 2xl:col-start-11 mt-6 flex font-dubois uppercase text-center"
    >
      <p class="text-red-500">
        préparées et exxecutées par des étudiants nègres sous la direction de l’
        universitê d’ atlanta, etat de gêorgie, etas unis d’ amerique.
      </p>
    </div>
    <div
      class="col-span-8 2xl:col-span-10 col-start-2 2xl:col-start-3 mt-6 flex flex-col font-dubois uppercase text-center "
    >
      <p>
        The university was founded in 1867. It has instructed 6000 negro
        students.
      </p>
      <p class="text-red-500">
        L’ université a été fondée en 1867. Elle a donné l’’ instruction a’ 6000
        étudiants negres.
      </p>
      <p>
        It has graduated 330 negroes among whom are:
      </p>
      <p class="text-red-500">Elle a délivre des diplomes a 330 nègres dont:</p>
    </div>
  </StaticData>
</template>
<script>
import * as d3 from "d3";
import StaticData from "@/components/data-access/StaticData";

export default {
  components: { StaticData },
  data: function() {
    return {
      statesJson: null,
      collegeList: [
        { city: "Plano, TX", lat: "33.05", lng: "-96.75" },
        { city: "Irvine, CA", lat: "33.68", lng: "-117.77" },
        { city: "Madison, WI", lat: "43.09", lng: "-89.43" },
        { city: "Fremont, CA", lat: "37.50", lng: "-122.08" },
        { city: "Huntington Beach, CA", lat: "33.69", lng: "-118.01" },
        { city: "Fargo, ND", lat: "46.88", lng: "-96.79" },
        { city: "Grand Prairie, TX", lat: "32.69", lng: "-97.02" },
        { city: "San Jose, CA", lat: "37.30", lng: "-121.82" },
        { city: "Scottsdale, AZ", lat: "33.68", lng: "-111.86" },
        { city: "San Francisco, CA", lat: "37.73", lng: "-123.03" },
        { city: "Bismarck, ND", lat: "46.81", lng: "-100.78" },
        { city: "Overland Park, KS", lat: "38.89", lng: "-94.69" },
        { city: "Santa Rosa, CA", lat: "38.45", lng: "-122.71" },
        { city: "Austin, TX", lat: "30.30", lng: "-97.75" },
        { city: "Sioux Falls, SD", lat: "43.54", lng: "-96.73" },
        { city: "Pearl City, HI", lat: "21.41", lng: "-157.97" },
        { city: "Glendale, CA", lat: "34.15", lng: "-118.26" },
        { city: "San Diego, CA", lat: "32.82", lng: "-117.13" },
        { city: "St. Paul, MN", lat: "44.95", lng: "-93.10" },
        { city: "Charleston, SC", lat: "32.82", lng: "-79.96" }
      ],
      colorStates: [
        { state: "Alabama", color: "#E32D47" },
        { state: "Arizona", color: "#F8BF55" },
        { state: "Arkansas", color: "#EF4F6D" },
        { state: "California", color: "#E32D47" },
        { state: "Colorado", color: "#E32D47" },
        { state: "Connecticut", color: "#F8BF55" },
        { state: "Delaware", color: "#F8BF55" },
        { state: "Florida", color: "#F8BF55" },
        { state: "Georgia", color: "#F8BF55" },
        { state: "Idaho", color: "#EBCFC3" },
        { state: "Illinois", color: "#F8BF55" },
        { state: "Indiana", color: "#EBCFC3" },
        { state: "Iowa", color: "#F8BF55" },
        { state: "Kansas", color: "#F8BF55" },
        { state: "Kentucky", color: "#765C4A" },
        { state: "Louisiana", color: "#F8BF55" },
        { state: "Maine", color: "#9E9D8A" },
        { state: "Maryland", color: "#F8BF55" },
        { state: "Massachusetts", color: "#2B2E76" },
        { state: "Michigan", color: "#2B2E76" },
        { state: "Minnesota", color: "#6374A5" },
        { state: "Mississippi", color: "#969BB9" },
        { state: "Missouri", color: "#F8BF55" },
        { state: "Montana", color: "#EDB863" },
        { state: "Nebraska", color: "#F8BF55" },
        { state: "Nevada", color: "#F8BF55" },
        { state: "New Hampshire", color: "#F8BF55" },
        { state: "New Jersey", color: "#F8BF55" },
        { state: "New Mexico", color: "#9E9D8A" },
        { state: "New York", color: "#F8BF55" },
        { state: "North Carolina", color: "#F8BF55" },
        { state: "North Dakota", color: "#EBCFC3" },
        { state: "Ohio", color: "#F8BF55" },
        { state: "Oklahoma", color: "#352B67" },
        { state: "Oregon", color: "#9E9D8A" },
        { state: "Pennsylvania", color: "#F8BF55" },
        { state: "Rhode Island", color: "#F8BF55" },
        { state: "South Carolina", color: "#EDB863" },
        { state: "South Dakota", color: "#765C4A" },
        { state: "Tennessee", color: "#352B67" },
        { state: "Texas", color: "#EDB863" },
        { state: "Utah", color: "#F8BF55" },
        { state: "Vermont", color: "#EDB863" },
        { state: "Virginia", color: "#969BB9" },
        { state: "Washington", color: "#EDB863" },
        { state: "West Virginia", color: "#F8BF55" },
        { state: "Wisconsin", color: "#F8BF55" },
        { state: "Wyoming", color: "#2B2E76" },
        { state: "Hawaii", color: "#FFFFFF" },
        { state: "Alaska", color: "#FFFFFF" }
      ]
    };
  },
  methods: {
    loadedData({ name, data }) {
      this.statesJson = data;
    }
  },
  computed: {
    projectionUSA() {
      return d3.geoAlbers();
    },
    pathGenerator() {
      return d3.geoPath().projection(this.projectionUSA);
    },
    stateData() {
      return this.statesJson
        ? this.statesJson.features.map(feature => {
            let state = this.colorStates.find(
              state => state.state === feature.properties.NAME
            );
            return {
              feature,
              name: state.state,
              color: state.color
            };
          })
        : [];
    },
    cityData() {
      return this.collegeList.map(city => {
        return {
          city: city.city,
          x: this.projectionUSA([city.lng, city.lat])[0],
          y: this.projectionUSA([city.lng, city.lat])[1]
        };
      });
    }
  }
};
</script>
