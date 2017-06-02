<template>
  <div id="top">
	  <a @click="showSide" class="pull-left"><i class="fa fa-align-justify" aria-hidden="true"></i></a>
	  <a @click="logoC" class="logo">Hello {{username}}</a>
	  <a @click="menuV" class="pull-right">
		  <i class="fa fa-user" aria-hidden="true"></i> 
		  <i class="fa fa-angle-down" aria-hidden="true"></i>
      </a>
	  <ul class="menu" v-if="menuVisible">
	  	<li v-for="item in menu"><router-link :to="item.path">{{item.name}}</router-link></li>
	  </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'top',
  data () {
    return {
      msg: '',
      user: '',
      menu: [
         {'name': '個人資料', 'path': '/user'},
         {'name': '登出', 'path': '/login'}
      ],
      menuVisible: false
    }
  },
  props: ['username'],
  methods: {
  	menuV: function(){
  		if(this.menuVisible == false){
  			this.menuVisible = true
  		}else{this.menuVisible = false}
  	},
  	logoC: function(){
  		alert("你特麼點我幹嘛")
  	},
    ...mapActions([
      'showSide'
    ])
  }
}
</script>

<style scoped>
#top {
	min-height: 50px;
	text-align: center;
	border-bottom: 1px solid rgba(255,255,255,0.15)
}
#top > a {
	font-size: 20px;
	line-height: 50px;
	padding: 0 10px;
  cursor: pointer;
}
#top .logo {
	margin: 0 auto;
	font-size: 30px
}
#top .menu {
  right: 0;
  position: absolute;
  top: 51px;
  background: inherit
}
#top .menu li {
	width: 100px;
	height: 43px;
	line-height: 43px;
	font-size: 14px;
	border: 1px solid rgba(255,255,255,0.15);
	border-top: 0;
	z-index: 1;
	background: inherit
}

</style>
