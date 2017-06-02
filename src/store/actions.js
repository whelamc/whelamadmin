export default {
  showSide({ commit }) {
  	commit('showSide', true)
  },
  hiddenSide({ commit }) {
  	commit('showSide', false)
  },
  initLogin({ commit }) {
  	commit('initLogin', true)
  },
  initLogout({ commit }) {
  	commit('initLogin', false)
  },
  getData({ commit,state }) {
    state.playlist = JSON.parse(localStorage.playlist)
  },
  getSong({ commit,state }) {
    state.audio = JSON.parse(localStorage.audio)
  },
  saveSong({ commit,state }) {
    localStorage.audio = JSON.stringify(state.audio)
  },
  clearData({ commit,state }) {
    state.playlist = []
    localStorage.audio = JSON.stringify(state.playlist)
  },
}