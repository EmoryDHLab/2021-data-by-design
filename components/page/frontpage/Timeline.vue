<template>
  <div>
<!--    <div class="bg-black text-white"> -->
    <svg width="100%" :height="part1_height + 'px'">
      <image v-for="img in img_data.slice(0, 10)"
           :xlink:href="generateImg(img)"
           :width="150"
           :x="getRand(1600)"
           :y="getRand(part1_height - 100)"
      ></image>
    </svg>


<!--    </div>-->
    <div class="bg-brooks_sec flex">
      <div class="w-1/2">
        <img class="p-20 object-scale-down justify-items-end" src="../../../assets/images/brooks/2-marie-saphire-1770s.jpeg">
      </div>

      <div class="p-20 font-william">
        <div class="text-4xl p-5">
        An Interactive History of Data Visualization
          by ABC XYZ 1786–1900
        </div>
        <div class="text-lg p-5">
          The Amalgamation of White and Black elements of the population in the United States by W.E.B Du Bois.
          Atlanta university. Library of Congress.
        </div>
        <div class="text-lg p-5">
          Every Datapoint a Person ->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import img_data from './img.json';
export default {
  name: "Timeline",
  data(){
    return{
      img_data: img_data,
      part1_height: 400,
      // windowWidth: window.innerWidth,
      dragOffsetX: null,
      dragOffsetY: null,
    }
  },
  methods: {
    generateImg(img) {
      let p = this.getImgPath(img.CHAPTER, img.FILE_NAME);
      return p;
    },
    getImgPath(chapter, file_name) {
      return require(`~/assets/images/${chapter}/${file_name}`);
    },
    getRand(b) {
      // TODO: figure out how to get window size
      return Math.random()*b;
    },
  }
};
</script>

<style scoped>

</style>