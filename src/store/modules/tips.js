import _ from 'lodash';
const tips = {
    state:{
        tips:[],
    },
    getters:{
        tips:state => state.tips,
        filterTips: state => (paramObj) => {
            const tipOptions = _.find(state.tips,paramObj);
            return tipOptions ? tipsOptions.tips : [];
        }
    },
    mutations:{
        UPDATE_TIPS:(state,params) => {
            state.tips = params;
        },   
    },
    actions: {
        //初始化广告位
        updateTips({ commit }, params) {
          commit('UPDATE_TIPS', params);
        },
    },
};
export default tips;