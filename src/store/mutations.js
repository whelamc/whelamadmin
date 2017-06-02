export default {
  showSide(state, bool) {
  	state.showSide = bool
  },
  hiddenSide(state, bool) {
  	state.showSide = bool
  },
  initLogin(state, bool) {
  	state.initLogin = bool
  },
  initLogout(state, bool) {
  	state.initLogin = bool
  },
  isTime(state, payload) {
    state.isTime = payload
  },
  tips(state, flag) {
    state.tipVisible = flag
    if(flag == true){
    setTimeout(() => {state.tipVisible = false},180000)
    }
  },
  play(state, flag) {
    state.isPlaying = flag
  },
  voice(state, flag) {
    state.isVoice = flag
  },
  findDOM(state, payload) {
    state.DOM[payload.name] = payload.dom
  },
  playMusic(state, payload) {
    state.audio.name = payload.name;
    state.audio.url = payload.url;
    state.audio.img = payload.img;
    state.audio.id = payload.id;
    state.audio.singer = payload.singer
    state.isPlaying = true
  },
  addMusic(state, payload) {
      for (let music of state.playlist) {
        if (JSON.stringify(music) === JSON.stringify(payload)) {
          return;
        }
      }
      state.playlist.unshift(payload)
  },
  toggleMusic(state, index) {
      state.audio.name = state.playlist[index].name;
      state.audio.src = state.playlist[index].src;
      state.audio.img = state.playlist[index].img;
      state.audio.url = state.playlist[index].url;
      state.audio.id = state.playlist[index].id;
      state.audio.singer = state.playlist[index].singer;
      state.audio.index = index;
  },
  del(state, index) {
    if (state.playlist.length === 0) {
      return;
    }
    state.playlist.splice(index, 1);
  },
}