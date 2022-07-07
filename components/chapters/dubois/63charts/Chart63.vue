<template
  ><div
    class="col-span-10 2xl:col-span-14 2xl:col-end-13 flex w-full mx-auto bg-black"
  >
    <div class="button py-10 px-5 flex flex-col items-center">
      <button @click="selectedSet = 1" class="mb-4">
        <div v-bind:class="selectedSet == 1 ? 'hidden' : 'block'">
          <img src="@/assets/images/dubois/stack1.png" />
          <img src="@/assets/images/dubois/set1.png" />
        </div>
        <div v-bind:class="selectedSet == 1 ? 'block' : 'hidden'">
          <img src="@/assets/images/dubois/eyeframe.png" />
          <img src="@/assets/images/dubois/set1.png" />
        </div>
      </button>
      <button @click="selectedSet = 2">
        <div v-bind:class="selectedSet == 2 ? 'hidden' : 'block'">
          <img src="@/assets/images/dubois/stack2.png" />
          <img src="@/assets/images/dubois/set2.png" />
        </div>
        <div v-bind:class="selectedSet == 2 ? 'block' : 'hidden'">
          <img src="@/assets/images/dubois/eyeframe.png" />
          <img src="@/assets/images/dubois/set2.png" />
        </div>
      </button>
    </div>

    <div class="min-h-screen items-center justify-center">
      <div class="stack grid grid-cols-4 md:grid-cols-9 gap-4 py-5 px-20">
        <template v-for="(img, index) in imgs">
          <img
            v-bind:class="
              showImgIndex === index
                ? 'p-1 hover:border-white-700 border-solid border-white border-2 rounded-md'
                : ''
            "
            :src="img.img"
            :key="index"
            @click="updateShowImg(img, index)"
          />
        </template>
      </div>
      <div class="slides flex flex-nowrap py-5 px-40 content-center relative">
        <div>
          <img class="slide-img" src="@/assets/images/dubois/Slides.png" />

          <div class="flex align-middle justify-between">
            <div class="flex justify-center align-middle">
              <button>
                <img
                  style="width:27.5px;height:19.5px; margin-top:20px;"
                  src="@/assets/images/dubois/leftarrow.png"
                  @click="showNext"
                />
              </button>
            </div>

            <div>
              <p
                class="my-2 text-white-600 font-normal text-lg"
                style="color: white; text-align: center;margin-top:20px;"
              >
                {{ showImg.text }}
              </p>
              <p
                class="text-white-600 font-thin text-sm"
                style="color: white; text-align: center;"
              >
                {{ showImg.credit1 }}
              </p>
              <p
                class="text-white-600 font-thin text-sm"
                style="color: white; text-align: center;"
              >
                {{ showImg.credit2 }}
              </p>
              <p
                class="text-white-600 font-thin text-sm"
                style="color: white; text-align: center;"
              >
                {{ showImg.credit3 }}
              </p>
            </div>
            <div class="flex justify-center align-middle">
              <button>
                <img
                  style="width:27.5px;height:19.5px; margin-top:20px;"
                  src="@/assets/images/dubois/rightarrow.png"
                  @click="showNext"
                />
              </button>
            </div>
          </div>
        </div>
        <div>
          <img
            style="position: absolute; left: 50%;transform: translate(-50%, 0); width:283.7px;height:341.3px;"
            :src="showImg.img"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import img863 from "@/assets/images/dubois/863.jpeg";
import img864 from "@/assets/images/dubois/864.jpeg";
import img865 from "@/assets/images/dubois/865.jpeg";
import img866 from "@/assets/images/dubois/866.jpeg";
import img867 from "@/assets/images/dubois/867.jpeg";
import img868 from "@/assets/images/dubois/868.jpeg";
import img869 from "@/assets/images/dubois/869.jpeg";
import img870 from "@/assets/images/dubois/870.jpeg";
import img871 from "@/assets/images/dubois/871.jpeg";
import img872 from "@/assets/images/dubois/872.jpeg";
import img873 from "@/assets/images/dubois/873.jpeg";
import img874 from "@/assets/images/dubois/874.jpeg";
import img875 from "@/assets/images/dubois/875.jpeg";
import img876 from "@/assets/images/dubois/876.jpeg";
import img877 from "@/assets/images/dubois/877.jpeg";
import img878 from "@/assets/images/dubois/878.jpeg";
import img879 from "@/assets/images/dubois/879.jpeg";
import img880 from "@/assets/images/dubois/880.jpeg";
import img881 from "@/assets/images/dubois/881.jpeg";
import img882 from "@/assets/images/dubois/882.jpeg";
import img883 from "@/assets/images/dubois/883.jpeg";
import img884 from "@/assets/images/dubois/884.jpeg";
import img885 from "@/assets/images/dubois/885.jpeg";
import img886 from "@/assets/images/dubois/886.jpeg";
import img887 from "@/assets/images/dubois/887.jpeg";
import img888 from "@/assets/images/dubois/888.jpeg";
import img889 from "@/assets/images/dubois/889.jpeg";
import img890 from "@/assets/images/dubois/890.jpeg";
import img891 from "@/assets/images/dubois/891.jpeg";
import img892 from "@/assets/images/dubois/892.jpeg";
import img893 from "@/assets/images/dubois/893.jpeg";
import img894 from "@/assets/images/dubois/894.jpeg";
import img895 from "@/assets/images/dubois/895.jpeg";
import img896 from "@/assets/images/dubois/896.jpeg";
import img897 from "@/assets/images/dubois/897.jpeg";
import img898 from "@/assets/images/dubois/898.jpeg";

import img899 from "@/assets/images/dubois/899.jpeg";
import img900 from "@/assets/images/dubois/900.jpeg";
import img901 from "@/assets/images/dubois/901.jpeg";
import img902 from "@/assets/images/dubois/902.jpeg";
import img903 from "@/assets/images/dubois/903.jpeg";
import img904 from "@/assets/images/dubois/904.jpeg";
import img905 from "@/assets/images/dubois/905.jpeg";
import img906 from "@/assets/images/dubois/906.jpeg";
import img907 from "@/assets/images/dubois/907.jpeg";
import img908 from "@/assets/images/dubois/908.jpeg";
import img909 from "@/assets/images/dubois/909.jpeg";
import img910 from "@/assets/images/dubois/910.jpeg";
import img911 from "@/assets/images/dubois/911.jpeg";
import img912 from "@/assets/images/dubois/912.jpeg";
import img913 from "@/assets/images/dubois/913.jpeg";
import img914 from "@/assets/images/dubois/914.jpeg";
import img915 from "@/assets/images/dubois/915.jpeg";
import img916 from "@/assets/images/dubois/916.jpeg";
import img917 from "@/assets/images/dubois/917.jpeg";
import img918 from "@/assets/images/dubois/918.jpeg";
import img919 from "@/assets/images/dubois/919.jpeg";
import img920 from "@/assets/images/dubois/920.jpeg";
import img921 from "@/assets/images/dubois/921.jpeg";
import img922 from "@/assets/images/dubois/922.jpeg";
import img923 from "@/assets/images/dubois/923.jpeg";
import img924 from "@/assets/images/dubois/924.jpeg";
import img925 from "@/assets/images/dubois/925.jpeg";

export default {
  name: "Pictures",
  data() {
    return {
      selectedSet: 1,
      showImg: {
        img: img863,
        credit1: "Image courtesy of the Library of Congress,",
        credit2: "Prints & Photographs Division,",
        credit3: "LC-DIG-ppmsca-33863.",
        text: "The Georgia Negro: A Social Study"
      },
      showImgIndex: 0,
      setData: [
        {
          id: 1,
          imgs: [
            {
              img: img863,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33863.",
              text: "The Georgia Negro: A Social Study"
            },
            {
              img: img864,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33864.",
              text: `Relative Negro population of the states of the United States.`,
              date: "1900"
            },
            {
              img: img865,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33865.",
              text:
                "The states of the United States according to their Negro population."
            },
            {
              img: img866,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33866.",
              text: "Negro population of Georgia."
            },
            {
              img: img867,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33867.",
              text: "Negro population of Georgia by counties. 1890."
            },
            {
              img: img868,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33868.",
              text: "Negro population of Georgia by counties."
            },
            {
              img: img869,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33869.",
              text:
                "Comparative increase of white and colored population of Georgia."
            },
            {
              img: img870,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33870.",
              text: "Migration of Negroes. 1890."
            },
            {
              img: img871,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33871.",
              text: "Age distribution of Georgia Negroes compared with France."
            },
            {
              img: img872,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33872.",
              text: "Conjugal condition."
            },
            {
              img: img873,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33873.",
              text: "City and Rural Population. 1890."
            },
            {
              img: img874,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33874.",
              text: "Slaves and free Negroes."
            },
            {
              img: img875,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33875.",
              text:
                "Race amalgamation in Georgia based on a study of 40,000 individuals of Negro descent."
            },
            {
              img: img876,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33876.",
              text: "Illiteracy."
            },
            {
              img: img877,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33877.",
              text: "Negro children enrolled in the public schools."
            },
            {
              img: img878,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33878.",
              text: "Negro teachers in Georgia public schools."
            },
            {
              img: img879,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33879.",
              text:
                "Number of Negro students taking the various courses of study offered in Georgia schools."
            },
            {
              img: img880,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33880.",
              text: "Value of land owned by Georgia Negroes."
            },
            {
              img: img881,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33881.",
              text: "Acres of land owned by Negroes in Georgia."
            },
            {
              img: img882,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33882.",
              text: "Land owned by Negroes in Georgia, U.S.A. 1870-1900."
            },
            {
              img: img883,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33883.",
              text:
                "Valuation of town and city property owned by Georgia Negroes."
            },
            {
              img: img884,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33884.",
              text:
                "Assessed Valuation of All Taxable Property Owned by Georgia Negroes."
            },
            {
              img: img885,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33885.",
              text: "Negro property in two cities of Georgia."
            },
            {
              img: img886,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33886.",
              text: "Value of farming tools."
            },
            {
              img: img887,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33887.",
              text:
                "Assessed Value of Household and Kitchen Furniture Owned by Georgia Negroes."
            },
            {
              img: img888,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33888.",
              text: "Occupations of Georgia Negroes. Males over 10."
            },
            {
              img: img889,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33889.",
              text: "Occupations of Negroes and whites in Georgia."
            },
            {
              img: img890,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33890.",
              text: "Occupations."
            },
            {
              img: img891,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33891.",
              text: "Occupations and income."
            },
            {
              img: img892,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33892.",
              text:
                "Condition of 300 Negro farm tenants after 1 year's toil, 1898."
            },
            {
              img: img893,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33893.",
              text:
                "Income and expenditure of 150 Negro families in Atlanta, Ga., U.S.A."
            },
            {
              img: img894,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33894.",
              text: "Family budgets."
            },
            {
              img: img895,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33895.",
              text: "Family budgets."
            },
            {
              img: img896,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33896.",
              text:
                "Albany, Dougherty County, Ga. Distribution of 2,500 Negro inhabitants."
            },
            {
              img: img897,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33897.",
              text: "McIntosh County, Georgia."
            },
            {
              img: img898,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33898.",
              text: "Darien, McIntosh Co., GA"
            }
          ]
        },
        {
          id: 2,
          imgs: [
            {
              img: img899,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33899.",
              text:
                "A series of statistical charts illustrating the condition of the descendants of former African slaves now in residence in the United States of America"
            },
            {
              img: img900,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33900.",
              text: "Distribution of Negroes in the United States."
            },
            {
              img: img901,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33901.",
              text:
                "Increase of the Negro population in the United States of America"
            },
            {
              img: img902,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33902.",
              text:
                "Comparative rate of increase of the white and Negro elements of the population of the United States"
            },
            {
              img: img903,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33903.",
              text:
                "Negro Population in the United States Compared with the Total Popuation of Other Countries."
            },
            {
              img: img904,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33904.",
              text:
                "Proportion of Negroes in the total population of the United States"
            },
            {
              img: img905,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33905.",
              text: "Occupations in which American Negroes are engaged"
            },
            {
              img: img906,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33906.",
              text:
                "Proportion of Whites and Negroes in the different classes of occupation in the United States"
            },
            {
              img: img907,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33907.",
              text:
                "Occupations in which 10,000 or more American Negroes are engaged"
            },
            {
              img: img908,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33908.",
              text:
                "Number of Negro teachers in the public schools of the United States"
            },
            {
              img: img909,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33909.",
              text:
                "Illiteracy of the American Negroes compared with that of other nations."
            },
            {
              img: img910,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33910.",
              text:
                "Enrollment in the Negro common schools of the former slave states of the United States."
            },
            {
              img: img911,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33911.",
              text:
                "Proportion of total Negro children of school age who are enrolled in the public schools."
            },
            {
              img: img912,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33912.",
              text:
                "The Rise of the Negroes from Slavery to Freedom in One Generation"
            },
            {
              img: img913,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33913.",
              text: "Proportion of freemen and slaves among American Negroes."
            },
            {
              img: img914,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33914.",
              text:
                "City and rural population among American Negroes in the former slave states."
            },
            {
              img: img915,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33915.",
              text:
                "Conjugal condition of American Negroes according to age periods."
            },
            {
              img: img916,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33916.",
              text:
                "The Amalgamation of the White and Black elements of the population in the United States."
            },
            {
              img: img917,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33917.",
              text:
                "Assessed value of property owned by Negroes in three states of the United States."
            },
            {
              img: img918,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33918.",
              text: "Negro landholders in various states of the United States."
            },
            {
              img: img919,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33919.",
              text: "Negro business men in the United States."
            },
            {
              img: img920,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33920.",
              text: "Pauperism among American Negroes."
            },
            {
              img: img921,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33921.",
              text: "Mortality of American Negroes."
            },
            {
              img: img922,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33922.",
              text: "Crime among American Negroes."
            },
            {
              img: img923,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33923.",
              text: "American Negro newspapers and periodicals."
            },
            {
              img: img924,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33924.",
              text: "Religion of American Negroes."
            },
            {
              img: img925,
              credit1: "Image courtesy of the Library of Congress,",
              credit2: "Prints & Photographs Division,",
              credit3: "LC-DIG-ppmsca-33925.",
              text: "Statistics of Negro church organizations."
            }
          ]
        }
      ]
    };
  },
  computed: {
    imgs() {
      return this.setData.find(v => v.id == this.selectedSet).imgs;
    }
  },

  methods: {
    updateShowImg(data, index) {
      this.showImg = data;
      this.showImgIndex = index;
    },

    showPre() {
      if (this.showImgIndex > 0) {
        this.showImgIndex -= 1;
        this.showImg = this.imgs.find((v, i) => i == this.showImgIndex);
      }
    },

    showNext() {
      console.log(this.imgs.length);
      if (this.imgs.length > this.showImgIndex) {
        this.showImgIndex += 1;
        this.showImg = this.imgs.find((v, i) => i == this.showImgIndex);
      }
    }
  }
};
</script>
<style scoped>
.stack img {
  width: 85.1px;
  height: 102.4px;
  cursor: pointer;
}
.button img {
  width: 80px;
  padding: 6px;
}
.slides img {
  width: 800px;
  height: 334px;
  object-fit: contain;
}
.slide-img {
  width: 800px;
  height: 334px;
  object-fit: cover;
}
</style>
