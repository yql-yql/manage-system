<!--
 * @Date: 2022-06-13 10:34:48
 * @LastEditTime: 2022-06-16 16:58:45
-->

<template>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item v-for="item in formLabel" :key="item.label" :label="item.label">
        <el-input v-if="item.type === 'input'"  :placeholder="'请输入' + item.label " v-model="form[item.model]"></el-input>
        <el-switch v-if="item.type === 'switch'" v-model="form[item.model]"></el-switch>
        <el-date-picker v-if="item.type === 'date'" type="date" v-model="form[item.model]" placeholder="--请选择日期--" value-format="yyyy-MM-dd"></el-date-picker>
        <el-select v-if="item.type === 'select'" placeholder="--请选择--" v-model="form[item.model]">
          <el-option v-for="li in item.opts" :key="li.value" :label="li.label" :value="li.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item><slot></slot></el-form-item>
    </el-form>
</template>

<script>
export default {
  name:'CommonForm',
  props:{
    formLabel:Array,
    form:Object,
    inline:Boolean
  },
  data(){
    return {
    }
  },
}
</script>

<style>

</style>