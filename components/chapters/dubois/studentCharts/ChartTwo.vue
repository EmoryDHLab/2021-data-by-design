<template>
  <div class="contents">
    <div
      class="col-span-8 2xl:col-span-10 col-start-2 2xl:col-start-3 mt-6 flex flex-col font-duboisWide uppercase"
    >
      <p class="font-bold xl:text-3xl 2xl:text-4xl text-2xl tracking-wider">
        &emsp;&emsp; A series of statistical charts, illustrating the condition
        of the descendants of former african slaves now resident in the united
        states of america.
      </p>
      <p class="font-light text-red-500 2xl:text-3xl text-xl">
        &emsp;&emsp;une série de cartes est diagrammes statistiques montrant la
        condition preésente des descendants des anciens esclaves africans
        actuellment érablis dans les etas unis d' amérique.
      </p>
    </div>
    <div class="contents">
      <div
        class="col-span-2 2xl:col-span-2 col-start-2 2xl:col-start-3 mt-6 flex items-center font-duboisNarrow uppercase text-center 2xl:text-xl text-lg"
      >
        <p class="2xl:text-2xl text-lg">
          prepared and executed by negro students under the direction of atlanta
          university, atlanta, ga, united states of america.
        </p>
      </div>
      <div
        class="col-span-4 2xl:col-span-6 col-start-4 2xl:col-start-5 mt-6 flex"
      >
        <USAMap />
      </div>
      <div
        class="col-span-2 2xl:col-span-2 col-start-8 2xl:col-start-11 mt-6 flex items-center font-duboisNarrow font-light uppercase text-center"
      >
        <p class="text-red-500 2xl:text-2xl text-lg">
          préparées et exxecutées par des étudiants nègres sous la direction de
          l' universitê d' atlanta, etat de gêorgie, etas unis d' amerique.
        </p>
      </div>
    </div>
    <div class="col-span-10 2xl:col-span-14 2xl:col-end-13 flex justify-center">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M13.94 27.108C21.248 27.108 27.116 21.204 27.116 13.932C27.116 6.768 21.356 0.827998 13.94 0.827998C6.74 0.827998 0.836 6.516 0.836 13.932C0.836 21.204 6.704 27.108 13.94 27.108ZM6.812 23.58L9.548 15.444L2.924 10.98H11.06L13.94 2.196L16.892 10.98H25.028L18.404 15.444L21.14 23.58L13.94 18.396L6.812 23.58Z"
          fill="black"
        />
      </svg>
      <p class="font-dubois uppercase">Atlanta University</p>
    </div>
    <div
      class="col-span-8 2xl:col-span-10 col-start-2 2xl:col-start-3 mt-6 flex flex-col font-dubois uppercase text-center"
    >
      <p>
        The university was founded in 1867. It has instructed 6000 negro
        students.
      </p>
      <p class="text-red-500">
        L' université a été fondée en 1867. Elle a donné l'' instruction a' 6000
        étudiants negres.
      </p>
      <p>It has graduated 330 negroes among whom are:</p>
      <p class="text-red-500">Elle a délivre des diplomes a 330 nègres dont:</p>
    </div>
    <div
      class="col-span-3 2xl:col-span-3 col-start-1 col-end-4 2xl:col-start-2 mt-6 flex flex-col justify-center"
    >
      <Legend :legendList="studentData.categories"></Legend>
    </div>
    <PieChart :studentData="studentData" />
    <div
      class="col-span-8 2xl:col-span-10 col-start-2 2xl:col-start-3 mt-6 font-dubois font-bold uppercase"
    >
      <p>
        THE UNIVERSITY HAS 20 PROFESSORS AND INSTRUCTORS AND 250 STUDENTS AT
        PRESENT. IT HAS FIVE BUILDINGS, 60 ACRES OF CAMPUS. AND A LIBRARY OF
        11000 VOLUMES IT AIMS TO RAISE AND CIVILIZE THE SONS OF THE FREEDMEN BY
        TRAINING THEIR MORE CAPABLE MEMBERS IN THE LIBERAL ARTS ACCORDING TO THE
        BEST STANDARDS OF THE DAY.
      </p>
      <p>
        THE PROPER ACCOMPLISHMENT OF THIS WORK DEMANDS AN ENDOWMENT FUND OF
        $500,000.
      </p>
      <p>
        L UNIVERSITÉ A ACTUELLEMENT 20 PROFESSEURS ET INSTRUCTEURS ET 250
        ÉTUDIANTS. ELLE EST COMPOSÉE DE CINO BÂTIMENTS, 60 ACRES (ENVIRON 26
        HECTARES DE TERRAIN SERVANT DE COUR ET DE CHAMP DE RÉCRÉATION ET DUNE
        BIBLIOTHEQUE CONTENANT 11000 VOLUMES. SON BUT EST D'ÉLEVER ET DE
        CIVILISER LES FILS DES NEGRES AFFRANCHIS EN DONNANT AUX MEUX DOUÉS UNE
        ÉDUCATION DANS LES ARTS LIBÉRAUX EN ACCORD AVEC LES IDÉES LES PLUS
        PROGRESSISTES DE ÉPOQUE.
      </p>
      <p>
        L'ACCOMPLISSEMENT DE CETTE CEUVRE DEMANDE UNE DOTATION DE $500000
        2,500,000 FRANCS).
      </p>
    </div>
  </div>
</template>

<script>
import Legend from "./Legend";
import PieChart from "./PieChart";
import studentData from "~/api/static/data/chartOneGrouped.json";
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
