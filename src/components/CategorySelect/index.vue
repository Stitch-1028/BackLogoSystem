<template>
  <div>
    <el-form :inline="true"  class="demo-form-inline" :model='categoryForm'>
      <el-form-item label="一级分类">
        <el-select  placeholder="请选择" v-model="categoryForm.c1Id" @change="getC2List(categoryForm.c1Id)">
          <el-option :label="c1.name" v-for="(c1,index) in List1" :key="c1.d" :value="c1.id" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select  placeholder="请选择" v-model="categoryForm.c2Id" @change="getC3List(categoryForm.c2Id)">
          <el-option v-for="(c2,index) in List2" :key="c2.id" :value="c2.id" :label="c2.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select  placeholder="请选择" v-model="categoryForm.c3Id" @change="getCateGory" >
          <el-option v-for="(c3,index) in List3" :key="c3.id" :value="c3.id" :label="c3.name"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  data() {
    return {
       List1:[],
       List2:[],
       List3:[],
       categoryForm:{
         c1Id:'',
         c2Id:'',
         c3Id:'',
       }
    };
  },
  methods: {
    async getCategory1List(){
      let result = await this.$API.attr.reqCategory1List()
          if(result.code == 200){
            this.List1 = result.data
        };
    },
    async getC2List(c1Id){
      // 通过一级分类Id获取二级分类菜单
      this.List2 = [];this.categoryForm.c2Id = ''
      this.List3 = [];this.categoryForm.c3Id = ''
      let result = await this.$API.attr.reqCategory2List(c1Id)
      if(result.code == 200){
        this.List2 = result.data
      }
    },
    async getC3List(c2Id){
      // 通过二级分类Id获取三级分类菜单
      this.List3 = [];this.categoryForm.c3Id = ''
      let result = await this.$API.attr.reqCategory3List(c2Id)
      if(result.code == 200){
        this.List3 = result.data
      }
    },
    async getCateGory(){
      // 发送请求
      let result = await this.$API.attr.reqGetCateGory(this.categoryForm)
      if(result.code == 200){
        let didi = {
          data:result.data,
          category1Id:this.categoryForm.c1Id,
          category2Id:this.categoryForm.c2Id,
          category3Id:this.categoryForm.c3Id,
          requestData:this.categoryForm
        }

        this.$emit('getCategoryForm',didi)
      }
    },
  },
  mounted() {
    this.getCategory1List()
  },
  
}
</script>

<style>
</style>