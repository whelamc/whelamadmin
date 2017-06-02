<template>
  <div id="side" @click="hiddenSide">
    <div class="sidebar">
      <p>换肤功能</p>
      <ul>
        <li v-for="item in thelist">
          <a @click="changeT(item.name)">
            <img :src="item.bgurl" :alt="item.name" />
            <p>{{item.name}}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'side',
  data () {
    return {
      msg: '',
      thisvisible: true,
      thelist: [
        {'name': 'skin-violate','bgurl': 'static/images/skin-violate.jpg'},
        {'name': 'skin-blue','bgurl': 'static/images/skin-blue.jpg'},
        {'name': 'skin-chrome','bgurl': 'static/images/skin-chrome.jpg'},
        {'name': 'skin-city','bgurl': 'static/images/skin-city.jpg'},
        {'name': 'skin-cloth','bgurl': 'static/images/skin-cloth.jpg'},
        {'name': 'skin-greenish','bgurl': 'static/images/skin-greenish.jpg'},
        {'name': 'skin-kiwi','bgurl': 'static/images/skin-kiwi.jpg'},
        {'name': 'skin-lights','bgurl': 'static/images/skin-lights.jpg'},
        {'name': 'skin-night','bgurl': 'static/images/skin-night.jpg'},
        {'name': 'skin-ocean','bgurl': 'static/images/skin-ocean.jpg'},
        {'name': 'skin-sunny','bgurl': 'static/images/skin-sunny.jpg'},
        {'name': 'skin-sunset','bgurl': 'static/images/skin-sunset.jpg'},
        {'name': 'skin-tectile','bgurl': 'static/images/skin-tectile.jpg'},
        {'name': 'skin-yellow','bgurl': 'static/images/skin-yellow.jpg'}
      ]
    }
  },
  created(){
  },
  methods: {
    changeT(a){
      window.localStorage.setItem("wtheme", a)
      this.$store.dispatch('hiddenSide')
    },
    ...mapActions([
      'hiddenSide'
    ])
  }
}
</script>

<style scoped>
#side {
  position: fixed;
  background: rgba(0,0,0,0.5);
  z-index: 2000;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
}
#side .sidebar {
  width: 20%;
  min-width: 100px;
  background: rgba(0,0,0,0.8);
  height: 100%;
  overflow-y: auto;
  text-align: center;
  position: absolute;
  z-index: 2001;
}
#side .sidebar > p {
  border-bottom: 1px solid #ccc;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 20px
}
#side .sidebar > ul > li {
  padding: 15px 5px;
  overflow: hidden
}
#side .sidebar > ul > li img{
  width: 100%
}
</style>
