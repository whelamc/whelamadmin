<template>
  <div id="app" :class="classname">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      msg: '',
      classname: ''
    }
  },
  watch:{
    showSide:'changeTheme',
  },
  computed: {
    showSide: function () {
      return this.$store.state.showSide 
    }
  },
  created() {
    var a = window.localStorage.getItem('wtheme')
    if(!a){this.classname = 'skin-violate'}else{this.classname = a}
  },
  methods: {
    changeTheme(){
      var a = window.localStorage.getItem('wtheme')
      this.classname = a
    }
  }
}
</script>

<style>
/*public*/
* {
  box-shadow: none;
  -ms-touch-action: manipulation;
  touch-action: manipulation
}
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
html, body {
  height: 100%
}
body {
  font-family: 'open-sans-light', sans-serif;
  font-size: 12px;
  margin: 0;
  line-height: 1.42857143;
}
body, a, input {
  color: #fff;
  text-shadow: 0 0 3px rgba(255,255,255,0.4);
}
a {
  text-decoration: none;
}
a:hover, a:focus {
  color: #ffff00;
}
a:active, a:hover {
  outline: 0;
}
ul, li {
  list-style-type: none;
}
.pull-left {
  float: left !important
}
.pull-right {
  float: right !important
}
/*public*/

#app {
  background-size: 100% 100%;
  background-attachment: fixed;
  width: 100%;
  height: auto;
  min-height: 100%;
}

/*skin*/
.skin-violate {
  background-image: url(/static/images/skin-violate.jpg)
}
.skin-blue {
  background-image: url(/static/images/skin-blue.jpg)
}
.skin-chrome {
  background-image: url(/static/images/skin-chrome.jpg)
}
.skin-city {
  background-image: url(/static/images/skin-city.jpg)
}
.skin-cloth {
  background-image: url(/static/images/skin-cloth.jpg)
}
.skin-greenish {
  background-image: url(/static/images/skin-greenish.jpg)
}
.skin-kiwi {
  background-image: url(/static/images/skin-kiwi.jpg)
}
.skin-lights {
  background-image: url(/static/images/skin-lights.jpg)
}
.skin-night {
  background-image: url(/static/images/skin-night.jpg)
}
.skin-ocean {
  background-image: url(/static/images/skin-ocean.jpg)
}
.skin-sunny {
  background-image: url(/static/images/skin-sunny.jpg)
}
.skin-sunset {
  background-image: url(/static/images/skin-sunset.jpg)
}
.skin-tectile {
  background-image: url(/static/images/skin-tectile.jpg)
}
.skin-yellow {
  background-image: url(/static/images/skin-yellow.jpg)
}

@media (max-width: 1024px) {

  .skin-violate {
    background: #581528;
  }
  .skin-blue {
    background: #2B6474;
  }
  .skin-chrome {
    background: #40404E;
  }
  .skin-city {
    background: #321e39;
  }
  .skin-cloth {
    background: #343537;
  }
  .skin-greenish {
    background: #233335;
  }
  .skin-kiwi {
    background: #0f4731;
  }
  .skin-lights {
    background: #152d33;
  }
  .skin-night {
    background: #0F3D52;
  }
  .skin-ocean {
    background: #0064B3;
  }
  .skin-sunny {
    background: #44360B;
  }
  .skin-sunset {
    background: #883527;
  }
  .skin-tectile {
    background: #3B3B3B;
  }
  .skin-yellow {
    background: #915D25;
  }
}
</style>
