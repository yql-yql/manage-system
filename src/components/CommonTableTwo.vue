<!--
 * @Date: 2022-06-17 19:59:20
 * @LastEditTime: 2022-07-01 18:22:58
-->
<template>
	<div class="common-table-two">
		<el-table :data="tableData" style="width: 100%" height="90%">
			<el-table-column type="expand">
				<template slot-scope="scope">
					<el-form
						label-position="left"
						inline
						class="demo-table-expand"
						style="padding-left: 60px"
					>
						<el-form-item
							:label="item.label"
							v-for="item in tableLabel"
							:key="item.prop"
						>
							<span>{{ scope.row[item.prop] }}</span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<slot></slot>
		</el-table>
		<el-pagination
			class="pager"
			background
			layout="total,sizes,prev,pager,next"
			:total="config.total"
			:current-page.sync="config.currentPage"
			@current-change="handelChangePage"
			@size-change="handleSizeChange"
			:page-size="config.limit"
			:page-sizes="[10, 20, 50]"
		>
		</el-pagination>
	</div>
</template>

<script>
export default {
	name: "CommonTableTwo",
	props: {
		tableData: Array,
		tableLabel: Array,
		config: Object,
	},
	methods: {
		handelChangePage(page) {
			this.$emit("changePage", page);
		},
		handleSizeChange(num) {
			this.$emit("sizeChange", num);
		},
	},
};
</script>

<style lang="less" scoped>
.common-table-two {
	display: flex;
	justify-content: center;
	height: 600px;
	background-color: #fff;
	position: relative;
	padding: 20px;
	.pager {
		position: absolute;
		bottom: 0;
		right: 20px;
	}
}
.demo-table-expand {
	font-size: 0;
}
.demo-table-expand label {
	width: 90px;
	color: #99a9bf;
}
.demo-table-expand .el-form-item {
	margin-right: 0;
	margin-bottom: 0;
	width: 50%;
}
</style>
