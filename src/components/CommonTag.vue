<!--
 * @Date: 2022-06-12 16:43:37
 * @LastEditTime: 2022-06-15 10:55:46
-->
<template>
  <div class="tabs">
    <el-tag size="small" 
    v-for="(tag, index) in tags" 
    :key="tag.path" 
    :closable="tag.name != 'home'" 
    :effect="$route.name === tag.name ? 'dark' : 'plain'"
    @click="changeMenu(tag)"
    @close="handleClose(tag, index)">
    {{tag.name}}
    </el-tag>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name:'CommonTag',
  computed:{
    ...mapState({
      tags:state => state.tab.tabList
    })
  },
  methods:{
    ...mapMutations({
      closeTag:'closeTag'
    }),
    changeMenu(tag){
      this.$router.push(tag.path)
    },
    handleClose(tag, index){
      const length = this.tags.length - 1;
      //删除操作
      this.closeTag(tag);
      //如果点击删除的不是当前页面，不做操作
      if(tag.name != this.$route.name){
        return;
      }
      if(length === index){
        //如果删除的是当前页面且当前页面是最后一个页面，就向左移一个
        this.$router.push(this.tags[index-1].path);
      }else{
        //删除的页面不是最后一个页面就向右移一个
        this.$router.push(this.tags[index].path);
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .tabs {
    margin-left: 20px;
    display: flex;
    flex-flow: row wrap;
  }
  .el-tag {
    margin:5px;
    cursor:pointer
  };
</style>