/*
 * @Date: 2022-06-14 10:59:33
 * @LastEditTime: 2022-07-01 20:02:20
 */
import Cookie from 'js-cookie'
import {getAdminInfo} from '../api/getData'
import axios from '../api/axios'
export default {
  state:{
    token:'',
    adminInfo: {
      avatar: 'default.jpg'
    },
  },
  mutations:{
    saveAdminInfo(state, adminInfo){
      state.adminInfo = adminInfo;
    },
  },
  actions:{
    appGet() {
      
    },
    async getAdminData({commit}){
      try{
        const res = await getAdminInfo();
        if(res.data.status === 1){
          commit('saveAdminInfo', res.data);
        }else{
          throw new Error(res.data.type);
        }
      }catch(err){
        console.log(err.message);
      }
    },
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