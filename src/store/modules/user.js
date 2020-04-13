const tips = {
    state:{
        tips:[],
    },
    getters:{
        tips:state => state.tips,
    },
    mutations:{
        UPDATE_TIPS:(state,params) => {
            state.tips = params;
        },
    },
    actions:{
        updateTips({ commit }, params) {
            commit('UPDATE_TIPS', params);
        },
    },
};
export default tips;