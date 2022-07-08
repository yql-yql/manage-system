<!--
 * @Date: 2022-06-17 18:10:41
 * @LastEditTime: 2022-06-27 19:10:46
-->
<template>
	<div class="manager">
		<div class="manager-header"></div>
		<div class="manager-body">
			<common-table
				:tableData="tableData"
				:tableLabel="tableLabel"
				:config="config"
				@changePage="handleCurrentChange"
				@sizeChange="sizeChange"
			></common-table>
		</div>
	</div>
</template>

<script>
import CommonTable from "../../components/CommonTable.vue";
import { adminList, adminCount } from "../../api/getData";
import Mock from "mockjs";
export default {
	name: "Manager",
	components: {
		CommonTable,
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
					prop: "index",
					label: "#",
				},
				{
					prop: "name",
					label: "姓名",
					width: "300",
				},
				{
					prop: "registDate",
					label: "注册日期",
					width: "300",
				},
				{
					prop: "addr",
					label: "地址",
					width: "300",
				},
				{
					prop: "authority",
					label: "权限",
					width: "200",
				},
			],
			tableData: [],
		};
	},
	methods: {
		sizeChange(num) {
			this.config.limit = num;
			this.config.currentPage = 1;
			this.getAdmin();
		},
		async initData() {
			try {
				const countData = await adminCount();
				if (countData.data.status === 1) {
					this.config.total = countData.data.count;
				} else {
					throw new Error("获取数据失败");
				}
				this.getAdmin();
			} catch (err) {
				console.log("获取数据失败", err);
			}
		},
		async getAdmin() {
			try {
				const res = await adminList({
					offset: this.config.offset,
					limit: this.config.limit,
				});
				console.log("res", res);
				if (res.data.status === 1) {
					console.log("haha1");
					this.tableData = [];
					res.data.data.forEach((item) => {
						const tableItem = {
							registDate: item.create_time,
							index: item.id,
							name: item.user_name,
							authority: item.admin,
							addr: item.city,
						};
						this.tableData.push(tableItem);
					});
				} else {
					throw new Error(res.message);
				}
			} catch (err) {
				console.log("获取数据失败", err);
			}
		},
		handleCurrentChange(val) {
			this.config.currentPage = val;
			this.config.offset = (val - 1) * this.config.limit;
			this.getAdmin();
		},
	},
	created() {
		this.initData();
	},
};
</script>

<style lang="less" scoped>
.manager {
	margin-left: 20px;
}
.manager-header {
	display: flex;
	justify-content: flex-end;
}
.search {
	display: flex;
	justify-content: flex-start;
	.el-button {
		width: 100px;
		height: 40px;
	}
}
</style>
<style>
.manager-header > form > div:nth-child(2) > div {
	margin-left: 0 !important;
}
</style>
