import Vue from "vue";

export const state = () => ({
  chapterStateInitialized: false,
  chapterState: { _mutationCount: -1 }
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
  }
}
