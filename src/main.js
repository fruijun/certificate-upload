import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false


import BaseToast from '@/components/BaseToast/BaseToast';
import Popover from '@/components/Popover/Popover';

import { createAPI,Toast,Slide, } from 'cube-ui';

import 'lib-flexible';
// import '@/assets/css/common.scss';
createAPI(Vue, Popover, ['click', 'change'], true);
createAPI(Vue, BaseToast, [], true);
Vue.use(Toast);
Vue.use(Slide);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
