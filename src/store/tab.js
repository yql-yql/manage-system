/*
 * @Date: 2022-06-07 20:10:09
 * @LastEditTime: 2022-07-01 22:29:43
 */
import Cookie from 'js-cookie'
export default {
  state:{
    isCollapse:false,
    tabList:[
      {
        path:'/home',
        name:'home',
        label:'首页',
        icon:'s-home'
      }
    ],
    //记录当前选中的菜单
    currentMenu:null,
    menu:[
      {
        path:'/home',
        name:'home',
        label:'首页',
        icon:'menu'
      },
      {
        path:'/user',
        name:'user',
        label:'用户列表',
        icon:'user'
      },
      {
        path:'/business',
        name:'business',
        label:'商铺管理',
        icon:'s-shop'
      },
      {
        path:'/goods',
        name:'goods',
        label:'商品管理',
        icon:'goods'
      },
      {
        path:'/add',
        name:'add',
        label:'添加数据',
        icon:'s-operation',
        children:[
          {
            path:'/add/addbusiness',
            name:'addbusiness',
            label:'添加商铺',
            icon:'home'
          },
          {
            path:'/add/addgoods',
            name:'addgoods',
            label:'添加商品',
            icon:'home'
          }
        ]
      },
      {
        path:'/order',
        name:'order',
        label:'订单管理',
        icon:'s-order'
      },
      {
        path:'/manager',
        name:'manager',
        label:'管理员列表',
        icon:'eleme'
      },
      {
        path:'/edit',
        name:'edit',
        label:'编辑',
        icon:'edit'
      },
      {
        path:'/other',
        name:"other",
        label:'设置',
        icon:'setting',
        children:[
          {
            path:'/other/description',
            name:'description',
            label:'说明',
            icon:'info'
          },
          {
            path:'/other/adminsetting',
            name:'adminSetting',
            label:'管理员信息',
            icon:'info'
          }
        ]
      },
    ]
  },
  mutations:{
    collapseMenu(state){
      state.isCollapse = !state.isCollapse
    },
    //用于改变tabList
    selectMenu(state, item){
      //先判断点击的是否是首页，若不是则要进行修改
      if(item.name != 'home'){
        state.currentMenu = item.name;
        //再判断是否已经被点击过
        let result = state.tabList.findIndex(any => any.name === item.name);
        if(result === -1){
          //若没有被点击过，就添加到tabList中
          state.tabList.push(item);
        }
      }else{
        state.currentMenu = null;
      }
    },
    closeTag(state, item){
      const index = state.tabList.findIndex(any => any.name === item.name);
      state.tabList.splice(index, 1);
    },
    // setMenu(state, val){
    //   state.menu = val;
    //   Cookie.set('menu', JSON.stringify(val))
    // },
    // clearMenu(state){
    //   state.menu = [];
    //   Cookie.remove('menu');
    // },
    // addMenu(state, router){
    //   if(!Cookie.get('menu')) {
    //     return;
    //   }
    //   const menu = JSON.parse(Cookie.get('menu'));
    //   state.menu = menu;
    //   const menuArray = [];
    //   menu.forEach(item => {
    //     if(item.children){
    //       item.children = item.children.map(item => {
    //         item.component = () => import (`../views/${item.url}`);
    //         return item;
    //       })
    //       menuArray.push(...item.children);
    //     }else{
    //       item.component = () => import (`../views/${item.url}`);
    //       menuArray.push(item)
    //     }
    //   })
    //   //路由的动态添加
    //   menuArray.forEach(item => {
    //     router.addRoute('Main',item);
    //   });
    // }
    
  }
}