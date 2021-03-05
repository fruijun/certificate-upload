<template>
  <div id="app">
    <router-view v-if="IsRouterAlive"/>
  </div>
</template>
<script type="es6">
import AppMixins from "@/mixins/App";
import vconsole from 'vconsole';
import sensors from '@/utils/sensors';
export default {
  name:'app',
  provide(){
    return {
      reload:this.reload
    }
  },
  mixins:[AppMixins],
  data(){
    return {
      IsRouterAlive:true
    }
  },
  async created(){
    if (process.env.VUE_APP_VCONSOLE === "true") {
      new vconsole();
    }
  },
  mounted(){
    sensors.init();
  },

  methods:{
    reload(){
      this.IsRouterAlive = false;
      this.$nextTick(function(){
        this.IsRouterAlive = true;
      })
    },
  },
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,body {
  width: 100%;
  height: 100%;
  background-color:$grayBg;
}
@media only screen and (device-width:375px) and (device-height:812px) and (-webkit-device-picel-ratio:3){
  html,body{
    height: 812px;
  }
}
body{

}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
