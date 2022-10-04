<template>
  <div class="bg-offwhite dubois">
    <MobileTitleNav v-if="$isMobile" :title="metadata.title"></MobileTitleNav>
    <ChapterTitle
      v-else
      title="Between Data and Truth"
      subtitle='W.E.B. Du Bois&apos;s "Data Portraits"'
    ></ChapterTitle>
    <div class="md:my-10 lg:my-52 font-sans text-base lg:text-xl grid-wrapper">
      <SectionTitle title="Introduction" />
      <div class="space-y-6">
        <p>
          October 4th, 1899, was the first day of the fall term at Atlanta
          University (now Clark Atlanta University), where W.E.B. Du Bois had
          been teaching for the past two years--and a long two years they had
          been.
          <FootnoteReference footnoteNumber="1"
            >As indicated in the
            <span class="italic"
              >Catalogue of the Officers and Students of Atlanta University,
              1899-1900</span
            >, available online at:
            http://digitalcommons.auctr.edu/aucatalogs/31.
          </FootnoteReference>
          1 After relocating from Philadelphia to Atlanta in January 1897, Du
          Bois and his family were first required to contend with the overt
          racism of their everyday lives in the New South; and then, on May
          24th, 1899, the most profound of personal tragedies when the Du Bois’s
          two-year-old son, Burghardt, died after a brief illness. 2 But any
          small comfort that might have brought about by the start of the school
          year and the return to a teaching routine would soon evanesce as Du
          Bois found himself pulled into an unexpected new project, one that had
          the potential to put his research to date on a major international
          stage.
        </p>
        <p>
          On that very same day in October, Du Bois’s own college classmate, the
          lawyer and newspaper editor Thomas J. Calloway began the letter
          campaign that would result in a commitment from the federal government
          to fund an “Exhibit of American Negroes” at the 1900 Exposition
          Universelle in Paris, which was scheduled to open the following
          spring. With time running short, Calloway turned to Du Bois and one
          other man, Daniel A.P. Murray, the Assistant Librarian of Congress, to
          design and curate the show. While Murray tasked himself with
          assembling a set of books and pamphlets by Black writers to put on
          display, Du Bois saw his purview in more conceptual terms: to present
          “the history and present condition of a large group of human
          beings”—namely, the United States’s Black citizens—"in as systematic
          and compact a form as possible.” 3 This “systematic and compact form”
          was, of course, data visualization—a technique that he’d studied
          during his time in Germany, and which he’d perfected in his
          groundbreaking study, The Philadelphia Negro, published just one year
          earlier.
        </p>
      </div>
    </div>
    <ChapterFooter v-if="!$isMobile"> </ChapterFooter>
    <SiteFooter v-if="!$isMobile"></SiteFooter>
  </div>
</template>

<script>
import MobileTitleNav from "../components/page/chapter/nav/MobileTitleNav";
import ChapterTitle from "../components/page/chapter/nav/ChapterTitle";
import ChapterFooter from "../components/page/chapter/nav/ChapterFooter";
import SiteFooter from "../components/page/sitewide/SiteFooter";
import SectionTitle from "../components/page/chapter/content/section/SectionTitle";
import FootnoteReference from "../components/global/docs-inclusions/FootnoteReference";

export default {
  components: {
    FootnoteReference,
    MobileTitleNav,
    ChapterTitle,
    ChapterFooter,
    SiteFooter,
    SectionTitle,
  },
};
</script>

<style>
.dubois {
  --primaryColor: theme(colors.dubois_pri);
  --primaryColorText: "white";
}

.grid-wrapper {
  display: grid;
  grid-template-columns:
    1fr
    min(65ch, 100%)
    1fr;
}

.grid-wrapper > * {
  grid-column: 2;
}
</style>
