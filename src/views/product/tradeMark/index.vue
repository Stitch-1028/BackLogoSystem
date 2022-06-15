<template>
  <div>
    <!-- 按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0px"
      @click="openDalog('添加品牌')"
      >添加</el-button
    >
    <!-- 对话框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form
        :model="tmForm"
        style="width: 600px"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件,且不超过2M
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 表格组件 -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column
        type="index"
        label="序号"
        width="120px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
      ></el-table-column>
      <el-table-column label="品牌LOGO" width="width">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateDalog(row)"
            >修改
          </el-button>
          <el-button type="success" icon="el-icon-delete" size="mini" @click="deleteItem(row)" >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

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
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    var checkAddOrUpdate = (rule, value, callback)=>{
      if(value.length <2 || value.length>10){
       console.log("请输入2——10个字符之间的文字");
      }else{
        callback()
      }
    }
    var checkImgLogo = (rule, value, callback)=>{
        if(value != ''){
          callback()
        }else{
          // console.log('请点击品牌图片区域');
          callback(new Error('请点击品牌图片区域'))
        }
    }
    return {
      //  当前页数
      page: 1,
      //  当前页数展示的条数
      limit: 3,
      //  总条数
      total: 0,
      // 列表展示的数据
      list: [],
      //  对话框默认不显示
      dialogFormVisible: false,
      //  操作框标题
      title: "",
      //  图片地址
      imageUrl: "",
      //表单数据
      tmForm: {
        logoUrl: "",
        // 品牌名称
        tmName: "",
      },
      rules: {
        // 品牌名称的验证规则
        tmName: [
          // { validator: checkAddOrUpdate, required: true,trigger: 'change' }
          { required: true, message: "请输入品牌名称", trigger: "change" },
          { min: 2, max: 5, message: "长度在2~5个字符之间", trigger: "change" },
        ],
        // 品牌logo的验证规则
        logoUrl: [
          // { required: true, message: "请点击品牌图片区域" }
          { validator: checkImgLogo, required: true }
          ],
      },
    };
  },
  mounted() {
    this.baseTrademark();

    console.log("&&&&",this);
  },
  methods: {
    getData() {},
    // 刷新页面
    async baseTrademark(page = 1) {
      const { limit } = this;
      let result = await this.$API.tradeMark.reqTradeMarkList(page, limit);
      if (result.code == 200) {
        this.list = result.data.records;
        this.total = result.data.total;
        this.page = page;
      }
    },
    // 跳转页面
    currentChange(thisPage) {
      this.page = thisPage;
      this.baseTrademark(this.page);
    },
    // 每页数据展示
    sizeChange(size) {
      this.limit = size;
      this.baseTrademark(this.page);
    },
    // 新增弹窗
    openDalog() {
      this.title = "新增品牌";
      this.dialogFormVisible = true;
    },
    // 修改弹窗
    updateDalog(row) {
      console.log(row);
      this.title = "修改品牌";
      this.tmForm = { ...row };
      this.dialogFormVisible = true;
    },
    // 图片上传成功回调
    handleAvatarSuccess(res, file) {
      console.log(res);
      // this.tmForm.logUrl = URL.createObjectURL(file.raw);
      this.tmForm.logoUrl = res.data;
    },
    // 图片上传前回调钩子
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //确认新增或修改
    confirm() {
      try {
        if (this.tmForm.id) {
           this.$refs.ruleForm.validate(async (success) => {
         if(success){
         let result = await this.$API.tradeMark.updateTradeMarkList(
            this.tmForm
          );
          console.log(result);
          if (result.code == 200) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.baseTrademark(this.page);
            this.tmForm.logoUrl = "";
            this.tmForm.tmName = "";
            this.tmForm.id = undefined;
            this.dialogFormVisible = false;
          }
           }else{
             console.log('submit,error');
           }
          })  
        } else {
           this.$refs.ruleForm.validate(async (success) => {
            if (success) {
              let result = await this.$API.tradeMark.updateTradeMarkList(
                this.tmForm
              );
              console.log(result);
              if (result.code == 200) {
                this.$message({
                  message: "新增成功",
                  type: "success",
                });
                this.baseTrademark(1);
                this.tmForm.logoUrl = "";
                this.tmForm.tmName = "";
                this.dialogFormVisible = false;
              }
            }else{
              console.log('submit,error');
            }
          });
        }
      } catch (err) {
        console.log(err.message);
      }
    },
    // 取消弹窗
    cancel() {
      this.tmForm.logoUrl = "";
      this.tmForm.tmName = "";

      this.dialogFormVisible = false;
    },
    // 删除商品名称和logo
      async deleteItem(row){
          this.$confirm(`是否删除永久删除${row.tmName}商品信息`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$API.tradeMark.deleteTradeMarkList(row.id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.baseTrademark(this.page)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
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
</style>