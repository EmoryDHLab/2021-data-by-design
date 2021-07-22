import Vue from "vue";

export const state = () => ({
  chapterStateInitialized: false,
  chapterState: { _mutationCount: -1 },
  pairsection: 0
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

  prevSection (state) {
    if (state.pairsection > 0) {
      state.pairsection--;
    }
  },

  nextSection (state) {
    state.pairsection++;
  },

}
