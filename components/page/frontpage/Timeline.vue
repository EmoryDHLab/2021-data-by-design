<template>
  <div>
    <svg
      width="100%"
      :height="part1Height + 'px'"
      @mouseup="currentIndex = null"
      @mousemove="moveImage()"
    >
      <!--      part 1-->
      <g
        v-for="(img, index) in imageData.slice(
          imageSliceIndex,
          imageSliceIndex + imageLength
        )"
      >
        <image
          ref="timeline_img"
          :xlink:href="generateImg(img)"
          :width="150"
          :transform="getTransform(index)"
          @click="shiftTimeline(img)"
          @mousedown="changeDisplay(index)"
          :visibility="part1Vis"
        ></image>
      </g>

      <!--      part 2-->
      <g :visibility="part2Vis">
        <image
          v-for="(img, index) in sortByYear(imageData)"
          :xlink:href="generateImg(img)"
          :width="150"
          :x="lineXPosition[index] + timelinePosition"
          :y="150"
          @click="shift(index)"
        ></image>
        <text
          v-for="(year, index) in getUniqYear(sortedImages)"
          :x="yearTimelinePosition[index] + timelinePosition"
          :y="140"
          style="fill: white; font-size: 15px; font-family: VTC William, serif"
        >
          {{ year }}
        </text>

        <image
          :y="part1Height - 100"
          :x="300"
          :width="arrowSize"
          xlink:href="../../../assets/ui/homepage/left_arrow.png"
          @click="timelinePosition -= 80"
        ></image>
        <image
          xlink:href="../../../assets/ui/homepage/right_arrow.png"
          :y="part1Height - 100"
          :x="pageWidth - 350"
          :width="arrowSize"
          @click="timelinePosition += 80"
        ></image>
      </g>

      <!--      TITLE-->
      <text
        :y="part1Start + 10"
        :x="pageWidth / 2"
        text-anchor="middle"
        style="fill: white; font-size: 35px; font-family: VTC William, serif"
      >
        TIMELINE
      </text>

      <!--      shuffle-->
      <image
        :y="part1Start + 20"
        :x="pageWidth / 2 - 20 - 35"
        :width="arrowSize"
        :xlink:href="require(`~/assets/ui/homepage/${shuffleIcon}.png`)"
        @click="viewShuffle()"
        @mousedown="shuffleIcon = 'shuffle_click'"
        @mouseup="shuffleIcon = 'shuffle_unclick'"
      ></image>
      <!--      sort-->
      <image
        :y="part1Start + 20"
        :x="pageWidth / 2 - 20 + 35"
        :width="arrowSize"
        :xlink:href="require(`~/assets/ui/homepage/${sortIcon}.png`)"
        @click="viewSort()"
      ></image>
    </svg>

    <div class="bg-brooks_sec flex mb-20">
      <div class="w-2/5">
        <img
          class="p-20 w-full"
          :src="generateImg(displayImage)"
          :alt="displayImage.ALT - displayImage.TEXT"
        />
      </div>

      <div class="p-20 font-william w-3/5">
        <div class="text-4xl p-5">
          {{ displayImage.TITLE }} by {{ displayImage.ARTIST }}
          {{ displayImage.YEAR }}
        </div>
        <div class="text-lg p-5">
          <span style="white-space: pre">{{ displayImage.CREDIT }} </span>
          <span style="white-space: pre">{{ displayImage.DIGITIZED }}</span>
        </div>
        <div class="text-lg p-5">{{ displayImage.CHAPTER }} -></div>
      </div>
    </div>
  </div>
</template>

<script>
import imageData from "./img.json";
export default {
  name: "Timeline",
  data() {
    return {
      imageData,
      imageSliceIndex: 30,
      imageLength: 30,
      part1Start: 40,
      part1Height: 600,
      part2Height: 350,
      pageWidth: null,
      dragOffsetX: null,
      dragOffsetY: null,
      arrowSize: 40,
      timelinePosition: 40,
      randomXPosition: [],
      randomYPosition: [],
      randRotation: [],
      lineXPosition: [],
      sortedImages: null,
      uniqueYear: [],
      yearTimelinePosition: [],
      displayImage: imageData[10],
      currentIndex: null,
      currentX: null,
      currentY: null,
      part1Vis: "visible",
      part2Vis: "hidden",
      sortIcon: "sort_unselected",
      shuffleIcon: "shuffle_unclick",
    };
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.pageWidth = innerWidth;
    this.refreshShuffle();
  },
  methods: {
    handleResize() {
      this.pageWidth = innerWidth;
    },
    refreshShuffle() {
      this.randomXPosition = Array.from(
        { length: this.imageLength },
        () => Math.random() * (this.pageWidth - 100)
      );
      this.randomYPosition = Array.from(
        { length: this.imageLength },
        () => this.part1Start + Math.random() * (this.part1Height - 200)
      );
      this.randRotation = Array.from(
        { length: this.imageLength },
        () => Math.random() * 60 - 30
      );
      this.imageSliceIndex = Math.floor(Math.random() * 98);
    },
    generateImg(img) {
      let p = this.getImgPath(img.CHAPTER, img.FILE_NAME);
      return p;
    },
    getImgPath(chapter, file_name) {
      return require(`~/assets/images/${chapter}/${file_name}`);
    },
    sortByYear(imgs) {
      let sorted = imgs.sort((a, b) => a.YEAR.slice(0, 4) - b.YEAR.slice(0, 4));

      if (this.lineXPosition.length < sorted.length) {
        this.lineXPosition.push(0);
        this.yearTimelinePosition.push(0);
        for (let i = 1; i < sorted.length; i++) {
          if (sorted[i - 1].YEAR === sorted[i].YEAR) {
            this.lineXPosition.push(this.lineXPosition[i - 1] + 10);
          } else {
            let newyearpos = this.lineXPosition[i - 1] + 200;
            this.lineXPosition.push(newyearpos);
            this.yearTimelinePosition.push(newyearpos);
          }
        }
        this.sortedImages = sorted;
      }
      return sorted;
    },
    getUniqYear(sorted) {
      let years = [sorted[0].YEAR];
      for (let i = 1; i < sorted.length; i++) {
        let y = sorted[i].YEAR;
        if (y !== years[years.length - 1]) {
          years.push(y);
        }
      }
      this.uniqueYear = years;
      return years;
    },
    getTransform(idx) {
      let x = this.randomXPosition[idx];
      let y = this.randomYPosition[idx];
      let r = this.randRotation[idx];
      return `translate(${x},${y}) rotate(${r})`;
    },
    viewShuffle() {
      if (this.part1Vis === "visible") {
        this.refreshShuffle();
        console.log("shuffle!");
      } else {
        this.part1Vis = "visible";
        this.part2Vis = "hidden";
      }
      this.sortIcon = "sort_unselected";
    },
    viewSort() {
      this.part2Vis = "visible";
      this.part1Vis = "hidden";
      this.sortIcon = "sort_selected";
    },
    shiftTimeline(randomImage) {
      let year = randomImage.YEAR;
      let real_idx = this.uniqueYear.indexOf(year);
      // let real_idx = this.sortedImg.indexOf(randomImage);
      this.timelinePosition = 700 - real_idx * 200;
    },
    shift(idx) {
      this.displayImage = this.sortedImages[idx];
    },
    changeDisplay(idx) {
      this.currentY = event.clientY;
      this.currentX = event.clientX;
      this.currentIndex = idx;
      this.displayImage = this.imageData[idx + this.imageSliceIndex];
    },
    moveImage() {
      if (this.currentIndex != null) {
        let idx = this.currentIndex;
        let xOffset = event.clientX - this.currentX;
        this.randomXPosition[idx] += xOffset;
        let yOffset = event.clientY - this.currentY;
        this.randomYPosition[idx] += yOffset;
        this.currentX = event.clientX;
        this.currentY = event.clientY;
        this.$forceUpdate();
      }
    },
  },
};
</script>

<style scoped>
image {
  /*TODO: If you have time, maybe add more cursor changes 加油！*/
  cursor: pointer;
}
</style>
