<template>
  <div id="nav" class="flexbox">
    <a v-for="item in list" :href="item.url" :title="item.name" target="_blank">
      <i :class="'fa '+item.icon" aria-hidden="true"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: 'nav',
  data () {
    return {
      msg: '',
      list: [
        {'name': 'facebook','icon': 'fa-facebook-official','url': 'http://www.facebook.com'},
        {'name': 'instagram','icon': 'fa-instagram','url': 'http://www.instagram.com'},
        {'name': 'googlemail','icon': 'fa-google','url': 'http://mail.google.com'},
        {'name': 'youtube','icon': 'fa-youtube','url': 'http://www.youtube.com'},
        {'name': 'twitter','icon': 'fa-twitter','url': 'http://www.twitter.com'},
        {'name': 'tumblr','icon': 'fa-tumblr','url': 'http://www.tumblr.com'},
        {'name': 'weibo','icon': 'fa-weibo','url': 'http://www.weibo.com'},
        {'name': 'github','icon': 'fa-github','url': 'http://www.github.com'},
        {'name': 'pinterest','icon': 'fa-pinterest','url': 'http://www.pinterest.com'},
        {'name': 'dropbox','icon': 'fa-dropbox','url': 'http://www.dropbox.com'}
      ]
    }
  }
}
</script>

<style scoped>
#nav {
  padding: 10px;
  border-bottom: 1px solid rgba(255,255,255,0.15)
}
.flexbox {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  -o-flex-wrap: wrap;
  flex-wrap: wrap;
  -moz-justify-content: center;
  -ms-justify-content: center;
  -o-justify-content: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  list-style-type: none;
  width: 100%;
  margin: 0 auto;
}
.flexbox > *{
  text-align: center;
}
#nav > a {
  width: 65px;
  height: 65px
}
#nav > a > i {
  font-size: 50px;
  line-height: 65px
}
</style>
