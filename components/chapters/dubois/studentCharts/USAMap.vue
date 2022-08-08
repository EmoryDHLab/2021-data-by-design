<template>
  <svg height="100%" width="100%" viewBox="0 0 1000 600">
    <path
      v-for="state in stateData"
      :key="state.name"
      :d="pathGenerator(state.feature)"
      :fill="state.color"
      stroke="black"
      stroke-width="1.5"
    />
    <circle
      v-for="city in cityData"
      :key="city.city"
      :cx="city.x"
      :cy="city.y"
      :r="5"
      fill="white"
      stroke="black"
      stroke-width="1.5"
    ></circle>
  </svg>
</template>

<script>
import * as d3 from "d3";
import StaticData from "@/components/data-access/StaticData";
import statesJson from "~/api/static/data/usFeatures.json";

export default {
  components: { StaticData },
  data: function () {
    return {
      statesJson,
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
        { city: "Charleston, SC", lat: "32.82", lng: "-79.96" },
      ],
      colorStates: [
        { state: "Alabama", color: "#D92944" },
        { state: "Arizona", color: "#D0EEFF" },
        { state: "Arkansas", color: "#9AE4C1" },
        { state: "California", color: "#D92944" },
        { state: "Colorado", color: "#D92944" },
        { state: "Connecticut", color: "#FEC313" },
        { state: "Delaware", color: "#94715B" },
        { state: "Florida", color: "#DBF5E9" },
        { state: "Georgia", color: "#9AE4C1" },
        { state: "Idaho", color: "#FFD3D3" },
        { state: "Illinois", color: "#FFF6C9" },
        { state: "Indiana", color: "#FFD3D3" },
        { state: "Iowa", color: "#9AE4C1" },
        { state: "Kansas", color: "#DBF5E9" },
        { state: "Kentucky", color: "#9AE4C1" },
        { state: "Louisiana", color: "#94715B" },
        { state: "Maine", color: "#DBF5E9" },
        { state: "Maryland", color: "#94715B" },
        { state: "Massachusetts", color: "#D92944" },
        { state: "Michigan", color: "#3B6FE0" },
        { state: "Minnesota", color: "#3B6FE0" },
        { state: "Mississippi", color: "#D0EEFF" },
        { state: "Missouri", color: "#D92944" },
        { state: "Montana", color: "#FFF6C9" },
        { state: "Nebraska", color: "#FEC313" },
        { state: "Nevada", color: "#FFF6C9" },
        { state: "New Hampshire", color: "#FEC313" },
        { state: "New Jersey", color: "#94715B" },
        { state: "New Mexico", color: "#DBF5E9" },
        { state: "New York", color: "#FFF6C9" },
        { state: "North Carolina", color: "#FFF6C9" },
        { state: "North Dakota", color: "#FFD3D3" },
        { state: "Ohio", color: "#D0EEFF" },
        { state: "Oklahoma", color: "#FFD3D3" },
        { state: "Oregon", color: "#9AE4C1" },
        { state: "Pennsylvania", color: "#3B6FE0" },
        { state: "Rhode Island", color: "#F8BF55" },
        { state: "South Carolina", color: "#FEC313" },
        { state: "South Dakota", color: "#94715B" },
        { state: "Tennessee", color: "#3B6FE0" },
        { state: "Texas", color: "#FEC313" },
        { state: "Utah", color: "#9AE4C1" },
        { state: "Vermont", color: "#94715B" },
        { state: "Virginia", color: "#D0EEFF" },
        { state: "Washington", color: "#FEC313" },
        { state: "West Virginia", color: "#F3D9FF" },
        { state: "Wisconsin", color: "#F8BF55" },
        { state: "Wyoming", color: "#3B6FE0" },
        { state: "Hawaii", color: "#FFFFFF" },
        { state: "Alaska", color: "#FFFFFF" },
      ],
    };
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
        ? this.statesJson.features.map((feature) => {
            let state = this.colorStates.find(
              (state) => state.state === feature.properties.NAME
            );
            return {
              feature,
              name: state.state,
              color: state.color,
            };
          })
        : [];
    },
    cityData() {
      return this.collegeList.map((city) => {
        return {
          city: city.city,
          x: this.projectionUSA([city.lng, city.lat])[0],
          y: this.projectionUSA([city.lng, city.lat])[1],
        };
      });
    },
  },
};
</script>
