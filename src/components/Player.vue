<template>
  <div id="player">
    <div class="mainpanel" v-if="playVisiable">
       <div class="topbar">
         <span class="pull-left">網易云音樂</span>
         <i class="fa fa-search pull-right" aria-hidden="true" @click="searchfor"></i>
         <input type="text" class="pull-right" v-model="searchname" @keyup.13="searchfor" placeholder="搜尋歌曲"/>
       </div>
       <div class="content">
         <div class="result" v-if="showtype == 0">
            <table>
              <thead>
                <tr>
                  <th>音樂標題</th>
                  <th>歌手</th>
                  <th>專輯</th>
                  <th>操作</th>
                </tr>
              </thead>
            </table>
            <table>
              <tbody>
                <tr v-for="item in searchresult">
                  <td>{{item.name}}</td>
                  <td>{{item.artists[0].name}}</td>
                  <td>{{item.album.name}}</td>
                  <td><i class="fa fa-play" aria-hidden="true" @click="playadd(item.id,item.name,item.artists[0].name,item.album.name,item.album.picUrl,item.mp3Url)"></i> <i class="fa fa-download" aria-hidden="true" @click="songdown(item.mp3Url)"></i></td>
                </tr>
              </tbody>
            </table>
         </div>
         <div class="playlist" v-if="showtype == 1">
           <div class="btn-group">
             <button type="button" :class="[loop ? '': 'looptrue']" @click="changeloop(1)">列表循環</button>
             <button type="button" :class="[loop ? 'looptrue': '']" @click="changeloop(0)">單曲循環</button>
             <button type="button" @click="alldel">清空列表</button>
           </div>
           <ul>
             <li v-for="(item, index) of playlist" class="">
                <span @click="toggleMusic(index)">{{item.name}}</span><span @click="toggleMusic(index)">{{item.singer}}</span><i class="fa fa-times" @click="del(item.index)"></i>
             </li>
           </ul>
         </div>l
         <div class="songinfo" v-if="showtype == 2"></div>
         <div class="albuminfo" v-if="showtype == 3"></div>
       </div>
    </div>
    <div class="ctrlpanel">
       <button type="button" class="boss pull-left" @click="playshow"><i class="fa fa-play-circle" aria-hidden="true"></i></button>
       <div class="playbar pull-left">
          <img :src="audio.img" alt="singer" class="pull-left" />
          <div class="content pull-left">
            <p>{{audio.name}}</p>
            <p>{{audio.singer}}</p>
          </div>
          <div class="pull-right">
            <i class="fa fa-list" aria-hidden="true" @click="showlist"></i>
            <i class="fa fa-step-backward" aria-hidden="true" @click="prev"></i>
            <i :class="'fa fa-'+[isPlaying ? 'pause' : 'play']" @click="play" aria-hidden="true"></i>
            <i class="fa fa-step-forward" aria-hidden="true" @click="next"></i>
          </div>
       </div>

       <div class="playline">
          <div class="volume">
            <i :class="'fa fa-'+[isVoice ? 'volume-up' : 'volume-off']" class="fa fa-volume-up" aria-hidden="true" @click="forVoice"></i>
          </div>
          <div class="progress">
            <div @click="changeTime($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)" ref="progressBar" class="progress-bar">
              <div ref="now" :style="{width:(nativeAudio.currentTime/nativeAudio.duration).toFixed(3)*100 + '%'}" class="now"></div>
            </div>
          </div>
          <div class="time">
            <span>{{now}}</span><span>/</span><span>{{totalTime}}</span>
          </div>
          <audio :src="audio.url" ref="audio" :autoplay="isPlaying">
          您的浏览器不支持 audio 标签。
          </audio>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'player',
  data () {
    return {
      msg: '',
      searchname: '',
      searchresult: '',
      showtype: 0,
      playVisiable: false,
      loop: true,

      totalTime: '00:00',
      nativeAudio: {},
      now: '00:00',
    }
  },
  beforeCreate() {
    this.$store.dispatch('getData')
    this.$store.dispatch('getSong')
  },
  mounted(){
    this.$store.commit('findDOM', {name: 'audio', dom: this.$refs.audio})
    this.$refs.audio.addEventListener('ended', () => { 
      if(this.loop == true){
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
      }else{
        this.next()
      }
    })
    this.$refs.audio.addEventListener('error', () => { this.next(); })
    this.nativeAudio = document.querySelector('audio')
    this.nativeAudio.addEventListener('play', () => {
      this.$store.dispatch('saveSong')
      this.totalTime = this.transformTime(this.nativeAudio.duration)
      this.now = this.transformTime(this.nativeAudio.currentTime)
      setInterval(() => {
        this.now = this.transformTime(this.nativeAudio.currentTime)
      }, 10);
      this.now = this.transformTime(this.nativeAudio.currentTime)
      
    })
  },
  computed: {
    playlist() {
      return this.$store.state.playlist;
    },
    isPlaying() {
      return this.$store.state.isPlaying;
    },
    DOM() {
      return this.$store.state.DOM;
    },
    audio() {
      return this.$store.state.audio;
    },
    isVoice() {
      return this.$store.state.isVoice;
    },
  },
  watch: {
    playlist: {
      handler(val, oldVal) {
        localStorage.playlist = JSON.stringify(val)
      },
      deep: true
    },
  },
  methods: {
    playshow(){
      if(this.playVisiable == false){
        this.playVisiable = true
      }else{
        this.playVisiable = false
      }
    },
    play(){
      this.$store.commit('play', !this.isPlaying)
      !this.isPlaying ? this.DOM.audio.pause() : this.DOM.audio.play();
    },
    searchfor(){
      this.$http.post('https://bird.ioliu.cn/v1/?url=music.163.com/api/search/pc',{s:this.searchname,offset: 0,limit: 10,type:1}).then((res) => {
          let result = res.data.result.songs
          this.searchresult = result
      })
      .catch((res) => {
          console.log(res)
      })
      this.showtype = 0
    },
    songdown(a){
      window.location.href = a
    },
    playadd(a,b,c,d,e,f){
      let all = {id: a,name: b,singer: c,album: d,img: e,url: f}
      this.$store.commit('playMusic',all)
      this.$store.commit('addMusic',all)
    },
    toggleMusic(index) {
      if (this.$store.state.audio.index === index) {
        this.DOM.audio.paused ? this.DOM.audio.play() : this.DOM.audio.pause();
        this.$store.commit('play', !this.isPlaying);
      } else {
        this.DOM.audio.play();
        this.$store.commit('play', true);
      }
      this.$store.commit('toggleMusic', index);

    },
    showlist(){
      this.showtype = 1
    },
    // 删除音乐
    alldel(){
      this.$store.dispatch('clearData')
    },
    del(index) {
      this.$store.commit('del', index);
    },
    forVoice(){
      this.$store.commit('voice', !this.isVoice)
      !this.isVoice ? this.DOM.audio.muted = true : this.DOM.audio.muted = false
    },
    transformTime(seconds) {
      let m, s;
      m = Math.floor(seconds / 60);
      m = m.toString().length == 1 ? ('0' + m) : m;
      s = Math.floor(seconds - 60 * m);
      s = s.toString().length == 1 ? ('0' + s) : s;
      return m + ':' + s;
    },
    prev() {
      this.audio.index = this.audio.index === 0 ? this.playlist.length - 1 : (--this.audio.index);
      this.$store.commit('toggleMusic', this.audio.index);
    },
    next() {
      this.audio.index = this.audio.index === this.playlist.length - 1 ? 0 : (++this.audio.index);
      this.$store.commit('toggleMusic', this.audio.index);
    },
    changeloop(a){
      if(a == 1){this.loop = true}else{this.loop = false}
    },
    changeTime(event) {
      let progressBar = this.$refs.progressBar;
      let coordStart = progressBar.getBoundingClientRect().left;
      let coordEnd = event.pageX;
      this.nativeAudio.currentTime = (coordEnd - coordStart) / progressBar.offsetWidth * this.nativeAudio.duration;
      this.now = this.nativeAudio.currentTime;
      this.nativeAudio.play();
      this.$store.commit('play', true);
    },
    touchMove(event) {
      let progressBar = this.$refs.progressBar;
      let coordStart = progressBar.getBoundingClientRect().left;
      let coordEnd = event.touches[0].pageX;
      this.$refs.now.style.width = ((coordEnd - coordStart) / progressBar.offsetWidth).toFixed(3) * 100 + '%';
    },
    touchEnd(event) {
      this.nativeAudio.currentTime = this.$refs.now.style.width.replace('%', '')/100 * this.nativeAudio.duration;
      this.now = this.nativeAudio.currentTime;
      this.nativeAudio.play();
      this.$store.commit('play', true);
    },
  }
}
</script>

<style scoped>
#player {
  position: fixed;
  z-index: 2000;
  left: 15px;
  bottom: 30px;
}
#player button.boss {
  width: 40px;
  height: 40px;
  background-color: rgba(255,255,255,1);
  border: 0;
  cursor: pointer
}
#player button.boss i {
  color: #CE3D3E;
  font-size: 30px;
}
#player .ctrlpanel {

}
#player .playbar {
  height: 40px;
  width: 270px;
  background-color: rgba(255,255,255,0.8);
}
#player .playbar img {
  width: 34px;
  height: 34px;
  margin: 3px;
}
#player .playbar .content {
}
#player .playbar .content p:first-child {
  font-size: 14px;
  color: #000
}
#player .playbar .content p:last-child {
  color: #888;
}
#player .playbar i {
  font-size: 20px;
  line-height: 40px;
  color: #CE3D3E;
  margin-right: 10px;
  cursor: pointer
}

#player .ctrlpanel {
  position: relative;
  overflow: hidden;
  width: 310px
}
#player .mainpanel {
  left: 0;
  right: 0;
  width: 310px;
  height: 400px;
  border-bottom: 1px solid #ccc;
  background-color: rgba(255,255,255,0.9);
}
#player .mainpanel .topbar {
  background-color: #CE3D3E;
  height: 40px;
  line-height: 40px;
  padding: 0 5px;
  font-size: 18px
}
#player .mainpanel .topbar > i {
  display: inline-block;
  line-height: 40px;
}
#player .mainpanel .topbar > input {
  width: 100px;
  margin: 0 auto;
  vertical-align: middle;
  margin-top: 10px;
  border: 1px solid #ccc;
  font-size: 12px;
  color: #000
}
.mainpanel .content {
  height: 100%
}
.mainpanel .content table {
  width: 100%;
  color: #000;
  text-align: center;
  border-spacing: 0;
  border-collapse: collapse;
}
.mainpanel .content th,.mainpanel .content td {
  padding: 5px;
  width: 25%;
  cursor: pointer
}
.mainpanel .content table thead > tr > th {
  border: 1px solid #000
}
.mainpanel .content .playlist ul {
  height: 100%;
  max-height: 320px;
  overflow-y: auto
}
.mainpanel .content .playlist ul li {
  width: 100%
}
.mainpanel .content .playlist ul li:nth-child(odd) {
  background-color: rgba(190,190,190,0.5);
}
.mainpanel .content .playlist ul li span {
  display: inline-block;
  width: 45%;
  text-align: center;
  color: #888;
  font-size: 14px;
  padding: 5px 0
}
.mainpanel .content .playlist ul li i {
  font-size: 14px;
  color: #CE3D3E;
  text-align: center;
  cursor: pointer
}
.mainpanel .content .playlist .btn-group {
  text-align: center
}
.mainpanel .content .playlist .btn-group button {
  position: relative;
  padding: 5px;
  background-color: rgba(206, 61, 62, 0.8);
  margin: 5px 0;
  border: 0;
  color: #fff;
  cursor: pointer
}

#player .playline {
  width: 310px;
  overflow: hidden;
  background-color: rgba(206, 61, 62, 0.8);
  float: left;
}
#player .playline .volume {
  width: 40px;
  float: left;
  text-align: center
}
#player .playline .progress {
  width: 190px;
  float: left;
  display: inline-block
}
#player .playline .progress-bar {
  position: relative;
  width: 100%;
  height: 5px;
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.5);
  vertical-align: 2px;
  border-radius: 3px;
  cursor: pointer;
}
#player .playline .progress-bar .now {
  position: absolute;
  left: 0;
  display: inline-block;
  max-width: 100%;
  width: 100%;
  height: 100%;
  background-color: #31c27c;
}
#player .playline .progress-bar .now::after {
  content: "";
  position: absolute;
  left: 97%;
  width: 10px;
  height: 10px;
  top: -2.5px;
  border-radius: 5px;
  background-color: #fff
}
#player .playline .time {
  width: 80px;
  float: left;
  text-align: center
}
.looptrue {
  background-color: #888 !important;
  cursor: default
}
table tbody {
  display: block;
  height: 330px;
  overflow-y: scroll;
}

table thead, tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

table thead {
  width: calc( 100% - 1em )
}

</style>
