/*
 * @Date: 2022-06-07 15:01:09
 * @LastEditTime: 2022-07-01 22:12:12
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import User from '../views/user/index.vue'
import Home from '../views/home/index.vue'
import Business  from '../views/business/index.vue'
import AddBusiness from '../views/add/addBusiness'
import AddGoods from '../views/add/addGoods'
import Login from '../views/login/Login.vue'
import Edit from '../views/edit/index.vue'
import Goods from '../views/goods/index.vue'
import Manager from '../views/manager/index.vue'
import Order from '../views/order/index.vue'
import Description from '../views/other/description.vue'
import AdminSetting from '../views/other/adminSetting.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'Main',
    component:Main,
    redirect:'/home',
    children:[
      {
        path:'/home',
        name:'home',
        component:Home,
        meta: []
      },
      {
        path:'/user',
        name:'user',
        component:User,
        meta: ['用户列表']
      },
      {
        path:'/business',
        name:'business',
        component:Business,
        meta: ['商铺管理']
      },
      {
        path:'/manager',
        name:'manager',
        component:Manager,
        meta: ['管理员列表']
      },
      {
        path:'/goods',
        name:'goods',
        component:Goods,
        meta: ['商品管理']
      },
      {
        path:'/order',
        name:'order',
        component:Order,
        meta: ['订单管理']
      },
      {
        path:'/edit',
        name:'edit',
        component:Edit,
        meta: ['编辑']
      },
      {
        path:'/other/description',
        name:'description',
        component:Description,
        meta: ['设置','说明']
      },
      {
        path:'/other/adminsetting',
        name:'adminSetting',
        component:AdminSetting,
        meta: ['设置','管理员设置']
      },
      {
        path:'add/addbusiness',
        name:'addbusiness',
        component:AddBusiness,
        meta: ['添加数据', '添加商铺'],
      },
      {
        path:'add/addgoods',
        name:'addgoods',
        component:AddGoods,
        meta: ['添加数据', '添加商品'],
      }
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