<template>
  <div>
    <svg width="100%" :height="part1_height + 'px'"
         @mouseup="currIdx = null"
         @mousemove="moveImage()">

<!--      part 1-->
      <g v-for="(img, index) in img_data.slice(img_slice_idx, img_slice_idx + img_lengh)">
        <image ref="timeline_img"
               :xlink:href="generateImg(img)"
               :width="150"
               :transform="getTransform(index)"
               @click="shiftTimeline(img)"
               @mousedown="changeDisplay(index)"
               :visibility=part1_vis
        ></image>
      </g>

<!--      part 2-->
      <g :visibility=part2_vis>
        <image v-for="(img, index) in sortByYear(img_data)"
               :xlink:href="generateImg(img)"
               :width="150"
               :x="lineXPos[index] + timelinePos"
               :y="150"
               @click="shift(index)"
        ></image>
        <text v-for="(year,index) in getUniqYear(sortedImg)"
              :x="yearTLpos[index] + timelinePos"
              :y="140"
              style="fill: white; font-size: 15px; font-family: VTC William, serif;"
        >{{year}}</text>

        <image :y="part1_height - 100"
               :x="300"
               :width="arrow_size"
               xlink:href="../../../assets/ui/homepage/left_arrow.png"
               @click="timelinePos -= 80"
        ></image>
        <image xlink:href="../../../assets/ui/homepage/right_arrow.png"
               :y="part1_height - 100"
               :x="pageWidth - 350"
               :width="arrow_size"
               @click="timelinePos += 80"
        ></image>
      </g>

<!--      TITLE-->
      <text :y="part1_start + 10" :x="pageWidth/2" text-anchor="middle"
                    style="fill: white; font-size: 35px; font-family: VTC William, serif;"
              >TIMELINE</text>

        <!--      shuffle-->
        <image :y="part1_start + 20"
               :x="pageWidth/2 - 20 - 35"
               :width="arrow_size"
               :xlink:href="require(`~/assets/ui/homepage/${shuffle_icon}.png`)"
               @click="viewShuffle()"
               @mousedown="shuffle_icon='shuffle_click'"
               @mouseup="shuffle_icon = 'shuffle_unclick'"
        ></image>
        <!--      sort-->
        <image :y="part1_start + 20"
               :x="pageWidth/2 - 20 + 35"
               :width="arrow_size"
               :xlink:href="require(`~/assets/ui/homepage/${sort_icon}.png`)"
               @click="viewSort()"
        ></image>

    </svg>


    <div class="bg-brooks_sec flex mb-20">
      <div class="w-2/5">
        <img class="p-20 w-full" :src="generateImg(displayImg)" :alt="displayImg.ALT-TEXT">
      </div>

      <div class="p-20 font-william w-3/5">
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
      img_slice_idx: 30,
      img_lengh: 30,
      part1_start: 40,
      part1_height: 600,
      part2_height: 350,
      pageWidth: null,
      dragOffsetX: null,
      dragOffsetY: null,
      arrow_size: 40,
      timelinePos: 40,
      randXPos: [],
      randYPos: [],
      randRotation: [],
      lineXPos: [],
      sortedImg: null,
      uniqYear: [],
      yearTLpos: [],
      displayImg: img_data[10],
      currIdx: null,
      currX: null,
      currY: null,
      part1_vis: "visible",
      part2_vis: "hidden",
      sort_icon: "sort_unselected",
      shuffle_icon: "shuffle_unclick",
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.pageWidth = innerWidth;
    this.refreshShuffle();
  },
  methods: {
    handleResize() {
      this.pageWidth = innerWidth;
    },
    refreshShuffle() {
      this.randXPos = Array.from({length: this.img_lengh}, () => Math.random() * (this.pageWidth-100));
      this.randYPos = Array.from({length: this.img_lengh}, () => this.part1_start + Math.random() * (this.part1_height - 200));
      this.randRotation = Array.from({length: this.img_lengh}, () => Math.random() * (60) - 30);
      this.img_slice_idx = Math.floor(Math.random() * 98);
    },
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
        this.lineXPos.push(0);
        this.yearTLpos.push(0);
        for (let i = 1; i < sorted.length; i++) {
          if (sorted[i - 1].YEAR === sorted[i].YEAR) {
            this.lineXPos.push(this.lineXPos[i - 1] + 10);
          } else {
            let newyearpos = this.lineXPos[i - 1] + 200
            this.lineXPos.push(newyearpos);
            this.yearTLpos.push(newyearpos);
          }
        }
        this.sortedImg = sorted;
      }
      return sorted
    },
    getUniqYear(sorted) {
      let years = [sorted[0].YEAR];
      for (let i = 1; i < sorted.length; i++) {
        let y = sorted[i].YEAR;
        if (y != years[years.length-1]) {
          years.push(y);
        }
      }
      this.uniqYear = years;
      return years;
    },
    getTransform(idx) {
      let x = this.randXPos[idx];
      let y = this.randYPos[idx];
      let r = this.randRotation[idx];
      return "translate(" + x + "," + y + ") rotate(" + r + ")";
    },
    viewShuffle() {
      if (this.part1_vis == "visible") {
        this.refreshShuffle();
        console.log("shuffle!")
      } else {
        this.part1_vis = "visible";
        this.part2_vis = "hidden";
      }
      this.sort_icon = "sort_unselected";
    },
    viewSort() {
      this.part2_vis = "visible";
      this.part1_vis = "hidden";
      this.sort_icon = "sort_selected";
    },
    shiftTimeline(rand_img) {
      let year = rand_img.YEAR;
      let real_idx = this.uniqYear.indexOf(year);
      // let real_idx = this.sortedImg.indexOf(rand_img);
      this.timelinePos = 700 - real_idx*200;
    },
    shift(idx) {
      this.displayImg = this.sortedImg[idx];
    },
    changeDisplay(idx) {
      this.currY = event.clientY;
      this.currX = event.clientX;
      this.currIdx = idx;
      this.displayImg = this.img_data[idx + this.img_slice_idx];
    },
    moveImage() {
      if (this.currIdx != null) {
        let idx = this.currIdx;
        let xOffset = event.clientX - this.currX;
        this.randXPos[idx] += xOffset;
        let yOffset = event.clientY - this.currY;
        this.randYPos[idx] += yOffset;
        this.currX = event.clientX;
        this.currY = event.clientY;
        this.$forceUpdate();
      }
    }
  }
};
</script>

<style scoped>
image{
  /*TODO: If you have time, maybe add more cursor changes 加油！*/
  cursor: pointer;
}

</style>