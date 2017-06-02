<template>
  <div id="index">
  	<top :username="username"></top>	
  	<lead></lead>
  	<wrap></wrap>
  	<side v-if="showSide"></side>
  	<bot :username="username" :version="version" :title="title"></bot>
    <player></player>
    <robot></robot>
  </div>
</template>

<script>
import top from '@/components/Top'
import lead from '@/components/Lead'
import bot from '@/components/Bottom'
import wrap from '@/components/Wrap'
import side from '@/components/Sidebar'
import player from '@/components/Player'
import robot from '@/components/Robot'

import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'index',
  data () {
    return {
      msg: '',
      title: 'Admin',
      username: 'Whelam',
      version: '5.2.0',
      avater: 'static/images/avater.jpg',
    }
  },
  created(){
  },
  methods: {
	  ...mapActions([
	    'hiddenSide'
	  ]),
	  changeParent(){
	  	this.$emit('changeTheme')
	  }
  },
  computed: {
	  ...mapGetters([
	    'showSide' 
	  ])
  },
  components: { top,lead,bot,wrap,side,player,robot }
}
</script>

<style scoped>
#index {
  position: relative;
  overflow: hidden;
  z-index: 0
}
</style>
