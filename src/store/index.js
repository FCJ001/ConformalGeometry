import { createStore } from 'vuex'

export default createStore({
  state: {
    isAdmin: false,
    // 歌曲播放状态
    isplaying: true,
    // 目录显示与否
    catelogue: true
  },
  mutations: {
    isAdmin (state, data) {
      state.isAdmin = data
    },
    setPlaying (state, data) {
      state.playing = data
    },
    isCatelogue (state, data) {
      state.catelogue = data
    },
    isplaying (state, data) {
      state.isplaying = data
    }
  },
  actions: {
  },
  modules: {
  }

})
