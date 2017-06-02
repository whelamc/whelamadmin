<template>
  <div id="bottom">
  {{title}} {{version}} @2016-{{year}}. by {{username}}
  </div>
</template>

<script>

export default {
  name: 'bottom',
  data () {
    return {
      msg: '',
      user: '',
      ver: '',
      year: ''
    }
  },
  props: ['username','title','version'],
  mounted () {
     var myDate = new Date();
     var year = myDate.getFullYear()
     this.year = year
  }
}
</script>

<style scoped>
#bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  margin: 10px 0
}
</style>
