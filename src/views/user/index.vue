<template>
  <div class="manage">
    <el-dialog 
    :title="operateType === 'add' ? '新增用户' : '编辑用户'"
    :visible.sync="isShow"
    >
      <common-form :formLabel="operateFormLabel" :form="operateForm" :inline="true" ref="form"></common-form>
      <div class="dialog-footer" slot="footer">
        <el-button type='primary' @click="isShow=false">取消</el-button>
        <el-button type='primary' @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button class="add" type="primary" @click="addUser">+ 新增</el-button>
      <common-form class="search" :formLabel="FormLabel" :form="searchForm" :inline="true" ref="form">
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </common-form>
    </div>
    <div class="manage-body">
      <common-table
      :tableData="tableData"
      :tableLable="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
      @sizeChange="sizeChange"
      @prevPage="prevPage"
      @nextPage="nextPage"
      ></common-table>
    </div>
  </div>
</template>

<script>
import CommonForm from '../../components/CommonForm.vue'
import CommonTable from '../../components/CommonTable.vue'
import {getUser} from '../../../api/data'
export default {
  name:'User',
  components:{
    CommonForm,
    CommonTable
  },
  data(){
    return{
      isShow:false,
      operateType:'add',
      config:{
        page:1,
        total:30,
        pagesize:20,
      },
      operateFormLabel: [
        {
          model: 'name',
          label: '姓名',
          type: 'input'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'age',
          label: '年龄',
          type: 'input'
        },
        {
          model: 'addr',
          label: '地址',
          type: 'input'
        }
      ],
      operateForm:{
        name:'',
        sex:'',
        birth:'',
        age:'',
        addr:''
      },
      FormLabel:[
        {
          model: 'keyword',
          label: '',
          type: 'input'
        }
      ],
      searchForm:{
        keyword:''
      },
      tableLabel:[
        {
          prop:'name',
          label:'姓名'
        },  
        {
          prop:'sexLabel',
          label:'性别'
        },
        {
          prop:'birth',
          label:'出生日期',
          width:200
        },
        {
          prop:'age',
          label:'年龄'
        },
        {
          prop:'addr',
          label:'地址',
          width:320
        }
      ],
      tableData:[],
    }
  },
  methods:{
    getAge(date){
      //出生时间 毫秒
      let birthDayTime = new Date(birthday).getTime(); 
      //当前时间 毫秒
      let nowTime = new Date().getTime(); 
      //一年毫秒数(365 * 86400000 = 31536000000)
      return Math.ceil((nowTime-birthDayTime)/31536000000);
    },
    confirm(){
      if(this.operateType === 'edit'){
        this.$http.post('/user/edit', this.operateForm).then(res => {
            console.log(res);
            this.isShow = false;
            this.getList();
          }
        )
      }else{
        this.$http.post('/user/add', this.operateForm).then(res => {
            console.log(res);
            this.isShow = false;
            this.getList();
          }
        )
      }
    },
    addUser(){
      this.isShow = true;
      this.operateType = 'add';
      this.operateForm = {
        name:'',
        age:'',
        sex:'',
        birth:'',
        addr:''
      }
    },
    editUser(row){
      this.operateType = 'edit';
      this.isShow = true;
      this.operateForm = row;
    },
    delUser(row){
      this.$confirm('该操作将永久删除该用户信息', "提示", {
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(() => {
        const id = row.id;
        this.$http.post("user/del", {
          params: {id}
        }).then(() => {
          this.$message({
            type:'success',
            message:'删除成功'
          })
          this.getList();
        })
      })
    },
    sizeChange(num){
      this.config.pagesize = num;
      this.config.page = 1;
      this.getList();
    },
    prevPage(page){
      this.config.page = page;
      this.getList();
    },
    nextPage(page){
      this.config.page = page;
      console.log(this.config.page)
      this.getList();
    },
    handleCurrentChange(page) {
      this.config.page = page;
      this.getList();
    },
    getList(name=''){
      this.config.loading = true;
      name ? (this.config.page = 1) : '';
      getUser({
        page:this.config.page,
        name,
        total:this.config.total,
        limit:this.config.pagesize
      }).then(res => {
        console.log("res", res);
        this.tableData = res.data.list.map(item => {
          item.sexLabel = item.sex === 0 ? '女' : '男';
          return item;
        });
        this.config.total = res.data.count;
        this.config.loading = false;
      })
    }
  },
  created(){
    this.getList();
  }
}
</script>

<style lang="less" scoped>
  .manage {
    margin-left: 20px;
  }
  .manage-header {
    display: flex;
    justify-content: space-between;
  }
  .add{
      width: 100px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  .search {
    display: flex;
    justify-content: flex-start;
    .el-button{
      width: 100px;
      height: 40px;
      
    }
  }
</style>
<style lang="less">
  .manage-header > form > div:nth-child(2) > div{
    margin-left: 0 ! important;
  }
</style>