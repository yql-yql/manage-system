<!--
 * @Date: 2022-06-17 18:09:44
 * @LastEditTime: 2022-06-29 17:02:17
-->
<!--
 * @Date: 2022-06-17 18:09:18
 * @LastEditTime: 2022-06-18 14:59:27
-->
<template>
	<div>
		<common-table-two
			:tableData="tableData"
			:tableLabel="tableLabel"
			:config="config"
			@changePage="changePage"
			@sizeChange="sizeChange"
		>
			<el-table-column label="订单ID" prop="order_id"> </el-table-column>
			<el-table-column
				label="订单总额"
				prop="order_total_price"
			></el-table-column>
			<el-table-column label="下单时间" prop="order_time"> </el-table-column>
			<el-table-column label="订单状态" prop="order_state"> </el-table-column>
		</common-table-two>
	</div>
</template>

<script>
import {
	getOrderList,
	getOrderCount,
	getResturantDetail,
	getUserInfo,
	getAddressById,
} from "../../api/getData";
import CommonTableTwo from "../../components/CommonTableTwo.vue";
export default {
	name: "Order",
	components: {
		CommonTableTwo,
	},
	data() {
		return {
			config: {
				currentPage: 1,
				total: 30,
				limit: 20,
				offset: 0,
			},
			tableLabel: [
				{
					prop: "user_name",
					label: "用户名",
				},
				{
					prop: "title",
					label: "商家名称",
				},
				{
					prop: "user_addr",
					label: "收货地址",
				},
				{
					prop: "id",
					label: "商家ID",
				},
				{
					prop: "addr",
					label: "商家地址",
				},
			],
			tableData: [],
		};
	},
	created() {
		this.initData();
	},
	methods: {
		async initData() {
			try {
				const res = await getOrderCount();
				if (res.data.status === 1) {
					console.log("订单数量为：", res.data.count);
					this.config.total = res.data.count;
					this.getOrderList();
				} else {
					console.log("获取订单数量失败");
				}
			} catch (err) {
				console.log(err);
			}
		},
		//获取订单
		async getOrderList() {
			try {
				const res = await getOrderList({
					limit: this.config.limit,
					offset: this.config.offset,
				});
				const orderData = res.data;
				this.tableData = [];
				orderData.forEach((item) => {
					let tableData = {};
					tableData.user_id = item.user_id;
					tableData.title = item.restaurant_name;
					tableData.id = item.restaurant_id;
					tableData.order_state = item.status_bar.title;
					tableData.order_id = item.id;
					tableData.order_total_price = item.total_amount;
					tableData.order_time = item.formatted_created_at;
					tableData.address_id = item.address_id;
					this.orderListExpend(tableData).then((res) => {
						this.tableData.push(res);
					});
				});
				console.log("dddd", this.tableData);
			} catch (err) {
				console.log(err);
			}
		},
		//对订单数据进一步处理
		async orderListExpend(rowData) {
			const restaurant = await getResturantDetail(rowData.id);
			const userInfo = await getUserInfo(rowData.user_id);
			const addressInfo = await getAddressById(rowData.address_id);
			rowData.addr = restaurant.data.address;
			rowData.user_addr = addressInfo.data.address;
			rowData.user_name = userInfo.data.username;
			return rowData;
		},
		sizeChange(num) {
			this.config.limit = num;
			this.config.currentPage = 1;
			this.config.offset = 0;
			this.getOrderList();
		},
		changePage(page) {
			this.config.currentPage = page;
			this.config.offset = this.config.limit * (page - 1);
			this.getOrderList();
		},
	},
};
</script>

<style></style>
