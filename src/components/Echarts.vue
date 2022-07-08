<template>
	<div ref="echart" class="echarts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
	props: {
		//用于区分是否是饼状图，默认不是饼状图
		isAxisChart: {
			type: Boolean,
			default: true,
		},
		chartData: {
			type: Object,
			default() {
				return {
					xData: [],
					series: [],
					legend,
				};
			},
		},
	},
	data() {
		return {
			//柱状图或条形图配置
			axisOption: {
				legend: {
					//图例文字颜色
					// textStyle: "#333",
				},
				grid: {
					left: "15%",
					bottom: "15%",
					top: "15%",
					// right: "15%",
				},
				//提示框
				tooltip: {
					trigger: "axis",
				},
				toolbox: {
					show: true,
					feature: {
						datazoom: {
							yAxisIndex: "none",
						},
						dataView: { readOnly: false },
						magicType: { type: ["bar", "line"] },
						restore: {},
					},
				},
				xAxis: {
					type: "category",
					data: [],
					axisLine: {
						lineStyle: {
							color: "#17b3a3",
						},
					},
					axisLable: {
						interval: 0,
						rotate: 45,
						color: "#333",
					},
				},
				yAxis: [
					{
						type: "value",
						axisLine: {
							lineStyle: {
								color: "#17b3a3",
							},
						},
					},
				],
				color: [
					"#2ec7c9",
					"#b6a2de",
					"#5ab1ef",
					"#ffb980",
					"#d87a80",
					"#8d98b3",
				],
				series: [],
			},
			//饼状图配置
			normalOption: {
				title: {
					text: "用户分布",
					x: "center",
				},
				tooltip: {
					trigger: "item",
					formatter: "{a} <br/>{b} : {c} ({d}%)",
				},
				legend: {
					orient: "vertical",
					left: "left",
					data: ["北京", "上海", "深圳", "杭州", "其他地区"],
				},
				color: ["#afb0b2", "#96a48b", "#dfd7d7", "#c9c0d3", "#c1cbd7"],
				series: [],
			},
			echart: null,
		};
	},
	computed: {
		options() {
			return this.isAxisChart ? this.axisOption : this.normalOption;
		},
	},
	// 对传入的数据进行监听
	watch: {
		chartData: {
			handler: function () {
				this.initChart();
			},
			immediate: true,
			deep: true,
		},
	},
	methods: {
		initChart() {
			this.$nextTick(() => {
				this.initChartData();
				if (this.echart) {
					this.echart.setOption(this.options);
				} else {
					this.echart = echarts.init(this.$refs.echart);
					this.echart.setOption(this.options);
				}
			});
		},
		initChartData() {
			if (this.isAxisChart) {
				this.axisOption.xAxis.data = this.chartData.xData;
				this.axisOption.series = this.chartData.series;
			} else {
				this.normalOption.series = this.chartData.series;
			}
		},
	},
	mounted() {
		this.initChart();
	},
};
</script>

<style></style>
