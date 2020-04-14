import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import 'yuki-createjs';
// require('yuki-createjs');
Vue.config.productionTip = false


// import BaseToast from '@/components/BaseToast/BaseToast';
import Popover from '@/components/Popover/Popover';
// import PopAd from '@/components/PopAd/PopAd';
// import Loading from '@/components/Loading/Loading';

import { createAPI,Toast,Slide, } from 'cube-ui';

import 'lib-flexible';

createAPI(Vue, Popover, ['click', 'change'], true);
// createAPI(Vue, BaseToast, [], true);
// createAPI(Vue, PopAd, ['click', 'change'], true);
// createAPI(Vue, Loading, [], true);

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)


//引入图片查看器
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
})

let options = {
  // fullscreenEl:false,
}
// Vue.use(preview,options);
Vue.use(Toast);
Vue.use(Slide);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
