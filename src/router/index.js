/*
 * @Date: 2022-06-07 15:01:09
 * @LastEditTime: 2022-06-15 14:32:24
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
// import User from '../views/user/index.vue'
// import Home from '../views/home/index.vue'
// import Mall from '../views/mall/index.vue'
// import PageOne from '../views/other/PageOne'
// import PageTwo from '../views/other/PageTwo'
import Login from '../views/login/Login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'Main',
    component:Main,
    redirect:'/home',
    children:[
      // {
      //   path:'/home',
      //   name:'home',
      //   component:Home
      // },
      // {
      //   path:'/user',
      //   name:'user',
      //   component:User
      // },
      // {
      //   path:'/mall',
      //   name:'mall',
      //   component:Mall
      // },
      // {
      //   path:'/other/page1',
      //   name:'page1',
      //   component:PageOne
      // },
      // {
      //   path:'/other/page2',
      //   name:'page2',
      //   component:PageTwo
      // }
    ]
  },
  {
    path:'/login',
    name:"login",
    component:Login
  }
]
const router = new VueRouter({
  routes,
  mode:'history',
})
export default router