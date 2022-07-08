/*
 * @Date: 2022-06-07 14:27:45
 * @LastEditTime: 2022-06-24 16:11:51
 */
import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab.js'
import user from './user.js'
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
  },
  mutations: {

  },
  actions: {
  },
  modules: {
    tab,
    user
  }
})
