<!--
 * @Date: 2022-06-11 17:05:22
 * @LastEditTime: 2022-06-27 23:25:33
-->
<template>
	<el-row style="margin-top: 20px">
		<el-col :span="12" :offset="4">
			<h3>添加商铺</h3>
			<el-form
				ref="form"
				:model="form"
				:rules="rules"
				label-width="110px"
				class="demo-formData"
			>
				<el-form-item label="店铺名称" prop="title">
					<el-input
						placeholder="请输入店铺名称"
						v-model="form.title"
					></el-input>
				</el-form-item>
				<el-form-item label="详细地址" prop="addr">
					<el-autocomplete
						v-model="form.addr"
						:fetch-suggestions="querySearchAsync"
						placeholder="请输入地址"
						style="width: 100%"
						@select="addressSelect"
					></el-autocomplete>
					<span>当前城市：{{ city.name }}</span>
					<!-- <el-input placeholder="请输入详细地址" v-model="form.addr"></el-input> -->
				</el-form-item>
				<el-form-item label="联系电话" prop="tel">
					<el-input placeholder="请输入联系电话" v-model="form.tel"></el-input>
				</el-form-item>
				<el-form-item label="店铺简介" prop="description">
					<el-input placeholder="请输入" v-model="form.description"></el-input>
				</el-form-item>
				<el-form-item label="店铺标语" prop="slogan">
					<el-input placeholder="请输入" v-model="form.slogan"></el-input>
				</el-form-item>
				<el-form-item label="店铺分类" prop="class">
					<el-cascader
						:options="categoryOptions"
						v-model="selectedCategory"
						change-on-select
					></el-cascader>
				</el-form-item>
				<el-form-item label="店铺特点" style="white-space: wrap">
					<span>品牌保证</span>
					<el-switch v-model="form.is_premium"></el-switch>
					<span>蜂鸟专送</span>
					<el-switch v-model="form.delivery_mode"></el-switch>
					<span>新开店铺</span>
					<el-switch v-model="form.new"></el-switch>
					<span>外卖保</span>
					<el-switch v-model="form.bao"></el-switch>
					<span>准时达</span>
					<el-switch v-model="form.zhun"></el-switch>
					<span>开发票</span>
					<el-switch v-model="form.piao"></el-switch>
				</el-form-item>
				<el-form-item label="配送费">
					<el-input-number
						v-model="form.float_delivery_fee"
						prop="float_delivery_fee"
						:min="1"
						label="配送费"
					></el-input-number>
				</el-form-item>
				<el-form-item label="起送价">
					<el-input-number
						v-model="form.float_minimum_order_amount"
						prop="float_minimum_order_amount"
						:min="1"
						label="起送价"
					></el-input-number>
				</el-form-item>
				<el-form-item label="营业时间" style="white-space: nowrap">
					<el-time-picker
						placeholder="起始时间"
						v-model="form.startTime"
						:picker-options="{
							start: '05:30',
							step: '00:15',
							end: '23:30',
						}"
					></el-time-picker>
					<el-time-picker
						placeholder="结束时间"
						v-model="form.endTime"
						:picker-options="{
							start: '05:30',
							step: '00:15',
							end: '23:30',
							minTime: form.startTime,
						}"
					></el-time-picker>
				</el-form-item>
				<el-form-item label="上传店铺头像">
					<el-upload
						class="avatar-uploader"
						:action="baseUrl + '/v1/addimg/shop'"
						:show-file-list="false"
						:on-success="handleShopAvatarSuccess"
						:before-upload="beforeAvatarUpload"
					>
						<img
							v-if="form.image_path"
							:src="baseImgPath + form.image_path"
							class="avatar"
						/>
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="上传营业执照">
					<el-upload
						class="avatar-uploader"
						:action="baseUrl + '/v1/addimg/shop'"
						:show-file-list="false"
						:on-success="handleBusinessAvatarSuccess"
						:before-upload="beforeAvatarUpload"
					>
						<img
							v-if="form.business_license_image"
							:src="baseImgPath + form.business_license_image"
							class="avatar"
						/>
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="上传餐饮服务许可证">
					<el-upload
						class="avatar-uploader"
						:action="baseUrl + '/v1/addimg/shop'"
						:show-file-list="false"
						:on-success="handleServiceAvatarSuccess"
						:before-upload="beforeAvatarUpload"
					>
						<img
							v-if="form.catering_service_license_image"
							:src="baseImgPath + form.catering_service_license_image"
							class="avatar"
						/>
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="优惠活动">
					<el-select
						v-model="activityValue"
						@change="selectActivity"
						:placeholder="activityValue"
					>
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-table
					:data="activities"
					style="min-width: 600px; margin-bottom: 20px"
					align="center"
					:row-class-name="tableRowClassName"
				>
					<el-table-column
						prop="icon_name"
						label="活动标题"
						align="center"
						width="120"
					>
					</el-table-column>
					<el-table-column
						prop="name"
						label="活动名称"
						align="center"
						width="120"
					>
					</el-table-column>
					<el-table-column prop="description" align="center" label="活动详情">
					</el-table-column>
					<el-table-column label="操作" width="120">
						<template slot-scope="scope">
							<el-button
								size="small"
								type="danger"
								@click="handleDelete(scope.$index)"
								>删除</el-button
							>
						</template>
					</el-table-column>
				</el-table>
				<el-form-item class="button_submit">
					<el-button type="primary" @click="submitForm('formData')"
						>立即创建</el-button
					>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>

<script>
import { baseUrl, baseImgPath } from "../../config/env";
import {
	cityGuess,
	addShop,
	searchplace,
	foodCategory,
	getAdminInfo,
} from "../../api/getData";
export default {
	name: "AddBusiness",
	data() {
		return {
			city: {},
			form: {
				title: "", //店铺名称
				addr: "", //店铺地址
				tel: "", //联系电话
				description: "", //店铺简介
				slogan: "", //店铺标语
				class: "", //店铺分类
				is_premium: true, //品牌保证
				delivery_mode: true, //蜂鸟专送
				new: true, //新开店铺
				bao: true, //外卖保
				zhun: true, //准时达
				piao: true, //开发票
				float_delivery_fee: 5, //运费
				float_minimum_order_amount: 20, //起价
				startTime: "", //营业起始时间
				endTime: "", //营业结束时间
				image_path: "", //店铺头像
				business_license_image: "", //营业执照
				catering_service_license_image: "", //餐饮服务许可证
			},
			rules: {
				title: [{ required: true, message: "请输入店铺名称", trigger: "blur" }],
				addr: [{ required: true, message: "请输入详细地址", trigger: "blur" }],
				// tel: [
				// 	{ required: true, message: "请输入联系电话" },
				// 	{ type: "number", message: "电话号码必须是数字" },
				// ],
			},
			options: [
				{
					value: "满减优惠",
					label: "满减优惠",
				},
				{
					value: "优惠大酬宾",
					label: "优惠大酬宾",
				},
				{
					value: "新用户立减",
					label: "新用户立减",
				},
				{
					value: "进店领券",
					label: "进店领券",
				},
			],
			activityValue: "满减优惠",
			activities: [
				{
					icon_name: "减",
					name: "满减优惠",
					description: "满30减5,满60减8",
				},
			], //存储优惠活动
			selectedCategory: [["快餐便当", "简餐"]],
			categoryOptions: [],
			baseUrl,
			baseImgPath,
		};
	},
	mounted() {
		this.initData();
	},
	methods: {
		async initData() {
			try {
				this.city = (await cityGuess()).data;
				const categories = await foodCategory();
				categories.data.forEach((item) => {
					if (item.sub_categories.length) {
						const addnew = {
							value: item.value,
							label: item.name,
							children: [],
						};
						item.sub_categories.forEach((subitem, index) => {
							if (index === 0) {
								return;
							}
							addnew.children.push({
								value: subitem.name,
								label: subitem.name,
							});
						});
						console.log("xx", addnew);
						this.categoryOptions.push(addnew);
					}
				});
			} catch (err) {
				console.log(err);
			}
		},
		tableRowClassName(row, index) {
			if (index === 1) {
				return "info-row";
			} else if (index === 3) {
				return "positive-row";
			}
			return "";
		},
		//选择活动
		selectActivity(activityValue) {
			this.$prompt("请输入活动详情", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
			})
				.then(({ value }) => {
					if (value === null) {
						this.$message({
							type: "warning",
							message: "内容不能为空",
						});
					} else {
						let newObj = {};
						switch (activityValue) {
							case "满减优惠":
								newObj = {
									icon_name: "减",
									name: "满减优惠",
									description: value,
								};
								break;
							case "优惠大酬宾":
								newObj = {
									icon_name: "特",
									name: "优惠大酬宾",
									description: value,
								};
								break;
							case "新用户立减":
								newObj = {
									icon_name: "新",
									name: "新用户立减",
									description: value,
								};
								break;
							case "进店领券":
								newObj = {
									icon_name: "券",
									name: "进店领券",
									description: value,
								};
								break;
						}
						this.activities.push(newObj);
					}
				})
				.catch(() => {
					this.$message = {
						type: "info",
						message: "取消输入",
					};
				});
		},
		//关于位置信息的
		async querySearchAsync(queryString, cb) {
			//if (queryString) {
			try {
				const cityList = await searchplace({
					city_id: this.city.id,
					keyword: queryString || this.city.name,
					type: "search",
				});
				if (cityList.data instanceof Array) {
					cityList.data.map((item) => {
						item.value = item.address;
						return item;
					});
					cb(cityList.data);
				}
			} catch (err) {
				console.log(err);
			}
			//}
		},
		addressSelect(address) {
			console.log("xx", address);
			this.form.latitude = address.latitude;
			this.form.longitude = address.longitude;
			console.log(this.form.latitude, this.form.longitude);
		},
		//以下几个是关于图片上传的函数
		handleShopAvatarSuccess(res, file) {
			console.log(file);
			this.form.image_path = URL.createObjectURL(file.raw);
		},
		handleBusinessAvatarSuccess(res, file) {
			console.log(file);
			this.form.business_license_image = URL.createObjectURL(file.raw);
		},
		handleServiceAvatarSuccess(res, file) {
			console.log(file);
			this.form.catering_service_license_image = URL.createObjectURL(file.raw);
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === "image/jpeg";
			const isLt2M = file.size / 1024 / 1024 < 2;
			if (!isJPG) {
				this.$message.error("上传头像图片只能是 JPG 格式!");
			}
			if (!isLt2M) {
				this.$message.error("上传头像图片大小不能超过 2MB!");
			}
			return isJPG && isLt2M;
		},
		//表单提交
		submitForm() {
			this.$refs.form.validate(async (valid) => {
				if (valid) {
					const admin_id = await getAdminInfo();
					console.log(admin_id);
					Object.assign(
						this.form,
						{ activities: this.activities },
						{
							category: this.selectedCategory.join("/"),
						},
						{
							admin_id: admin_id,
						}
					);
					try {
						let result = await addShop(this.form);
						if (result.data.status === 1) {
							this.$message({
								type: "success",
								message: "添加成功",
							});
							this.form = {
								title: "", //店铺名称
								addr: "", //店铺地址
								tel: "", //联系电话
								description: "", //店铺简介
								slogan: "", //店铺标语
								class: "", //店铺分类
								is_premium: true, //品牌保证
								delivery_mode: true, //蜂鸟专送
								new: true, //新开店铺
								bao: true, //外卖保
								zhun: true, //准时达
								piao: true, //开发票
								float_delivery_fee: 5, //运费
								float_minimum_order_amount: 20, //起价
								startTime: "", //营业起始时间
								endTime: "", //营业结束时间
								image_path: "", //店铺头像
								business_license_image: "", //营业执照
								catering_service_license_image: "", //餐饮服务许可证
							};
							this.selectedCategory = ["快餐便当", "简餐"];
							this.activities = [
								{
									icon_name: "减",
									name: "满减优惠",
									description: "满30减5，满60减8",
								},
							];
						} else {
							this.$message({
								type: "error",
								message: result.data.message,
							});
						}
						console.log("失败", result);
					} catch (err) {
						console.log(err);
					}
				} else {
					this.$notify.error({
						title: "错误",
						message: "请检查输入是否正确",
						offset: 100,
					});
					return false;
				}
			});
		},
		//删除活动
		handleDelete(index) {
			this.$confirm("该操作将永久删除该活动信息", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(() => {
				this.activities.splice(index, 1).then(() => {
					this.$message({
						type: "success",
						message: "删除成功",
					});
				});
			});
		},
	},
};
</script>

<style lang="less" scoped>
.button_submit {
	text-align: center;
}
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
	border: 1px dashed #8c939d;
	border-radius: 5%;
}
.avatar {
	width: 120px;
	height: 120px;
	display: block;
}
.el-table .info-row {
	background: #c9e5f5;
}

.el-table .positive-row {
	background: #e2f0e4;
}
</style>
