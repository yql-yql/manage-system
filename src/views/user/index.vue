<template>
	<div class="user">
		<div class="user-header"></div>
		<div class="user-body">
			<common-table
				:tableData="tableData"
				:tableLabel="tableLabel"
				:config="config"
				@changePage="handleCurrentChange"
				@edit="editUser"
				@del="delUser"
				@sizeChange="sizeChange"
			></common-table>
		</div>
	</div>
</template>

<script>
import CommonTable from "../../components/CommonTable.vue";
import { getUserList, getUserCount } from "../../api/getData";
import Mock from "mockjs";
export default {
	name: "User",
	components: {
		CommonTable,
	},
	data() {
		return {
			config: {
				currentPage: 1,
				total: 30,
				offset: 0,
				limit: 20,
			},
			tableLabel: [
				{
					prop: "index",
					label: "#",
				},
				{
					prop: "avatar",
					label: "头像",
				},
				{
					prop: "name",
					label: "昵称",
				},
				{
					prop: "sexLabel",
					label: "性别",
				},
				{
					prop: "age",
					label: "年龄",
				},
				{
					prop: "registDate",
					label: "注册日期",
					width: 200,
				},
				{
					prop: "addr",
					label: "注册地址",
					width: 320,
				},
			],
			tableData: [
				{
					date: "2016-05-02",
					name: "王小虎",
					addr: "上海市普陀区金沙江路 1518 弄",
				},
				{
					date: "2016-05-04",
					name: "王小虎",
					addr: "上海市普陀区金沙江路 1517 弄",
				},
				{
					date: "2016-05-01",
					name: "王小虎",
					addr: "上海市普陀区金沙江路 1519 弄",
				},
				{
					date: "2016-05-03",
					name: "王小虎",
					addr: "上海市普陀区金沙江路 1516 弄",
				},
			],
		};
	},
	methods: {
		async initData() {
			try {
				const countData = await getUserCount();
				console.log("嘻嘻", countData);
				if (countData.data.status === 1) {
					this.config.total = countData.data.count;
				} else {
					throw new Error("获取数据失败");
				}
				this.getUsers();
			} catch (err) {
				console.log("获取数据失败", err);
			}
		},
		async getUsers(name = "") {
			console.log(this.config);
			this.config.loading = true;
			name ? (this.config.currentPage = 1) : "";
			const Users = await getUserList({
				offset: this.config.offset,
				limit: this.config.limit,
			});
			this.tableData = [];
			Users.data.forEach((item) => {
				const tableRowData = {};
				tableRowData.name = item.username;
				tableRowData.registDate = item.registe_time;
				tableRowData.addr = item.city;
				tableRowData.index = item.user_id;
				tableRowData.sexLabel = Mock.Random.integer(0, 1) === 0 ? "女" : "男";
				tableRowData.age = Mock.Random.integer(18, 60);
				this.tableData.push(tableRowData);
			});
			this.config.loading = false;
		},
		handleCurrentChange(val) {
			console.log("我在user组件这里");
			this.config.currentPage = val;
			console.log(val);
			this.config.offset = (val - 1) * this.config.limit;
			this.getUsers();
		},
		confirm() {
			if (this.operateType === "edit") {
				this.$http.post("/user/edit", this.operateForm).then((res) => {
					console.log(res);
					this.isShow = false;
					this.getList();
				});
			} else {
				this.$http.post("/user/add", this.operateForm).then((res) => {
					console.log(res);
					this.isShow = false;
					this.getList();
				});
			}
		},
		addUser() {
			this.isShow = true;
			this.operateType = "add";
			this.operateForm = {
				name: "",
				age: "",
				sex: "",
				registerDate: "",
				addr: "",
			};
		},
		editUser(row) {
			this.operateType = "edit";
			this.isShow = true;
			this.operateForm = row;
		},
		delUser(row) {
			this.$confirm("该操作将永久删除该用户信息", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(() => {
				const id = row.id;
				this.$http
					.post("user/del", {
						params: { id },
					})
					.then(() => {
						this.$message({
							type: "success",
							message: "删除成功",
						});
						this.getList();
					});
			});
		},
		sizeChange(num) {
			this.config.limit = num;
			this.config.currentPage = 1;
			this.getUsers();
		},
		// getList(name = "") {
		// 	this.config.loading = true;
		// 	name ? (this.config.page = 1) : "";
		// 	getUser({
		// 		page: this.config.page,
		// 		name,
		// 		total: this.config.total,
		// 		limit: this.config.pagesize,
		// 	}).then((res) => {
		// 		console.log("res", res);
		// 		this.tableData = res.data.list.map((item) => {
		// 			item.sexLabel = item.sex === 0 ? "女" : "男";
		// 			return item;
		// 		});
		// 		console.log(this.tableData);
		// 		this.config.total = res.data.count;
		// 		this.config.loading = false;
		// 	});
		// },
	},
	created() {
		// this.getList();
		this.initData();
	},
};
</script>

<style lang="less" scoped>
.user {
	margin-left: 20px;
}
.user-header {
	display: flex;
	justify-content: flex-end;
}
.add {
	width: 100px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
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
<style lang="less">
.user-header > form > div:nth-child(2) > div {
	margin-left: 0 !important;
}
</style>
