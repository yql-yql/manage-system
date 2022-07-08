<!--
 * @Date: 2022-06-13 15:54:24
 * @LastEditTime: 2022-06-22 20:26:48
-->
<template>
	<div class="common-table">
		<el-table :data="tableData" height="90%" stripe>
			<el-table-column
				show-overflow-tooltip
				v-for="item in tableLabel"
				:key="item.prop"
				:label="item.label"
				:width="item.width ? item.width : 150"
			>
				<template slot-scope="scope">
					<span style="margin-left=10px" v-if="item.prop != 'avatar'">{{
						scope.row[item.prop]
					}}</span>
					<!-- <img v-if="item.prop === 'avatar'" style="margin-left=10px"  alt="头像" :src="scope.row[item.prop]" width="30" height="30" /> -->
					<el-avatar
						v-if="item.prop === 'avatar'"
						src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
						style="margin-left=10px"
						:size="50"
					></el-avatar>
				</template>
			</el-table-column>
			<slot></slot>
			<!-- <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handelEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handelDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
		</el-table>
		<el-pagination
			class="pager"
			background
			layout="total,sizes,prev,pager,next"
			:total="config.total"
			:current-page.sync="config.currentPage"
			@current-change="changePage"
			@size-change="handleSizeChange"
			:page-size="config.limit"
			:page-sizes="[10, 20, 50]"
		>
		</el-pagination>
	</div>
</template>

<script>
export default {
	name: "CommonTable",
	props: {
		tableData: Array,
		tableLabel: Array,
		config: Object,
	},
	methods: {
		handelEdit(row) {
			this.$emit("edit", row);
		},
		handelDelete(row) {
			this.$emit("del", row);
		},
		changePage(page) {
			console.log("page", page);
			this.$emit("changePage", page);
		},
		handleSizeChange(num) {
			this.$emit("sizeChange", num);
		},
	},
};
</script>

<style lang="less" scoped>
.common-table {
	height: 600px;
	background-color: #fff;
	position: relative;
	.pager {
		position: absolute;
		bottom: 0;
		right: 20px;
	}
}
</style>
