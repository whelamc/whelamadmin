<template>
  <div id="user">
    <div class="user-page">
      <img :src="avater" alt="" />
      <p>{{username}}</p>
      <button type="button" @click="goback">返回</button>
    </div>
    <bot :username="username" :version="version" :title="title"></bot>
  </div>
</template>

<script>
import bot from '@/components/Bottom'
export default {
  name: 'user',
  data () {
    return {
      msg: 'user page',
      title: 'Admin',
      username: 'Whelam',
      version: '5.2.0',
      avater: 'static/images/avater.jpg',
      name: '',
      password: ''
    }
  },
  created(){
  },
  methods: {
    goback(){
      this.$router.go(-1)
    }
  },
  components: { bot }
}
</script>

<style scoped>
.user-page {
  position: absolute; 
  top: 30%; 
  left: 50%;
  -ms-transform: translateY(-30%);   /* IE 9 */
  -moz-transform: translateY(-30%);  /* Firefox */
  -webkit-transform: translateY(-30%); /* Safari 和 Chrome */
  -o-transform: translateY(-30%);  /* Opera */
  transform: translateY(-30%);
  -ms-transform: translateX(-50%);   /* IE 9 */
  -moz-transform: translateX(-50%);  /* Firefox */
  -webkit-transform: translateX(-50%); /* Safari 和 Chrome */
  -o-transform: translateX(-50%);  /* Opera */
  transform: translateX(-50%);
  width: 90%;
  max-width: 500px;
  border: 0;
  text-align: center;
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  background: rgba(0,0,0,0.35);
  padding: 10px 0
}
.user-page > p {
  font-size: 18px;
  font-weight: normal;
  margin-bottom: 10px
}
.user-page img {
  width: 120px;
  max-width: 100%;
  margin: 5px 0;
  vertical-align: middle;
  border-radius: 100px !important;
  border: 6px solid rgba(0,0,0,0.2)
}
.user-page button {
  margin-bottom: 10px;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  background-image: none;
  border: 0;
  background-color: rgba(0, 0, 0, 0.6);
  white-space: nowrap;
  color: #fff;
  font-size: 18px;
  width: 120px;
  height: 37px;
  line-height: 37px;
  text-align: center
}
.user-page button:hover {
  text-shadow: 0 0 4px rgba(255,255,255,0.7);
  opacity: 1 !important;
}
</style>
