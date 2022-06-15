<template>
  <el-dialog :title="`${tittle}的列表`" :visible.sync="isShow" :before-close="closeTable">
    <el-table :data="List" border v-loading="looding">

      <el-table-column
        property="date"
        label="名称"
        width="150"
        prop="skuName"
      ></el-table-column>

      <el-table-column
        property="name"
        label="价格"
        width="200"
        prop="price"
      ></el-table-column>

      <el-table-column property="address" label="重量" prop="weight"></el-table-column>

      <el-table-column property="address" label="默认图片">
        <template slot-scope="{row,$index}">
          <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px">
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>

  
</template>

<script>
export default {
  name: "Dalog",
  data() {
    return {
      id:'',
    }
  },
  props:["isShow","List","tittle","looding"],
  methods: {
    closeTable(){
      this.$emit("closeTalbe")
    },

  },
  computed:{
    fullscreenLoading(){
      if(this.List.length>0){
        return false
      }else{
        return true
      }
    }
  }
};
</script>

<style>
</style>