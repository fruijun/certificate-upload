


import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tips:[],
    status:'',
    canSubmit:'',
    loanInfo:{},
    credentialsInfo:{
        state:'',//need_upload:待提交 uploaded_need_reupload：待重新提交 uploaded：已提交
        picArr:[],
        remark:'',
        operations:{
            eventDesc:'',//操作描述
            eventTime:'',//eventTime
        },
        auditMessage:'',//审核意见 uploaded_need_reupload这个状态才有
    },
    pictures:[],
    btnLoading: false,
  },
  mutations: {
    UPDATE_TIPS:(state,params) => {
        state.tips = params;
    },
    UPDATE_STATUS:(state,params) => {
        state.status = params;
    },
    UPDATE_CANSUBMIT:(state,params) => {
        state.canSubmit = params;
    },
    UPDATE_LOANINFO:(state,params) => {
        state.loanInfo = params;
    },
    UPDATE_BTNLOADING:(state,params) => {
        state.btnLoading = params;
    },
    UPDATE_CREDENTIALSINFO:(state,params) => {
        state.credentialsInfo = params;
    },
    UPDATE_PICTURES:(state,params) => {
        state.pictures = params;
    }
  },
  actions: {
    updateTips({ commit }, params) {
        commit('UPDATE_TIPS', params);
    },
    userInfo({ commit },params){
        commit('UPDATE_STATUS',params);
        commit('UPDATE_LOANINFO',params);
    }
  },
})

export default store;