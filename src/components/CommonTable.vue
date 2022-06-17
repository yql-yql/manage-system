<!--
 * @Date: 2022-06-13 15:54:24
 * @LastEditTime: 2022-06-16 16:12:24
-->
<template>
  <div class="common-table">
    <el-table :data="tableData" height="90%" stripe >
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLable"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <template slot-scope="scope">
          <span style="margin-left=10px">{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handelEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handelDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pager"
      background
      layout="total,sizes,prev,pager,next"
      :total="config.total"
      :current-page.sync="config.page"
      @current-change="changePage"
      @size-change="handleSizeChange"
      @prev-click="prevPage"
      @next-click="nextPage"
      :page-size="config.pagesize"
      :page-sizes="[10, 20, 50]"
      >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name:'CommonTable',
  props:{
    tableData:Array,
    tableLable:Array,
    config:Object
  },
  methods:{
    handelEdit(row){
      this.$emit('edit', row);
    },
    handelDelete(row){
      this.$emit('del', row);
    },
    changePage(page){
      this.$emit('changePage', page);
    },
    prevPage(page){
      this.$emit('prevPage', page);
    },
    nextPage(page){
      this.$emit('nextPage', page);
    },
    handleSizeChange(num){
      console.log('在这里')
      this.$emit('sizeChange', num);
    }
  }
}
</script>

<style lang="less" scoped>
  .common-table {
    height: 500px;
    background-color: #fff;
    position: relative;
    .pager {
      position:absolute;
      bottom: 0;
      right: 20px;
    }
  }
</style>