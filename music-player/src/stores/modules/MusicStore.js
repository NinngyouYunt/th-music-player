const state = {
  progress: 0,
  volume: 50
};

const mutations = {
  increaseProgress(state, increaseBy) {
    state.increaseBy += increaseBy;
  },
  setProgress(state, newProgress) {
    state.progress = newProgress;
  },
  setVolume(state, newVolume) {
    state.volume = newVolume;
  }
};

const actions = {
  updateProgress(context, { amount }) {
    context.commit("setProgress", amount);
  }
};

export default {
  state,
  mutations,
  actions
};
