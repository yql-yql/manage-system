<template>
  <div>
    <el-row class="home" :gutter="20" style="margin:0">
        <el-col class="left-item" :span="8">         
          <div class="gutter">
            <el-card class="left-top-card" shadow="hover" body-style="padding:0">
              <div class="user">
                <img :src="userImg" alt="" />
                <div class="userInfo">
                  <p class="name">Admin</p>
                  <p class="access">超级管理员</p>
                </div>
              </div>
              <div class="login-info">
                <p>上次登录时间：<span>2022.5.31</span></p>
                <p>上次登录地点：<span>广州 广东</span></p>
              </div>
          </el-card>
          <el-card class="left-bottom-card" shadow="hover" style="margin-top:10px;height:410px">
            <el-table :data="tableData">
              <el-table-column v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val">
              </el-table-column>
            </el-table>
          </el-card>
          </div>
        </el-col>
        <el-col class="right-item" :span="16">
          <div class="gutter">
            <div class="cards">
              <el-card class="card" v-for="item in countData" :key="item.name" :body-style="{padding:0}" shadow="hover">
                <i class="icon" :class="'el-icon-' + item.icon" :style="{background:item.color}"></i>
                <div class="detail">
                  <h3 class="num">￥{{itemValue(item.value)}}</h3>
                  <p class="txt">{{item.name}}</p>
                </div>
              </el-card>
            </div>
          <el-card class="middle-card" style="{height:245px}" shadow="hover"> 
            <!-- <div style="height:260px" ref="echarts"></div> -->
            <echart :chartData="echartData.order" style="height:245px">
            </echart>
          </el-card>
          <div class="graph">
            <el-card style="height:200px" shadow="hover">
              <echart :chartData="echartData.user" style="height:200px"></echart>
            </el-card>
            <el-card style="height:200px" shadow="hover">
              <echart :chartData="echartData.video" :isAxisChart="false"  style="height:180px"></echart>
            </el-card>
          </div>
          </div>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import {getData} from '../../../api/data'
// import * as echarts from 'echarts'
import Echart from '../../components/Echarts.vue'
export default{
  name:'Home',
  components: {
    Echart
  },
  data(){
    return {
      userImg:require('../../assets/img/pic.jpg'),
      tableData:[],
      tableLabel:{
        name:'名称',
        todayBuy:'今日购买',
        monthBuy:'本月购买',
        totalBuy:'总购买'
      },
      countData:[
        {
          name:'今日支付订单',
          value:1234,
          icon:'success',
          color:'#2ec7c9'
        },
        {
          name:'今日收藏订单',
          value:6564,
          icon:'star-on',
          color:'#ffb980'
        },
        {
          name:'今日未支付订单',
          value:125,
          icon:'s-goods',
          color:'#5ab1ef'
        },
        {
          name:'本月支付订单',
          value:68435,
          icon:'success',
          color:'#2ec7c9'
        },
        {
          name:'本月收藏订单',
          value:68944,
          icon:'star-on',
          color:'#ffb980'
        },
        {
          name:'本月未支付订单',
          value:6564,
          icon:'s-goods',
          color:'#5ab1ef'
        }
      ],
      echartData:{
        order:{
          xData:[],
          series:[]
        },
        user:{
          xData:[],
          series:[]
        },
        video:{
          series:[]
        }
      }
    }
  },
  methods:{
    itemValue(value){
      return value.toFixed(2);
    }
  },
  mounted(){
    getData().then(res => {
      const {code, data} = res.data
      if(code === 20000){
        this.tableData = data.tableData;
        const order = data.orderData;
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        keyArray.forEach(key => {
          series.push({
            name:key,
            data:order.data.map(item => item[key]),
            type:'line'
          })
        })
        this.echartData.order.xData = xData,
        this.echartData.order.series = series
        this.echartData.user.xData = data.userData.map(item => item.date),
        this.echartData.user.series = [
          {
            name:'新增用户',
            data:data.userData.map(item => item.new),
            type:'bar'
          },
          {
            name:'活跃用户',
            data:data.userData.map(item => item.activate),
            type:'bar'
          }
        ]  
        this.echartData.video.series = [
          {
          data:data.videoData,
          type:'pie'
          }
        ]
      }
    })
  }
}
</script>

<style>

</style>