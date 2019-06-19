import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutaions'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isLogin: false,
        isCheckAuth: false,
        test : '',
        analyzeResult: {},
        analyz_express: [], // 삭제예정
        dataFromFirebase: { readyFb: false },
        dataFromAws: { readyAws: false }
    },
    actions,
    mutations,
    getters
})

export default store