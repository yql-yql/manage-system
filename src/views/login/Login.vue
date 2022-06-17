<!--
 * @Date: 2022-06-14 10:19:18
 * @LastEditTime: 2022-06-16 14:33:04
-->
<!--
 * 给系统添加一个登录凭证叫token，token在登陆的时候通过接口请求将用户名和密码传给后端，后端从数据库中
 * 匹配成功后返回一个凭证，前端将token缓存起来，再调用接口时传给后端验证就建立了登录权限校验 
-->
<template>
  <el-form class="login-container" 
    :rules="rules"
    :model="form"
    label-width="100px"
    status-icon
    ref="form"
    >
    <h3 class="login_title">系统登录</h3>
    <el-form-item
      label="用户名"
      label-width="80px"
      prop="username"
      class="username"
    >
      <el-input 
        type="input"
        v-model="form.username"
        auto-complete="off"
        placeholder="请输入账号"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="密码"
      label-width="80px"
      prop="password"
    >
      <el-input 
        type="password"
        v-model="form.password"
        auto-complete="off"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item class="login_submit">
      <el-button type="primary" @click="login" class="login_submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Mock from 'mockjs'
import { getMenu } from '../../../api/data'
export default {
  name:'Login',
  data(){
    return{
      form:{
        username:''
      },
      rules:{
        username:[
          {
            required:true, message:"请输入用户名", trigger:'blur'
          },
          {
            min:2, message:"用户名长度不小于两位", trigger:'blur'
          }
        ],
        password:[
          {
            required:true, message:"请输入密码", trigger:'blur'
          }
        ]
      }
    }
  },
  methods:{
    login(){
      getMenu(this.form).then(res => {
        if(res.data.code === 20000){
          this.$store.commit('clearMenu');
          this.$store.commit('setMenu', res.data.data.menu);
          this.$store.commit('setToken',res.data.data.token);
          this.$store.commit('addMenu', this.$router);
          this.$router.push('/home');
        }else{
          this.$message.warning(res.data.data.message);
        }
      })
    }
  },
  mounted() {
    let that = this
    document.onkeydown = function (e) {
      e = window.event || e
      //保证是在登录页面发出的enter事件
      if ((that.$route.path === '/login'||that.$route.path === '/') && (e.code === 'Enter' || e.code === 'enter')) {
        //调用登录函数
        that.login();
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border:1px solid #cac6c6;
  box-shadow:0 0 25px #cac6c6;
}
.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.login_submit {
  margin: 10px auto 0px auto;
}
</style>