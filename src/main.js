/*
 * @Date: 2022-06-07 14:27:45
 * @LastEditTime: 2022-07-04 14:46:12
 */
import Vue from 'vue'
import App from './App.vue'
import store from './store'
//全局引用
import ElementUI from 'element-ui'
//按需引入
// import {button} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import './assets/less/index.less'
import http from 'axios'
import '../api/mock.js'
Vue.config.productionTip = false
import VueRouter from "vue-router";
// 解决两次访问相同路由地址报错
const [routerPush, routerReplace] = [VueRouter.prototype.push, VueRouter.prototype.replace];
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};
VueRouter.prototype.replace = function replace(location) {
  return routerReplace.call(this, location).catch(error => error);
};

// 导航守卫
// router.beforeEach((to, from, next) => {
//   // store.commit('getToken');
//   // const token = store.state.user.token;
//   // if(to.name != 'login'){
//   //   if(token){
//   //     next();
//   //   }else{
//   //     next('/login');
//   //   }
//   // }else{
//   //   if(token){
//   //     next('/home');
//   //   }else{
//   //     next();
//   //   }
//   // }
// });
Vue.prototype.$http = http
Vue.use(ElementUI)
new Vue({
  store,
  router,
  render: h => h(App),
  // created(){
  //   store.commit('addMenu', router)
  // }
}).$mount('#app')