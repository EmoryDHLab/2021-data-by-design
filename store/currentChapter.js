import Vue from "vue";

export const state = () => ({
  chapterStateInitialized: false,
  chapterState: { _mutationCount: -1 },
  renderGroup: 0
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
    if (state.renderGroup > 0) {
      state.renderGroup--;
    }
  },

  nextSection (state) {
    state.renderGroup++;
  },

}
