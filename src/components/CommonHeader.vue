<!--
 * @Date: 2022-06-07 19:38:22
 * @LastEditTime: 2022-07-01 22:31:49
-->
<template>
	<header>
		<div class="l-content">
			<el-button
				plain
				icon="el-icon-menu"
				size="mini"
				@click="handleMenu"
			></el-button>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{
					item
				}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="r-content">
			<el-dropdown trigger="click" size="mini">
				<span>
					<img :src="userImg" class="user" />
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="myCenter">个人中心</el-dropdown-item>
					<el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</header>
</template>

<script>
import { baseImgPath } from "../config/env";
import { signout } from "../api/getData";
import { mapActions, mapState } from "vuex";
export default {
	name: "CommonHeader",
	data() {
		return {
			userImg: require("../assets/img/pic.jpg"),
			baseImgPath,
		};
	},
	created() {
		console.log("nihao", this.$route.meta);
		if (!this.adminInfo.id) {
			this.getAdminData();
		}
	},
	methods: {
		...mapActions(["getAdminData"]),
		handleMenu() {
			this.$store.commit("collapseMenu");
		},
		async logOut() {
			const res = await signout();
			console.log("退出", res);
			if (res.data.status === 1) {
				this.$message({
					type: "success",
					message: "退出成功",
				});
				this.$router.push("/login");
			} else {
				this.$message({
					type: "error",
					message: res.data.message,
				});
			}
		},
		myCenter() {
			this.$router.push("/other/adminSetting");
		},
	},
	computed: {
		//通过vuex中的mapState获取到TabList中的内容
		...mapState({
			tags: (state) => state.tab.tabList,
			adminInfo: (state) => state.user.adminInfo,
		}),
	},
};
</script>

<style lang="less" scoped>
header {
	display: flex;
	height: 100%;
	justify-content: space-between;
	align-items: center;
}
.l-content {
	display: flex;
	align-items: center;
	.el-button {
		margin-right: 20px;
	}
}
.r-content {
	.user {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
}
</style>
