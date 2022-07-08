<!--
 * @Date: 2022-06-17 18:12:23
 * @LastEditTime: 2022-06-22 21:35:44
-->
<template>
	<div class="edit">
		<div class="edit_container">
			<quill-editor
				v-model="content"
				ref="myQuillEditor"
				class="editor"
				:options="editorOption"
				@ready="onEditorReady($event)"
				style="height: 400px"
			></quill-editor>
		</div>
		<div class="submit_btn">
			<el-button type="primary" @click="submit">提交</el-button>
		</div>
	</div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
	name: "Edit",
	data() {
		return {
			content: "<h3>文本编辑</h3>",
			editorOption: {},
		};
	},
	components: {
		quillEditor,
	},
	computed: {
		editor() {
			return this.$refs.myQuillEditor.quill;
		},
	},
	methods: {
		onEditorReady(editor) {
			console.log("editor ready!", editor);
		},
		submit() {
			console.log(this.content);
			this.$message.success("提交成功！");
		},
	},
};
</script>

<style lang="less">
.edit_container {
	padding: 40px;
	margin-bottom: 40px;
}
.editer {
	height: 350px;
}
.submit_btn {
	text-align: center;
}
</style>
