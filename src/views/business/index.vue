<!--
 * @Date: 2022-06-17 16:17:57
 * @LastEditTime: 2022-06-29 14:31:39
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
			<el-table-column label="店铺名称" prop="title"> </el-table-column>
			<el-table-column label="店铺地址" prop="addr"> </el-table-column>
			<el-table-column label="店铺简介" prop="description"> </el-table-column>
			<el-table-column label="操作" width="350">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
						>编辑
					</el-button>
					<el-button
						size="mini"
						type="Success"
						@click="addFood(scope.$index, scope.row)"
						>添加食品
					</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.row)"
						>删除
					</el-button>
				</template>
			</el-table-column>
		</common-table-two>
		<el-dialog
			title="修改店铺信息"
			:append-to-body="true"
			:visible.sync="dialogFormVisible"
			:close-on-click-modal="false"
		>
			<el-form :model="selectTable">
				<el-form-item label="店铺名称" label-width="100px">
					<el-input v-model="selectTable.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="详细地址" label-width="100px">
					<el-autocomplete
						v-model="address.address"
						:fetch-suggestions="querySearchAsync"
						placeholder="请输入地址"
						style="width: 100%"
						@select="addressSelect"
					></el-autocomplete>
					<span>当前城市：{{ city.name }}</span>
				</el-form-item>
				<el-form-item label="店铺介绍" label-width="100px">
					<el-input v-model="selectTable.description"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" label-width="100px">
					<el-input v-model="selectTable.tel"></el-input>
				</el-form-item>
				<el-form-item label="店铺分类" label-width="100px">
					<el-cascader
						:options="categoryOptions"
						v-model="selectedCategory"
						change-on-select
					></el-cascader>
				</el-form-item>
				<el-form-item label="店铺图片" label-width="100px">
					<el-upload
						class="avatar-uploader"
						:action="baseUrl + '/v1/addimg/shop'"
						:show-file-list="false"
						:on-success="handleServiceAvatarScucess"
						:before-upload="beforeAvatarUpload"
					>
						<img
							v-if="selectTable.image_path"
							:src="baseImgPath + selectTable.image_path"
							class="avatar"
						/>
						<i v-else class="el-icon-plus avatar-uploader-icon"> </i>
					</el-upload>
				</el-form-item>
			</el-form>
			<div class="dialog-footer" slot="footer">
				<el-button @click="dialogFormVisible = false"> 取 消</el-button>
				<el-button type="primary" @click="updateShop"> 确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import CommonTableTwo from "../../components/CommonTableTwo.vue";
import { baseUrl, baseImgPath } from "../../config/env";
import {
	cityGuess,
	getResturants,
	getResturantsCount,
	foodCategory,
	updateResturant,
	searchplace,
	deleteResturant,
	getCategory,
} from "../../api/getData";
export default {
	name: "Business",
	components: {
		CommonTableTwo,
	},
	data() {
		return {
			baseUrl,
			baseImgPath,
			config: {
				currentPage: 1,
				total: 30,
				limit: 20,
				offset: 0,
			},
			tableLabel: [
				{
					prop: "title",
					label: "店铺名称",
				},
				{
					prop: "addr",
					label: "店铺地址",
				},
				{
					prop: "description",
					label: "店铺简介",
				},
				{
					prop: "id",
					label: "店铺ID",
				},
				{
					prop: "tel",
					label: "联系电话",
				},
				{
					prop: "score",
					label: "评分",
				},
				{
					prop: "total",
					label: "销售量",
				},
				{
					prop: "class",
					label: "分类",
				},
			],
			tableData: [],
			selectTable: {},
			selectedCategory: [],
			dialogFormVisible: false,
			categoryOptions: [],
			address: {},
			city: {},
		};
	},
	methods: {
		async initData() {
			try {
				this.city = (await cityGuess()).data;
				const countData = await getResturantsCount();
				if (countData.data.status === 1) {
					this.config.total = countData.data.count;
				} else {
					throw new Error("获取数据失败");
				}
				this.getResturants();
			} catch (err) {
				console.log("网络请求失败，数据获取失败", err);
			}
		},
		//编辑商家信息
		handleEdit(index, row) {
			console.log(row);
			this.selectTable = row;
			this.address.address = row.addr;
			this.dialogFormVisible = true;
			this.selectedCategory = row.class;
			if (!this.categoryOptions.length) {
				this.getCategory();
			}
		},
		//添加商品
		addFood(index, row) {
			this.$router.push({
				path: "add/addGoods",
				query: { resturant_id: row.id },
			});
		},
		//删除某商铺
		handleDelete(row) {
			this.$confirm("该操作将永久删除该商家信息", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				const id = row.id;
				const res = await deleteResturant(row.id);
				if (res.data.status === 1) {
					this.$message({
						type: "success",
						message: "删除成功",
					});
				} else {
					this.$message({
						type: "error",
						message: "删除失败",
					});
				}
				this.getResturants();
			});
		},
		sizeChange(num) {
			this.config.limit = num;
			this.config.currentPage = 1;
			this.config.offset = 0;
			this.getResturants();
		},
		changePage(page) {
			this.config.offset = this.config.limit * (page - 1);
			this.config.currentPage = page;
			this.getResturants();
		},
		//获取商铺列表
		async getResturants() {
			const { latitude, longitude } = this.city;
			console.log(latitude, longitude);
			const resturants = await getResturants({
				latitude,
				longitude,
				offset: this.config.offset,
				limit: this.config.limit,
			});
			this.tableData = [];
			resturants.data.forEach((item) => {
				const tableData = {};
				tableData.title = item.name;
				tableData.addr = item.address;
				tableData.description = item.description;
				tableData.id = item.id;
				tableData.tel = item.phone;
				tableData.score = item.rating;
				tableData.total = item.recent_order_num;
				tableData.class = item.category;
				tableData.image_path = item.image_path;
				this.tableData.push(tableData);
			});
		},
		//获取搜索的近似地址
		async querySearchAsync(queryString, cb) {
			try {
				const cityList = await searchplace({
					city_id: this.city.id,
					keyword: queryString || this.city.name,
					type: "search",
				});
				if (cityList.data instanceof Array) {
					cityList.map((item) => {
						item.value = item.address;
						return item;
					});
					cb(cityList.data);
				}
			} catch (err) {
				console.log(err);
			}
		},
		//选择地址
		addressSelect(value) {
			const { address, latitude, longitude } = value;
			this.address = { address, latitude, longitude };
		},
		//获取商铺种类
		async getCategory() {
			try {
				const categories = await foodCategory();
				categories.data.forEach((item) => {
					if (item.sub_categories.length) {
						const addnew = {
							value: item.name,
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
						this.categoryOptions.push(addnew);
					}
				});
			} catch (err) {
				console.log("获取商铺种类失败", err);
			}
		},
		handleServiceAvatarScucess(res, file) {
			if (res.status == 1) {
				this.selectTable.image_path = res.image_path;
			} else {
				this.$message.error("上传图片失败！");
			}
		},
		beforeAvatarUpload(file) {
			const isRightType =
				file.type === "image/jpeg" || file.type === "image/png";
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isRightType) {
				this.$message.error("上传头像图片只能是 JPG 格式!");
			}
			if (!isLt2M) {
				this.$message.error("上传头像图片大小不能超过 2MB!");
			}
			return isRightType && isLt2M;
		},
		//更新店铺信息
		async updateShop() {
			this.dialogFormVisible = false;
			try {
				Object.assign(this.selectTable, this.address);
				this.selectTable.class = this.selectedCategory.join("/");
				const res = await updateResturant(this.selectTable);
				if (res.data.status === 1) {
					this.$message({
						type: "success",
						message: "更新店铺信息成功",
					});
					this.getResturants();
				} else {
					this.$message({
						type: "error",
						message: res.data.message,
					});
				}
			} catch (err) {
				console.log("更新店铺信息失败");
			}
		},
	},
	created() {
		this.initData();
	},
};
</script>

<style></style>
