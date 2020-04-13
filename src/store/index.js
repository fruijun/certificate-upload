import Vue from 'vue'
import Vuex from 'vuex'


import tips from './modules/tips';
import getters from './getters';
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    tips,
  },
  getters,
})

export default store;