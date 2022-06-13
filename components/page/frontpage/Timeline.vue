<template>
  <div>
<!--    <div class="bg-black text-white"> -->
    <svg width="100%" :height="part1_height + 'px'"
         @mouseup="setNewPos()">
      <image ref="timeline_img" v-for="(img, index) in img_data.slice(10, 20)"
           :xlink:href="generateImg(img)"
           :width="150"
           :x="randXPos[index]"
           :y="randYPos[index]"
           @click="shiftTimeline(img)"
           @mousedown="getCurrIdx(index)"
      ></image>
    </svg>

    <svg width="100%" :height="part1_height + 'px'">
      <image v-for="(img, index) in sortByYear(img_data.slice(10, 20))"
             :xlink:href="generateImg(img)"
             :width="150"
             :x="lineXPos[index] + timelinePos"
             :y="100"
             @click="shift(index)"
      ></image>


      <image :y="part1_height - 50"
             :x="300"
             :width="arrow_size"
             xlink:href="../../../assets/ui/homepage/left_arrow.png"
             @click="timelinePos -= 40"
      ></image>
<!--      TODO: get screen size!!-->
      <image xlink:href="../../../assets/ui/homepage/right_arrow.png"
             :y="part1_height - 50"
             :x="pageWidth - 300"
             :width="arrow_size"
             @click="timelinePos += 40"
      ></image>
    </svg>



<!--    </div>-->
    <div class="bg-brooks_sec flex">
      <div class="w-1/3">
        <img class="p-20 w-full" :src="generateImg(displayImg)">
      </div>

      <div class="p-20 font-william w-2/3">
        <div class="text-4xl p-5">
<!--        An Interactive History of Data Visualization-->
<!--          by ABC XYZ 1786–1900-->
          {{displayImg.TITLE}} by {{displayImg.ARTIST}} {{displayImg.YEAR}}
        </div>
        <div class="text-lg p-5">
<!--          The Amalgamation of White and Black elements of the population in the United States by W.E.B Du Bois.-->
<!--          Atlanta university. Library of Congress.-->
          <span style="white-space: pre">{{displayImg.CREDIT}} </span>
          <span style="white-space: pre">{{displayImg.DIGITIZED}}</span>
        </div>
        <div class="text-lg p-5">
          {{displayImg.CHAPTER}} ->
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
      arrow_size: 40,
      timelinePos: 40,
      randXPos: [],
      randYPos: [],
      lineXPos: [],
      pageWidth: 1600,
      sortedImg: null,
      displayImg: img_data[10],
      currIdx: null,
      currX: null,
      currY: null,
    }
  },
  mounted() {
    this.randXPos = Array.from({length: 10}, () => Math.random() * this.pageWidth);
    this.randYPos = Array.from({length: 10}, () => Math.random() * (this.part1_height - 100));
  },
  methods: {
    generateImg(img) {
      let p = this.getImgPath(img.CHAPTER, img.FILE_NAME);
      return p;
    },
    getImgPath(chapter, file_name) {
      return require(`~/assets/images/${chapter}/${file_name}`);
    },
    sortByYear(imgs) {
      let sorted =  imgs.sort(function compYear(a, b) {
        return a.YEAR - b.YEAR;
      });
      if (this.lineXPos.length < sorted.length) {
        this.lineXPos.push(0)
        let x_offset = 0;
        for (let i = 1; i < sorted.length; i++) {
          if (sorted[i - 1].YEAR === sorted[i].YEAR && sorted[i - 1].ARTIST === sorted[i].ARTIST) {
            this.lineXPos.push(this.lineXPos[i - 1] + 10);
          } else {
            x_offset++;
            this.lineXPos.push(x_offset * 200);
          }
        }
        this.sortedImg = sorted;
      }
      return sorted
    },
    shiftTimeline(rand_img) {
      let real_idx = this.sortedImg.indexOf(rand_img);
      this.timelinePos = 700 - real_idx*120;
    },
    shift(idx) {
      this.timelinePos = 700 - idx*120;
      this.displayImg = this.sortedImg[idx]
    },
    getCurrIdx(idx) {
      this.currY = event.clientY;
      this.currX = event.clientX;
      this.currIdx = idx;
    },
    setNewPos() {
      let idx = this.currIdx;
      let xOffset = event.clientX - this.currX;
      this.randXPos[idx] += xOffset;
      let yOffset = event.clientY - this.currY;
      this.randYPos[idx] += yOffset;
      this.$forceUpdate();
    }
  }
};
</script>

<style scoped>

</style>