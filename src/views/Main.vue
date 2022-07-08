<!--
 * @Date: 2022-06-17 16:17:57
 * @LastEditTime: 2022-07-01 21:59:05
-->
<template>
	<el-container style="height: 100vh">
		<el-aside width="auto">
			<common-aside></common-aside>
		</el-aside>
		<el-container>
			<el-header>
				<common-header></common-header>
			</el-header>
			<common-tag></common-tag>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import CommonTag from "../components/CommonTag.vue";
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from "../components/CommonHeader";

export default {
	name: "Home",
	components: {
		CommonAside,
		CommonHeader,
		CommonTag,
	},
};
</script>

<style lang="less" scoped>
.el-aside {
	background-color: rgb(134, 150, 167);
}
.el-header {
	background-color: rgb(193, 203, 215);
}
.el-main {
	padding: 0;
}
</style>
