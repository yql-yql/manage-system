/*
 * @Date: 2022-06-14 10:59:33
 * @LastEditTime: 2022-06-15 16:54:26
 */
import Cookie from 'js-cookie'
export default {
  state:{
    token:''
  },
  mutations:{
    setToken(state, val){
      state.token = val;
      Cookie.set('token', val)
    },
    clearToken(state){
      state.token = '';
      Cookie.remove('token');
    },
    getToken(state){   
      state.token = state.token || Cookie.get('token')
    }
  }
}