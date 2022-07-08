<!--
 * @Date: 2022-06-17 18:09:18
 * @LastEditTime: 2022-07-01 18:11:19
-->
<template>
	<div>
		<common-table-two
			:tableData="tableData"
			:tableLabel="tableLabel"
			:config="config"
			@changePage="changePage"
			@sizeChange="sizeChange"
			class="table"
		>
			<el-table-column label="商品名称" prop="goods_title"> </el-table-column>
			<el-table-column label="商品介绍" prop="goods_description">
			</el-table-column>
			<el-table-column label="评分" prop="goods_score"> </el-table-column>
			<el-table-column label="操作" width="350">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
						>编辑
					</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.row)"
						>删除
					</el-button>
				</template>
			</el-table-column>
		</common-table-two>
		<el-dialog
			title="修改商品信息"
			:visible.sync="dialogFormVisible"
			:close-on-click-modal="false"
			:append-to-body="true"
			ref="dialog"
		>
			<common-form
				:form="selectTable"
				:formLabel="selectTableLabel"
				:config="config"
				@handleSelect="handleSelect"
				@handleServiceAvatarScucess="handleServiceAvatarScucess"
				@beforeAvatarUpload="beforeAvatarUpload"
			></common-form>
			<el-row style="overflow: auto; text-align: center">
				<el-table
					:data="specs"
					style="margin-bottom: 20px"
					:row-class-name="tableRowClassName"
				>
					<el-table-column prop="specs" label="规格"></el-table-column>
					<el-table-column prop="packing_fee" label="包装费"></el-table-column>
					<el-table-column prop="price" label="价格"></el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button
								size="small"
								type="danger"
								@click="deleteSpecs(scope.$index)"
								>删除</el-button
							>
						</template>
					</el-table-column>
				</el-table>
				<el-button
					type="primary"
					@click="specsFormVisible = true"
					style="margin-bottom: 10px"
					>添加规格</el-button
				>
			</el-row>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="updateGoods">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog
			title="添加规格"
			v-model="specsFormVisible"
			:visible.sync="specsFormVisible"
		>
			<el-form :rules="specsFormrules" :model="specsForm">
				<el-form-item label="规格" label-width="100px" prop="specs">
					<el-input v-model="specsForm.specs" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="包装费" label-width="100px">
					<el-input-number
						v-model="specsForm.packing_fee"
						:min="0"
						:max="100"
					></el-input-number>
				</el-form-item>
				<el-form-item label="价格" label-width="100px">
					<el-input-number
						v-model="specsForm.price"
						:min="0"
						:max="10000"
					></el-input-number>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="specsFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addspecs">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import {
	getFoods,
	getFoodsCount,
	getMenu,
	updateFood,
	deleteFood,
	getResturantDetail,
	getMenuById,
	getCategory,
} from "../../api/getData";
import CommonTableTwo from "../../components/CommonTableTwo.vue";
import CommonForm from "../../components/CommonForm";
export default {
	name: "Goods",
	components: {
		CommonTableTwo,
		CommonForm,
	},
	data() {
		return {
			restaurant_id: null,
			dialogFormVisible: false, //编辑商品开关
			specsFormVisible: false, //规格弹窗开关
			config: {
				currentPage: 1,
				total: 30,
				limit: 20,
				offset: 0,
				selectMenu: {},
				selectIndex: null,
				menuOptions: [],
			},
			tableLabel: [
				{
					prop: "goods_title",
					label: "商品名称",
				},
				{
					prop: "title",
					label: "商家名称",
				},
				{
					prop: "goods_id",
					label: "商品ID",
				},
				{
					prop: "id",
					label: "商家ID",
				},
				{
					prop: "goods_description",
					label: "商品介绍",
				},
				{
					prop: "addr",
					label: "商家地址",
				},
				{
					prop: "goods_score",
					label: "商品评分",
				},
				{
					prop: "goods_class",
					label: "分类",
				},
				{
					prop: "goods_total",
					label: "月销售",
				},
			],
			tableData: [],
			selectTable: {}, //要编辑的商品信息
			selectTableLabel: [
				{
					label: "商品名称",
					prop: "goods_title",
					type: "input",
				},
				{
					label: "商品介绍",
					prop: "goods_description",
					type: "input",
				},
				{
					label: "商品分类",
					prop: "goods_class",
					type: "select",
				},
				{
					label: "商品图片",
					prop: "goods_image",
					type: "avatar",
				},
			],

			specsForm: {
				specs: "",
				packing_fee: 0,
				price: 20,
			},
			specsFormrules: {
				specs: [{ required: true, message: "请输入规格", trigger: "blur" }],
			},
			specsFormVisible: false,
			expendRow: [],
		};
	},
	computed: {
		specs: function () {
			let specs = [];
			if (this.selectTable.specfoods) {
				this.selectTable.specfoods.forEach((item) => {
					specs.push({
						specs: item.specs_name,
						packing_fee: item.packing_fee,
						price: item.price,
					});
				});
			}
			return specs;
		},
	},
	methods: {
		//编辑商品信息
		handleEdit(index, row) {
			this.getSelectItemData(row, index, "edit");
			this.dialogFormVisible = true;
		},
		//获取选中的商品信息
		async getSelectItemData(row, index, type) {
			console.log(index, row);
			const restaurant = await getResturantDetail(row.id);
			const category = await getMenuById(row.class_id);
			this.selectTable = {
				...row,
				...{
					restaurant_name: restaurant.data.name,
					restaurant_address: restaurant.data.address,
					category_name: category.data.name,
				},
			};
			console.log(this.selectTable);
			this.config.selectMenu = {
				label: category.data.name,
				value: row.class_id,
			};
			this.tableData.splice(index, 1, { ...this.selectTable });
			this.$nextTick(() => {
				this.expendRow.push(index);
			});
			if (type === "edit" && this.restaurant_id != row.id) {
				this.getMenu();
			}
		},
		//删除商品
		handleDelete(row) {
			try {
				this.$confirm("确认删除？", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				}).then(async () => {
					console.log(row);
					const res = await deleteFood(row.goods_id);
					console.log(res);
					if (res.data.status === 1) {
						this.$message({
							type: "success",
							message: "删除成功",
						});
						this.tableData.splice(row.index, 1);
					} else {
						throw new Error(res.message);
					}
				});
			} catch (err) {
				this.$message({
					type: "error",
					message: err.message,
				});
				console.log("删除商品失败");
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
		//每页条数改变
		sizeChange(num) {
			this.config.limit = num;
			this.config.currentPage = 1;
			this.getGoods();
		},
		//页数跳转
		changePage(page) {
			this.config.currentPage = page;
			this.config.offset = this.config.limit * (page - 1);
			this.getGoods();
		},
		async initData() {
			try {
				const countData = await getFoodsCount({
					restaurant_id: this.restaurant_id,
				});
				if (countData.data.status === 1) {
					this.config.total = countData.data.count;
				} else {
					throw new Error("获取数据失败");
				}
				this.getGoods();
			} catch (err) {
				console.log("获取数据失败", err);
			}
		},
		async getMenu() {
			this.config.menuOptions = [];
			try {
				const menu = await getMenu({
					restaurant_id: this.selectTable.id,
					allMenu: true,
				});
				console.log("menu", menu);
				menu.data.forEach((item, index) => {
					this.config.menuOptions.push({
						label: item.name,
						value: item.id,
						index,
					});
				});
			} catch (err) {
				console.log("获取商品种类失败", err);
			}
		},
		async getGoods() {
			const Goods = await getFoods({
				offset: this.config.offset,
				limit: this.config.limit,
				restaurant_id: this.restaurant_id,
			});
			this.tableData = [];
			Goods.data.forEach((item, index) => {
				const tableData = {};
				tableData.goods_title = item.name;
				tableData.goods_id = item.item_id;
				tableData.goods_description = item.description;
				tableData.goods_score = item.rating;
				tableData.goods_total = item.month_sales;
				tableData.id = item.restaurant_id;
				tableData.class_id = item.category_id;
				tableData.goods_image = item.image_path;
				tableData.specfoods = item.specfoods;
				tableData.index = index;
				this.tableData.push(tableData);
			});
			this.getResturantById();
			this.getClassbyID();
			console.log(this.tableData);
		},
		//根据id获取店铺信息
		getResturantById() {
			this.tableData.forEach(async (item) => {
				const object = await getResturantDetail(item.id); //这个将异步的接口封装，同步化
				let title = "";
				let addr = "";
				if (object.data) {
					title = object.data.name;
					addr = object.data.address;
				}
				item["title"] = title;
				item["addr"] = addr;
			});
		},
		//根据类别id获取类别名称
		getClassbyID() {
			this.tableData.forEach(async (item) => {
				const object = await getMenuById(item.class_id); //这个将异步的接口封装，同步化
				console.log(object);
				let goods_class = "";
				if (object.data) {
					goods_class = object.data.name;
				}
				item["goods_class"] = goods_class;
				console.log(item, "ssssssss");
			});
		},
		handleSelect(index) {
			this.config.selectIndex = index;
			this.config.selectMenu = this.config.menuOptions[index];
		},
		handleServiceAvatarScucess(res, file) {
			console.log("suw", res);
			if (res.status == 1) {
				this.selectTable.goods_image = res.image_path;
			} else {
				this.$message.error("上传图片失败！");
			}
		},
		beforeAvatarUpload(file) {
			const isRightType =
				file.type === "image/jpeg" || file.type === "image/png";
			const isLt2M = file.size / 1024 / 1024 < 2;
			this;
			if (!isRightType) {
				this.$message.error("上传头像图片只能是 JPG 格式!");
			}
			if (!isLt2M) {
				this.$message.error("上传头像图片大小不能超过 2MB!");
			}
			return isRightType && isLt2M;
		},
		//添加规格
		addspecs() {
			this.specs.push({ ...this.specsForm });
			this.specsForm.specs = "";
			this.specsForm.packing_fee = 0;
			this.specsForm.price = 20;
			this.specsFormVisible = false;
		},
		//删除规格
		deleteSpecs(index) {
			this.specs.splice(index, 1);
		},
		//提交商品信息表单
		async updateGoods() {
			this.dialogFormVisible = false;
			try {
				const subData = {
					new_category_id: this.config.selectMenu.value,
					specs: this.specs,
				};
				const postData = { ...this.selectTable, ...subData };
				const res = await updateFood(postData);
				if (res.data.status === 1) {
					this.$message({
						type: "success",
						message: "更新商品信息成功！",
					});
					this.getGoods();
				} else {
					this.$message({
						type: "error",
						message: res.data.message,
					});
				}
			} catch (err) {
				console.log("更新商铺信息失败", err);
			}
		},
	},
	created() {
		this.restaurant_id = this.$route.query.restaurant_id;
		this.initData();
	},
};
</script>

<style lang="less" scoped>

</style>
