<template>
  <div>
    <svg width="100%" :height="part1_height + 'px'"
         @mouseup="setNewPos()">
      <text :y="part1_start" :x="pageWidth/2 - 100"
            style="fill: white; font-size: 35px; font-family: VTC William, serif;"
      >TIMELINE</text>
      <image :y="10"
             :x="900"
             :width="arrow_size"
             xlink:href="../../../assets/ui/homepage/sort.png"
             @click="part2_vis='visible'"
      ></image>
      <image ref="timeline_img" v-for="(img, index) in img_data.slice(img_slice_idx, img_slice_idx + 10)"
           :xlink:href="generateImg(img)"
           :width="150"
           :x="randXPos[index]"
           :y="randYPos[index]"
           @click="shiftTimeline(img)"
           @mousedown="getCurrIdx(index)"
      ></image>
    </svg>

<!--    part 2-->
    <svg width="100%" :height="part2_height + 'px'" :visibility=part2_vis>
      <image v-for="(img, index) in sortByYear(img_data)"
             :xlink:href="generateImg(img)"
             :width="150"
             :x="lineXPos[index] + timelinePos"
             :y="50"
             @click="shift(index)"
      ></image>
      <text v-for="(year,index) in getUniqYear(sortedImg)"
            :x="index*200 + timelinePos"
            :y="40"
            style="fill: white; font-size: 15px; font-family: VTC William, serif;"
      >{{year}}</text>


      <image :y="part2_height - 50"
             :x="300"
             :width="arrow_size"
             xlink:href="../../../assets/ui/homepage/left_arrow.png"
             @click="timelinePos -= 40"
      ></image>
<!--      TODO: get screen size!!-->
      <image xlink:href="../../../assets/ui/homepage/right_arrow.png"
             :y="part2_height - 50"
             :x="pageWidth - 300"
             :width="arrow_size"
             @click="timelinePos += 40"
      ></image>
    </svg>



    <div class="bg-brooks_sec flex">
      <div class="w-1/3">
        <img class="p-20 w-full" :src="generateImg(displayImg)">
      </div>

      <div class="p-20 font-william w-2/3">
        <div class="text-4xl p-5">
          {{displayImg.TITLE}} by {{displayImg.ARTIST}} {{displayImg.YEAR}}
        </div>
        <div class="text-lg p-5">
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
      img_slice_idx: 20,
      part1_start: 40,
      part1_height: 400,
      part2_height: 350,
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
      uniqYear: [],
      displayImg: img_data[10],
      currIdx: null,
      currX: null,
      currY: null,
      part2_vis: "hidden",
    }
  },
  mounted() {
    this.randXPos = Array.from({length: 10}, () => Math.random() * this.pageWidth);
    this.randYPos = Array.from({length: 10}, () => this.part1_start + Math.random() * (this.part1_height - 200));
    this.img_slice_idx = Math.floor(Math.random() * 98);
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
        return a.YEAR.slice(0,4) - b.YEAR.slice(0,4);
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
    getUniqYear(sorted) {
      let years = [sorted[0].YEAR];
      for (let i = 1; i < sorted.length; i++) {
        let y = sorted[i].YEAR.slice(0,4);
        if (y != years[years.length-1]) {
          years.push(y);
        }
      }
      this.uniqYear = years;
      return years;
    },
    shiftTimeline(rand_img) {
      let year = rand_img.YEAR;
      let real_idx = this.uniqYear.indexOf(year);
      // let real_idx = this.sortedImg.indexOf(rand_img);
      this.timelinePos = 700 - real_idx*200;
    },
    shift(idx) {
      this.timelinePos = 700 - idx*200;
      this.displayImg = this.sortedImg[idx]
    },
    getCurrIdx(idx) {
      this.currY = event.clientY;
      this.currX = event.clientX;
      this.currIdx = idx;
    },
    setNewPos() {
      if (this.currIdx != null) {
        let idx = this.currIdx;
        let xOffset = event.clientX - this.currX;
        this.randXPos[idx] += xOffset;
        let yOffset = event.clientY - this.currY;
        this.randYPos[idx] += yOffset;
        this.$forceUpdate();
        this.currIdx = null;
      }
    }
  }
};
</script>

<style scoped>

</style>