/*
 * @Date: 2022-06-07 20:10:09
 * @LastEditTime: 2022-06-15 16:54:46
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
        icon:'home'
      }
    ],
    //记录当前选中的菜单
    currentMenu:null,
    menu:[]
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
    setMenu(state, val){
      state.menu = val;
      Cookie.set('menu', JSON.stringify(val))
    },
    clearMenu(state){
      state.menu = [];
      Cookie.remove('menu');
    },
    addMenu(state, router){
      if(!Cookie.get('menu')) {
        return;
      }
      const menu = JSON.parse(Cookie.get('menu'));
      state.menu = menu;
      const menuArray = [];
      menu.forEach(item => {
        if(item.children){
          item.children = item.children.map(item => {
            item.component = () => import (`../views/${item.url}`);
            return item;
          })
          menuArray.push(...item.children);
        }else{
          item.component = () => import (`../views/${item.url}`);
          menuArray.push(item)
        }
      })
      //路由的动态添加
      menuArray.forEach(item => {
        router.addRoute('Main',item);
      });
    }
    
  }
}