<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>
<script type="es6">
import AppMixins from "@/mixins/App";
import vconsole from 'vconsole';
export default {
  name:'app',
  mixins:[AppMixins],
  data(){
    return {}
  },
  // created(){},
  async mounted(){
      console.log('设备宽度,高度：',document.documentElement.clientWidth,document.documentElement.clientHeight);
      if (process.env.VUE_APP_VCONSOLE === "true") {
        new vconsole();
      }
  }
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
  height: 100%;
  // background-color: yellow;
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
