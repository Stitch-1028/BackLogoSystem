<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect
        @getCategoryForm="getCategoryForm"
        v-if="IsShowCategorySelect"
      ></CategorySelect>
    </el-card>

    <el-card v-if="scene == 0">
      <el-button type="primary" icon="el-icon-plus" @click="increaseSPU"
        >添加SPU</el-button
      >
      <el-table border style="margin-top: 20px" :data="list">
        <el-table-column
          align="center"
          width="100px"
          label="序号"
          height="50"
          type="index"
        >
        </el-table-column>

        <el-table-column label="SPU名称" prop="spuName"> </el-table-column>

        <el-table-column label="SPU描述" prop="description"> </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="{ row, $index }">
            <el-tooltip content="添加" placement="top">
              <el-button type="success" icon="el-icon-plus" @click="AddSku(row)"></el-button>
            </el-tooltip>
            <el-tooltip content="编辑" placement="top">
              <el-button
                type="warning"
                icon="el-icon-plus"
                @click="updateSPU(row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="记录" placement="top">
              <el-button type="info" icon="el-icon-plus" @click="showTable(row)"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button type="danger" icon="el-icon-plus"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="text-align: center; margin-top: 20px"
        background
        layout="prev, pager, next, sizes"
        :total="total"
        :page-size="limit"
        :current-page="page"
        @current-change="currentChange"
        :page-sizes="[3, 5, 7]"
        @size-change="sizeChange"
      >
      </el-pagination>
    </el-card>

    <!-- 添加SPU隐藏模块 -->
    <el-card v-if="scene == 1">
      <el-form ref="SPUform" :model="SPUform" label-width="80px">
        <!-- input SPU名称 -->
        <el-form-item label="SPU名称">
          <el-input placeholder="SPU名称" v-model="SPUform.spuName"></el-input>
        </el-form-item>

        <!-- select下拉框 SPU品牌 -->
        <el-form-item label="SPU品牌">
          <el-select
            v-model="SPUform.tmId"
            placeholder="请选择"
            @change="findSPUTrademarkImg(SPUform.tmId)"
          >
            <el-option
              :label="item.tmName"
              v-for="(item, index) in SPUform.TrademarkList"
              :key="index"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- input多行输入 SPU描述 -->
        <el-form-item label="SPU描述">
          <el-input
            type="textarea"
            v-model="SPUform.description"
            rows="4"
          ></el-input>
        </el-form-item>

        <!-- upload上传图片 SPU图片 -->
        <el-form-item label="SPU图片">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件,且不超过2M
            </div>
          </el-upload>
        </el-form-item>

        <!-- select下拉框 销售属性 -->
        <el-form-item label="销售属性">
          <el-select
            v-model="spusalesAttribute"
            placeholder="请选择"
          >
            <el-option
              :label="item.name"
              v-for="(item, index) in spuSaleAttrList"
              :key="index"
              :value="`${item.id}:${item.name}`"
            >
            </el-option>
          </el-select>
          <el-button
            type="primary"
            icon="el-icon-plus"
            :disabled="spusalesAttribute == ''"
            @click="AddSpusalesAttribute"
            >添加销售属性</el-button
          >
        </el-form-item>

        <!-- 属性列表 -->
        <el-table
          ref="tableOfspuSaleAttrList"
          border
          style="margin: 20px 80px"
          :data="SPUform.spuSaleAttrList"
        >
          <el-table-column
            align="center"
            width="100px"
            label="序号"
            height="50"
            type="index"
          >
          </el-table-column>

          <el-table-column label="属性名" prop="saleAttrName">
          </el-table-column>

          <el-table-column label="属性值名称列表" prop="spuSaleAttrValueList">
            <template slot-scope="{ row, $index }">
              <el-tag
                v-for="(tag, index) in row.spuSaleAttrValueList"
                :key="tag.id"
                closable
                :disable-transitions="false"
                @close="handleClose(row,index)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row)"
                >+ New Tag</el-button
              >
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="{row,$index}">
              <el-button type="danger" icon="el-icon-delete" @click="SPUform.spuSaleAttrList.splice($index,1)"></el-button>
            </template>  
          </el-table-column>
        </el-table>

        <el-button type="primary" style="margin-left: 80px" @click="save"
          >保存</el-button
        >
        <el-button @click="exit">取消</el-button>
      </el-form>
    </el-card>

       <!-- 添加SKU -->
    <el-card v-if="scene == 2">
      <el-form ref="SKUform" :model="SKUform" label-width="80px">
        <!-- SPU名称 -->
        <el-form-item label="SPU名称" size="medium" v-model="SKUform.spuName">{{SKUform.spuName}}</el-form-item>

        <!-- SKU名称 -->
        <el-form-item label="SKU名称">
          <el-input v-model="SKUform.skuName" placeholder="SKU名称"></el-input>
        </el-form-item>

        <!-- 价格price -->
        <el-form-item label="价格(元)">
          <el-input  v-model="SKUform.price" placeholder="价格(元)" oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
        </el-form-item>

        <!-- 重量(千克) -->
        <el-form-item label="重量(千克)">
          <el-input
            v-model="SKUform.weight"
            placeholder="重量(千克)"
          ></el-input>
        </el-form-item>

        <!-- 规格描述 -->
        <el-form-item label="规格描述">
          <el-input
            v-model="SKUform.skuDesc"
            placeholder="规格描述"
            type="textarea"
            rows="4"
          ></el-input>
        </el-form-item>

        <!-- 平台属性 -->
        <el-form-item label="平台属性">
          <el-form ref="form" :inline="true" label-width="80px">

            <el-form-item :label="item.attrName" v-for="(item,index) in attrInfoList" :key="item.id">
               <el-select  placeholder="请选择" v-model="item.attrIdAndAttrValueId" >
                 <el-option :label="p.valueName" v-for="(p,i) in item.attrValueList" :value="`${item.id}:${p.id}`"  :key="p.id"></el-option>
              </el-select>
            </el-form-item>

          </el-form>
        </el-form-item>

        <el-form-item label="销售属性" >
          <el-form  :inline="true"  label-width="80px">

            <el-form-item :label="item.saleAttrName" v-for="(item, index) in spuSaleAttrListOfSku" :key="item.id">
            <el-select v-model="item.salesAttribute" placeholder="">
              <el-option :label="attr.saleAttrValueName" v-for="(attr,i) in item.spuSaleAttrValueList" :key="attr.id" :value="`${item.id}:${attr.id}`"></el-option>
            </el-select>
          </el-form-item>

          </el-form>
        </el-form-item>

        <el-form-item label="图片列表">
          <el-table
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :data="SKUform.imageList"
          >
          <!-- 选择器 -->
            <el-table-column
              label=""
              width="70px"
              type="selection"
            ></el-table-column>


            <el-table-column label="图片">
              <template slot-scope="{row,$index}">
                <img :src="row.imgUrl" style="width: 100px; height: 100px" />
              </template>
            </el-table-column>


            <el-table-column label="名称" prop="imgName"></el-table-column>


            <el-table-column label="操作">
              <el-button type="primary" size="mini">设为默认</el-button>
            </el-table-column>


          </el-table>
        </el-form-item>

        <el-button style="margin-left: 80px" type="primary" @click="saveSkuInfo()">保存</el-button>
        <el-button style="margin-left: 20px" @click="exitSKUform">取消</el-button>
      </el-form>
    </el-card>

    <!-- sku列表弹框 -->
      <Dalog :isShow="isShow" :List="look" :tittle="tittle" @closeTalbe="closeTalbe" :looding="looding"></Dalog>
  </div>
</template>

<script>
import Dalog from './Dalog'
export default {
  components:{Dalog},
  name: "Spu",
  data() {
    return {
      IsShowCategorySelect: true, // 是否展示三级分类栏
      // 分类Id,
      category1Id: "",
      category2Id: "",
      category3Id: "",
      total: 0, // 总条数
      limit: 5, // 每页几条数据
      page: 1, // 当前第几页
      list: [], // 数据来源
      //  SPUform表单
      SPUform: {
        category3Id: "",
        spuName: "", //   SPU名称
        description: "", //   SPU描述
        spuSaleAttrList: [], //   SPU销售属性列表
        spuImageList: [], // spu图片数组
        tmId: "",
        spusalesAttribute: null,
      },
      //  SKUform表单
      SKUform: {
        spuName: "", // SPU名称
        skuname: "", // SKU名称
        price: 0, // 价格
        weight: "", //重量
        description: "", // 规格描述
        attrInfoList:[],
        spuSaleAttrList:[],
        salesAttribute: "", //销售属性
      },
      // 平台属性
      platformAttribute: {
        
      },
      imageUrl: "", //  图片地址
      AddOrEdit: 0, //判断是新增SPU还是修改SPU
      scene: 0, // 0、展示List数据  1、添加SPU||修改SPU 2、添加SKU||修改SKU
      isIndeterminate: true, // 不确定是否全选
      checkAll: false, //全选
      beforeUpdateImgTable: [], //图片列表
      afterUpdateImgTable: [], //图片列表
      inputVisible:false,
      inputValue:'',
      spuSaleAttrList:[],
      spusalesAttribute:'',
      // sku的平台属性
      attrInfoList:[],
      // sku的销售属性
      spuSaleAttrListOfSku:[],
      isShow:false,
      look:[],
      tittle:'',
      looding:true
    };
  },
  methods: {
    // 刷新页面
    async getSPUList(page, limit, category3Id) {
      let result = await this.$API.spu.reqGetSPUList(page, limit, category3Id);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    // 跳转页面
    currentChange(thisPage) {
      this.page = thisPage;
      this.getSPUList(this.page, this.limit, this.category3Id);
    },
    // 每页数据展示
    sizeChange(size) {
      this.limit = size;
      this.getSPUList(this.page, this.limit, this.category3Id);
    },
    //点击添加SPU 然后隐藏列表数据
    async increaseSPU() {
       // 获取SPU品牌
      let result = await this.$API.spu.reqGetTrademarkList();
      let result1 = await this.$API.spu.reqBaseSaleAttrList();
       Promise.all([result,result1]).then(
        (resonse) => {
          console.log(resonse);
          // 该SPU详情信息
          this.SPUform.TrademarkList = resonse[0].data;
          this.spuSaleAttrList = resonse[1].data;
          this.SPUform.category3Id = this.category3Id
          this.scene = 1;
        },
        (reject) => {
          console.log(reject);
        }
      );
      
    },
    // 修改SPU
    async updateSPU(row) {
      console.log(row);
      // 获取SPU信息
      let result = await this.$API.spu.reqGetSPUinformation(row.id);
      // 获取SPU品牌
      let result1 = await this.$API.spu.reqGetTrademarkList();
      // 获取图片信息
      let result2 = await this.$API.spu.reqSpuImageList(row.id);
      let result3 = await this.$API.spu.reqBaseSaleAttrList();
      Promise.all([result,result1,result2,result3]).then(
        (resonse) => {
          // 该SPU详情信息
          this.SPUform = resonse[0].data;
          // 品牌列表
          this.SPUform.TrademarkList = resonse[1].data;
          //图片列表
          this.SPUform.spuImageList = resonse[2].data;
          this.spuSaleAttrList = resonse[3].data;
        },
        (reject) => {
          console.log(reject);
        }
      );
      this.scene = 1;
    },
    // 图片上传成功回调函数
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 图片上传前回调函数
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
    // 取消新增
    exit() {
      this.scene = 0;
      this.SPUform = {}
    },
    // 获取三级联动数据
    async getCategoryForm(didi) {
      this.category1Id = didi.category1Id;
      this.category2Id = didi.category2Id;
      this.category3Id = didi.category3Id;
      this.scene = 0;
      this.getSPUList(this.page, this.limit, this.category3Id);
    },
    // 全选
    handleSelectionChange(val) {
      this.afterUpdateImgTable = val;
    },
    //查找SPU对应的图片
    findSPUTrademarkImg(tmId) {
      this.imageUrl = this.SPUform.TrademarkList[11].logoUrl;
    },
    // 保存 并 提交
    async save() {
      console.log(this.SPUform);
      if(this.SPUform.id){
      let result = await this.$API.spu.reqUpdateSpuInfo(this.SPUform);
      if (result.code == 200) {
        console.log("@@@");
        this.scene = 0;
        this.getSPUList(this.page, this.limit, this.category3Id);
        this.$message("修改成功")
        this.SPUform = {}
      }
      }else{
      let result = await this.$API.spu.reqSaveSpuInfo(this.SPUform);
      if (result.code == 200) {
        console.log("@@@");
        this.scene = 0;
        this.getSPUList(this.page, this.limit, this.category3Id);
      }
      this.$message("添加成功")
      this.SPUform = {}
      }
      
    },
    // 删除SPU属性标签
    handleClose(row,index) {
      row.spuSaleAttrValueList.splice(index,1)
    },
    // 属性输入Input
    showInput(row) {
      this.$set(row,"inputVisible",true)
      this.$set(row,"inputValue","")
    },
    handleInputConfirm(row) {
        console.log(row);
        const {baseSaleAttrId,inputValue} = row
        if(inputValue.trim() === ""){
          this.$message("属性值不可为空")
          return;
        }
        if(row.spuSaleAttrValueList.some((item)=>{return item.saleAttrValueName == inputValue})){
          this.$message("属性值不可重复")
          return;
        }
        row.spuSaleAttrValueList.push({
          baseSaleAttrId,
          saleAttrValueName:inputValue
        })
        row.inputVisible = false
    },
    // 添加销售属性
    AddSpusalesAttribute(){
      let arr = this.spusalesAttribute.split(":")
      // 整理出一个完整的数组 放到SPUform.spuSaleAttrList
      let result = {
        baseSaleAttrId:arr[0],
        saleAttrName:arr[1],
        spuSaleAttrValueList:[]
      }
      this.SPUform.spuSaleAttrList.push(result)

      this.spusalesAttribute = ""
    },
    //新增SKU
    async AddSku(row){
      console.log(row);
      this.scene = 2
      this.SKUform = row
      let result = await this.$API.sku.reqSpuImageList(row.id)
      if(result.code == 200){
        this.SKUform.skuImageList = result.data
      }

      let result1 = await this.$API.sku.reqSpuSaleAttrList(row.id)
      if(result1.code == 200){
        // 销售属性
        this.spuSaleAttrListOfSku = result1.data
      }

      let result2 = await this.$API.sku.reqAttrInfoList(this.category1Id,this.category2Id,this.category2Id)
      if(result2.code == 200){
        // 平台属性
        this.attrInfoList = result2.data
      }
    },
    exitSKUform(){
      this.SKUform = {}
      this.scene = 0
    },
    async saveSkuInfo(){
      
      // 整理对象 调用接口
      let data = this.SKUform
      let skuAttrValueList = []
      // 平台属性
      this.attrInfoList.map((item)=>{
        if(item.attrIdAndAttrValueId){
          let attrAndValue = item.attrIdAndAttrValueId.split(":")
          let result = {
             attrId:attrAndValue[0],
             valueId:attrAndValue[1]
          }
          skuAttrValueList.push(result)
        }
      })

      //销售属性
      let skuSaleAttrValueList=[]
      this.spuSaleAttrListOfSku.map((item)=>{
        if(item.salesAttribute){
          const [saleAttrId,saleAttrValueId] = item.salesAttribute.split(":")
          skuSaleAttrValueList.push({saleAttrId,saleAttrValueId})
        }
      })

      data.skuAttrValueList = skuAttrValueList
      data.skuSaleAttrValueList = skuSaleAttrValueList

      let result = await this.$API.sku.reqSaveSkuInfo(data)
      if(result.code == 200){
        this.SKUform = {}
        this.scene = 0
      }
    },
    async showTable(row){
       this.isShow=true
       let result = await this.$API.sku.reqSkuList(row.id)
       if(result.code == 200){
          this.look = result.data
          this.tittle= row.spuName
          this.looding=false
       }
      
    },
    closeTalbe(){
      this.isShow = false
    }
    
  },
  computed: {},
  watch: {},
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>