<!--
 * @Date: 2022-06-13 10:34:48
 * @LastEditTime: 2022-07-01 18:06:35
-->

<template>
	<el-form ref="form" :model="form" label-width="100px">
		<el-form-item
			v-for="item in formLabel"
			:key="item.label"
			:label="item.label"
		>
			<el-input
				v-if="item.type === 'input'"
				:placeholder="'请输入' + item.label"
				v-model="form[item.prop]"
			></el-input>
			<el-switch
				v-if="item.type === 'switch'"
				v-model="form[item.prop]"
			></el-switch>
			<el-date-picker
				v-if="item.type === 'date'"
				type="date"
				v-model="form[item.prop]"
				placeholder="--请选择日期--"
				value-format="yyyy-MM-dd"
			></el-date-picker>
			<el-select
				v-if="item.type === 'select'"
				:placeholder="config.selectMenu.label"
				v-model="config.selectIndex"
				@change="handleSelect"
			>
				<el-option
					v-for="li in config.menuOptions"
					:key="li.value"
					:label="li.label"
					:value="li.index"
				></el-option>
			</el-select>
			<el-upload
				v-if="item.type === 'avatar'"
				class="avatar-uploader"
				:action="'https://elm.cangdu.org/v1/addimg/food'"
				:show-file-list="false"
				:on-success="handleServiceAvatarScucess"
				:before-upload="beforeAvatarUpload"
			>
				<img
					v-if="form.goods_image"
					:src="'https://elm.cangdu.org/img/' + form.goods_image"
					class="avatar"
				/>
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		</el-form-item>
		<el-form-item><slot></slot></el-form-item>
	</el-form>
</template>

<script>
export default {
	name: "CommonForm",
	props: {
		formLabel: Array,
		form: Object,
		inline: Boolean,
		config: Object,
	},
	data() {
		return {};
	},
	methods: {
		handleSelect() {
			this.$emit("handleSelect", index);
		},
		handleServiceAvatarScucess(res, file) {
			this.$emit("handleServiceAvatarScucess", res, file);
		},
		beforeAvatarUpload(file) {
			this.$emit("beforeAvatarUpload", file);
		},
	},
};
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.avatar-uploader .el-upload:hover {
	border-color: #20a0ff;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 120px;
	height: 120px;
	line-height: 120px;
	text-align: center;
}
.avatar {
	width: 120px;
	height: 120px;
	display: block;
}
</style>
