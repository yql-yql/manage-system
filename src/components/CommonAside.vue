<!--
 * @Date: 2022-06-07 15:50:07
 * @LastEditTime: 2022-06-15 16:29:21
-->
<template>
  <el-menu  class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <h3>{{isCollapse? '后台' : '通用后台管理系统'}}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :index="item.path" :key="item.path">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group  v-for="(subItem,subIndex) in item.children" :key="subItem.path">
        <el-menu-item @click="clickMenu(subItem)" :index="String(subIndex)">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
      </el-submenu>
</el-menu>
</template>

<script>
export default {
  name:'CommonAside',
  data() {
      return {
        menu:[]            
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item){
        this.$router.push({
          name:item.name
        });
        //通过vuex将点击的项目传给对应mutation，此处是selectMenu
        this.$store.commit('selectMenu', item);
      }
    },
    computed:{
      noChildren(){
        return this.asyncMenu.filter(item => !item.children);
      },
      hasChildren(){
        return this.asyncMenu.filter(item => item.children);
      },
      isCollapse(){
        return this.$store.state.tab.isCollapse;
      },
      asyncMenu(){
        return this.$store.state.tab.menu;
      }
    }
}
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    height: 100vh;
    border: none;
  }
  .el-menu h3 {
      color: #fff;
      text-align: center;
      line-height: 43px;
    }
</style>