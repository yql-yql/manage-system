<!--
 * @Date: 2022-06-07 19:38:22
 * @LastEditTime: 2022-06-15 10:53:13
-->
<template>
  <header>
    <div class="l-content">
      <el-button plain icon="el-icon-menu" size="mini" @click="handleMenu"></el-button>
      <!-- <h3 style="color:#fff">首页</h3> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="tag in tags" :key="tag.path" :to="{ path: tag.path }" >{{tag.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span>
        <img :src="userImg" class="user">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name:'CommonHeader',
  data(){
    return {
      userImg:require('../assets/img/pic.jpg')
    }
  },
  methods:{
    handleMenu(){
      this.$store.commit('collapseMenu')
    },
    logOut(){
      console.log('第一步')
      this.$store.commit('clearToken');
      console.log('第2步')
      this.$store.commit('clearMenu');
      console.log('第3步')
      this.$router.push('/login');
      console.log('第4步')
    }
  },
  computed:{
    //通过vuex中的mapState获取到TabList中的内容
    ...mapState({
        tags: state => state.tab.tabList
    })
  }
}
</script>

<style lang="less" scoped>
  header {
    display: flex;
    height:100%;
    justify-content: space-between;
    align-items: center;
  }
  .l-content {
    display: flex;
    align-items: center;
    .el-button {
      margin-right: 20px;
    }
  }
  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
</style>