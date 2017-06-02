<template>
  <div id="robot">
    <div v-if="tipVisible" class="tooltips">
        <div class="speech-bubble speech-bubble-right">
          <p>{{msg}}</p>
          <p>{{content}}</p>
        </div>
    </div>
    <canvas id="world"></canvas>
    <remote-js src="static/scripts/bakemono.js"></remote-js>
  </div>
</template>

<script>
export default {
  name: 'robot',
  data () {
    return {
      msg: '',
      content: ''
    }
  },
  watch: {
    nowtime(newVal,oldVal){
      this.timeTips(newVal)
    },
    msg(newVal,oldVal){
      this.$store.commit('tips', !this.tipVisible)
    },
  },
  mounted(){
  },
  methods: {
    timeTips(n){
      if(n == '09:10:00 am'){
         this.msg = '喂，起身返工啦'
         this.getJoke()
      }
      if(n == '12:04:00 pm'){
         this.msg = '夠鐘開飯啦！！！'
         this.content = ''
      }
      if(n == '06:00:00 pm'){
        this.msg = '落班啦，可以返歸啦'
        this.content = ''
      }
      if(n == '01:31:00 pm'){
        this.msg = '夠鐘起身啦'
        this.content = ''
      }
      if(n == '01:43:00 pm'){
        this.msg = 'test'
        this.getJoke()
      }
      if(n == '00:00:00 pm' || n == '12:00:00 am' || n == '00:00:00 am'){
        this.$router.replace('/')
      }
    },
    getJoke(){
      this.$http.get('https://bird.ioliu.cn/joke/rand?type=text').then((res) => {
          let c = res.data.data[0].content
          this.content = '今天笑话一则：'+c
      })
      .catch((res) => {
          console.log(res)
      })
    },
  },
  computed: {
    nowtime(){
      return this.$store.getters.isTime
    },
    tipVisible() {
      return this.$store.state.tipVisible
    },
  },
  components: {
   'remote-js': {
      render(createElement) {
        return createElement('script', { attrs: { type: 'text/javascript', src: this.src }})
      },
      props: {
        src: { type: String, required: true }
      }
    }
  }
}
</script>
<style scoped>
canvas {
  z-index: -1
}
.tooltips {
  position: fixed;
  bottom: 10%;
  right: 9%;
  z-index: 2001
}
.speech-bubble {
  position: relative;
  background-color: #000;
  width: 210px;
  height: 150px;
  overflow: hidden;
  overflow-y: auto;
  padding: 5px;
  font-size: 14px
}
.speech-bubble:after {
  content: '';
  color: transparent;
  position: absolute;
  width: 0;
  height: 0;
  border: 15px solid;
}
.speech-bubble-right:after {
  border-left-color: #000;
  left: 100%;
  bottom: 0;
  margin-top: -15px 
}
.speech-bubble p:last-child{
  margin-bottom: 10px
}
</style>
