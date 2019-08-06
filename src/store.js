import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    userId: 0,
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userName = userInfo.userName;
      state.userId = userInfo.userId;
    },
  },
  actions: {
    setUserInfo(context, userInfo) {
      context.commit('setUserInfo', userInfo)
    }

  }
})
