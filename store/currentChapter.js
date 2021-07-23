import Vue from "vue";

export const state = () => ({
  chapterStateInitialized: false,
  chapterState: { _mutationCount: -1 },
  sections: [],
  currentRenderGroup: 0,
  currentSection: 0,
})

export const mutations = {
  initializeChapterState(state, {initialState}) {
    if (!state.chapterStateInitialized) {
      Object.keys(initialState).forEach(key => Vue.set(state.chapterState, key, initialState[key]));
      state.chapterState._mutationCount++;
      state.chapterStateInitialized = true;
    }
  },

  updateChapterState(state, {key, value}) {
    state.chapterState[key] = value;
    state.chapterState._mutationCount++;
  },

  initializeSections(state, {sectionsData}) {
    state.sections =
      sectionsData.map(sectionData => {
        return sectionData.renderGroups.length;
      })
  },

  prevSection (state) {
    if (state.currentRenderGroup > 0) {
      state.currentRenderGroup--;
    } else if (state.currentSection > 0) {
      state.currentSection--;
      state.currentRenderGroup = state.sections[state.currentSection] - 1;
    }
  },

  nextSection (state) {
    if (state.sections[state.currentSection] >= state.currentRenderGroup - 1) {
      if (state.sections + 1 == state.sections.length) {
        return false;
      }
      state.currentRenderGroup = 0;
      state.sections++;
    }
    state.currentRenderGroup++;
  },

}
