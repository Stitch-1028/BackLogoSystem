<template>
  <div>
    <el-card style="margin: 20px 0px">
      <!-- 自定义 -->
      <CategorySelect @getCategoryForm="getCategoryForm"></CategorySelect>
    </el-card>
    <el-card v-if="CategortIsShow">
      <el-button type="primary" icon="el-icon-plus" @click="AddCategort"
        >添加属性</el-button
      >
      <el-table border :data="List" style="margin-top: 20px">
        <el-table-column
          align="center"
          width="100px"
          label="序号"
          height="50"
          type="index"
        >
        </el-table-column>

        <el-table-column label="属性名称" prop="attrName" width="200px">
        </el-table-column>

        <el-table-column label="属性值列表">
          <template slot-scope="{ row, index }">
            <el-tag
              style="margin-right: 10px"
              type="success"
              v-for="(item, index) in row.attrValueList"
              :key="item.id"
              >{{ item.valueName }}</el-tag
            >
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200px">
          <template slot-scope="{ row, index }">
            <div>
              <el-button
                type="warning"
                icon="el-icon-edit"
                @click="EditItem(row)"
              ></el-button>

              <el-popconfirm
                :title="`是否删除${row.attrName}属性？`"
                @onConfirm="confirm(row)"
              >
                <el-button
                  style="margin-left: 20px"
                  type="danger"
                  icon="el-icon-delete"
                  slot="reference"
                >
                </el-button>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加属性addValue -->
    <el-form ref="form" label-width="80px" :data="form" v-if="addValue">
      <el-form-item label="属性名">
        <el-input
          autocomplete="off"
          placeholder="请输入属性名"
          v-model="form.attrName"
        ></el-input>
      </el-form-item>

      <el-button
        type="primary"
        icon="el-icon-plus"
        style="margin-left: 50px"
        @click="AddCategortValue()"
        >添加属性值</el-button
      >
      <el-button @click="exitCategortValue">取消</el-button>

      <el-table
        border
        style="margin-top: 20px; margin-left: 50px"
        :data="form.attrValueList"
      >
        <el-table-column label="序号" width="100px" type="index">
        </el-table-column>

        <el-table-column label="属性名称">
          <template slot-scope="{ row, $index }">
            <el-input
              :ref="$index"
              v-model="row.valueName"
              placeholder="请输入属性值"
              @blur="changeSpan(row)"
              v-if="row.vlog"
              @keyup.native.enter="changeSpan(row)"
            ></el-input>
            <span @click="toEdit(row, $index)" v-else>{{ row.valueName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="{ row, $index }">
            <el-popconfirm
              :title="`是否删除${row.valueName}属性？`"
              @onConfirm="deleteItem(row, $index)"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                slot="reference"
              ></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-button
        type="primary"
        style="margin-top: 20; margin-left: 50px"
        @click="submit"
        :disabled="form.attrValueList.length < 1"
        >保存</el-button
      >
      <el-button style="margin-top: 20px">取消</el-button>
    </el-form>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      // 总品牌信息
      List: [],
      // 品牌列表是否可见
      CategortIsShow: false,
      // 新增功能是否可见
      addValue: false,
      // form表单信息
      form: {
        attrName: "", //属性名√
        //属性值
        attrValueList: [],
        //
        categoryId: 0, //√
        categoryLevel: 3, //√
      },
      CategoryForm: {
        c1Id: "",
        c2Id: "",
        c3Id: ""
      },
    };
  },
  methods: {
    // 获取三级标签属性菜单
    getCategoryForm(didi) {
      this.List = didi.data;
      this.form.categoryId = didi.category3Id;
      this.CategoryForm = didi.requestData
      this.CategortIsShow = true;
      this.addValue = false;
    },
    // 修改属性
    EditItem(row) {
      this.CategortIsShow = false;
      this.addValue = true;
      // console.log(row);
      // this.form.attrName=row.attrName
      // this.form.attrValueList=row.attrValueList
      // this.form.categoryId=row.id
      this.form = cloneDeep(row);
    },
    // 添加属性
    AddCategort() {
      this.CategortIsShow = false;
      this.addValue = true;
    },
    // 添加属性值
    AddCategortValue() {
      let data = {
        attrId: this.form.categoryId,
        valueName: "",
        vlog: true,
      };
      this.form.attrValueList.push(data);
    },
    // 取消添加属性
    exitCategortValue() {
      this.form.attrName = "";
      this.form.attrValueList = [];
      this.CategortIsShow = true;
      this.addValue = false;
    },
    // 输入框查看功能
    changeSpan(row) {
      if (row.valueName.trim() == "") {
        this.$message("输入为空,请重新输入");
      } else if (
        this.form.attrValueList.every((item) => {
          if (row != item) {
            return item.valueName == row.valueName;
          }
        })
      ) {
        this.$message("属性重复,请重新输入");
      } else {
        row.vlog = row.vlog ? !row.vlog : row.vlog;
      }
    },
    // 提交
    async submit() {
      let result = await this.$API.attr.reqAddAttr(this.form);
      if (result.code == 200) {
        this.form.attrName = "";
        this.form.attrValueList = [];
        this.CategortIsShow = true;
        this.addValue = false;
        this.getData()
      }
    },
    //查看转编辑
    toEdit(row, index) {
      row.vlog = true;
    },
    // 确认删除
    confirm(row) {
      console.log(row);
    },
    deleteItem(row, index) {
      this.form.attrValueList.splice(index, 1);
    },
    async getData(){
      // 发送请求
      let result = await this.$API.attr.reqGetCateGory(this.CategoryForm)
      if(result.code == 200){
        this.List = result.data
      }
    }
  },
};
</script>

<style>
</style>