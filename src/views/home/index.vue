<template>
	<div>
		<el-row class="home" :gutter="20" style="margin: 0">
			<el-col class="left-item" :span="8">
				<div class="gutter">
					<el-card class="left-top-card" shadow="hover" body-style="padding:0">
						<div class="user">
							<img :src="userImg" alt="" />
							<div class="userInfo">
								<p class="name">{{ adminInfo.user_name || "Admin" }}</p>
								<p class="access">{{ adminInfo.admin || "管理员" }}</p>
							</div>
						</div>
						<div class="login-info">
							<p>
								注册时间：<span>{{
									adminInfo.create_time || "2021-5-23"
								}}</span>
							</p>
							<p>
								登录地点：<span>{{ adminInfo.city || "四川 成都" }}</span>
							</p>
						</div>
					</el-card>
					<el-card
						class="left-bottom-card"
						shadow="hover"
						style="margin-top: 10px; height: 400px; width: 100%"
					>
						<echart
							:chartData="echartData.user_city"
							:isAxisChart="false"
							style="height: 300px; width: 400px"
						></echart>
					</el-card>
				</div>
			</el-col>
			<el-col class="right-item" :span="16">
				<div class="gutter">
					<div class="right-top-content">
						<div class="dataClass" :body-style="{ padding: 0 }">
							<el-card>今日数据</el-card>
							<el-card>总数据</el-card>
						</div>
						<div class="cards">
							<el-card
								class="card"
								v-for="item in countData"
								:key="item.name"
								:body-style="{ padding: 0 }"
								shadow="hover"
							>
								<i
									class="icon"
									:class="'el-icon-' + item.icon"
									:style="{ background: item.color }"
								></i>
								<div class="detail">
									<h3 class="num">{{ item.value }}</h3>
									<p class="txt">{{ item.name }}</p>
								</div>
							</el-card>
						</div>
					</div>
					<el-card class="middle-card" style="height: 420px" shadow="hover">
						<echart :chartData="echartData.count" style="height: 385px">
						</echart>
					</el-card>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { getData } from "../../../api/data";
import {
	adminCount,
	adminDayCount,
	getOrderCount,
	getUserCity,
	getUserCount,
	orderCount,
	userCount,
} from "../../api/getData";
import { mapState } from "vuex";
import { baseImgPath } from "../../config/env";
import Echart from "../../components/Echarts.vue";
export default {
	name: "Home",
	components: {
		Echart,
	},
	data() {
		return {
			baseImgPath,
			user_img: require("../../assets/img/pic.jpg"),
			sevenDay: [],
			sevenData: [[], [], []],
			//右上角图data
			countData: [
				{
					name: "今日新增用户",
					value: null,
					icon: "success",
					color: "#2ec7c9",
				},
				{
					name: "今日新增订单",
					value: null,
					icon: "star-on",
					color: "#ffb980",
				},
				{
					name: "今日新增管理员",
					value: null,
					icon: "s-goods",
					color: "#5ab1ef",
				},
				{
					name: "总用户数量",
					value: null,
					icon: "success",
					color: "#2ec7c9",
				},
				{
					name: "总订单数量",
					value: null,
					icon: "star-on",
					color: "#ffb980",
				},
				{
					name: "总管理员数量",
					value: null,
					icon: "s-goods",
					color: "#5ab1ef",
				},
			],
			//折线图data
			countData2: [],
			echartData: {
				count: {
					xData: [],
					series: [],
				},
				user_city: {
					series: [],
				},
			},
		};
	},
	computed: {
		userCountData() {
			return this.userCount;
		},
		...mapState({
			adminInfo: (state) => state.user.adminInfo,
		}),
		userImg() {
			if (this.adminInfo.id) {
				return this.baseImgPath + this.adminInfo.avatar;
			} else {
				return this.user_img;
			}
		},
	},
	methods: {
		async initData() {
			// const today = dtime().format("YYYY-MM-DD");
			let aData = new Date();
			console.log(aData); //Wed Aug 21 2019 10:00:58 GMT+0800 (中国标准时间)
			let today =
				aData.getFullYear() +
				"-" +
				(aData.getMonth() + 1 >= 10
					? aData.getMonth() + 1
					: "0" + (aData.getMonth() + 1)) +
				"-" +
				(aData.getDate() >= 10 ? aData.getDate() : "0" + aData.getDate());
			console.log(today); //2019-8-20
			Promise.all([
				userCount(today),
				orderCount(today),
				adminDayCount(today),
				getUserCount(),
				getOrderCount(),
				adminCount(),
			])
				.then((res) => {
					let i = 0;
					this.countData.forEach((item) => {
						item.value = res[i++].data.count;
					});
				})
				.catch((err) => {
					console.log(err);
				});
		},
		//近七日数据
		async getSevenData() {
			const apiArr = [[], [], []];
			this.sevenDay.forEach(async (item) => {
				apiArr[0].push(userCount(item));
				apiArr[1].push(orderCount(item));
				apiArr[2].push(adminDayCount(item));
			});
			const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]];
			Promise.all(promiseArr)
				.then((res) => {
					const resArr = [[], [], []];
					res.forEach((item, index) => {
						if (item.data.status === 1) {
							resArr[Math.floor(index / 7)].push(item.data.count);
						}
					});
					this.sevenData = resArr;
					//准备echart要的数据格式
					const personData = [];
					console.log(personData);
					for (let i = 0; i < 7; i++) {
						personData.push({
							当日新增用户数量: this.sevenData[0][i],
							当日新增订单数量: this.sevenData[1][i],
							当日新增管理员数量: this.sevenData[2][i],
						});
					}
					this.countData2 = personData;
					this.echartData.count.xData = this.sevenDay;
					const keyArray = Object.keys(this.countData2[0]);
					console.log("asd", keyArray);
					const series = [];
					keyArray.forEach((key) => {
						series.push({
							name: key,
							data: this.countData2.map((item) => item[key]),
							type: "line",
						});
					});
					this.echartData.count.series = series;
					this.echartData.count.legend = Object.keys(this.countData2[0]);
					console.log("uizhong", this.echartData);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		//获取用户城市分布图
		async UserCityData() {
			try {
				const res = await getUserCity();
				console.log("用户分布", res);
				const { status, user_city } = res.data;
				const user_city_series = [];
				const name = [];
				Object.keys(user_city).forEach((key) => {
					switch (key) {
						case "beijing":
							name[key] = "北京";
							break;
						case "shanghai":
							name[key] = "上海";
							break;
						case "hangzhou":
							name[key] = "杭州";
							break;
						case "shenzhen":
							name[key] = "深圳";
							break;
						case "qita":
							name[key] = "其他地区";
							break;
					}
				});
				Object.keys(user_city).forEach((key) => {
					user_city_series.push({
						name: name[key],
						value: user_city[key],
					});
				});
				console.log(status, user_city);
				if (status === 1) {
					this.echartData.user_city.series = [
						{
							name: "访问来源",
							radius: "70%",
							center: ["50%", "55%"],
							type: "pie",
							data: user_city_series,
							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: "rgba(0, 0, 0, 0.5)",
								},
							},
						},
					];
					console.log(this.echartData);
				} else {
					console.log("数据获取失败");
				}
			} catch (err) {
				console.log(err);
			}
		},
	},
	mounted() {
		this.initData();
		for (let i = 6; i >= 0; i--) {
			const aData = new Date(new Date() - 86400000 * i);
			let today =
				aData.getFullYear() +
				"-" +
				(aData.getMonth() + 1 >= 10
					? aData.getMonth() + 1
					: "0" + (aData.getMonth() + 1)) +
				"-" +
				(aData.getDate() >= 10 ? aData.getDate() : "0" + aData.getDate());
			this.sevenDay.push(today);
		}
		this.getSevenData();
		this.UserCityData();
	},
};
</script>
