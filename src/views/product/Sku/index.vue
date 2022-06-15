<template>
  <div>
    <el-card>
      <el-table style="width: 100%" border :data="List">
        <el-table-column type="index" label="序号" width="80px">
        </el-table-column>

        <el-table-column prop="skuName" label="名称" width="width">
        </el-table-column>

        <el-table-column prop="skuDesc" label="描述" width="width">
        </el-table-column>

        <el-table-column prop="prop" label="默认图片" width="110px">
          <template slot-scope="{ row, $index }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 80px; height: 80px"
            />
          </template>
        </el-table-column>

        <el-table-column prop="weight" label="重量(KG)" width="80px">
        </el-table-column>

        <el-table-column prop="price" label="价格(元)" width="80px">
        </el-table-column>

        <el-table-column prop="prop" label="操作" width="350px">
          <template slot-scope="{ row, $index }">
            <el-button
              type="info"
              icon="el-icon-bottom"
              v-if="row.isSale == 1"
              @click="cancelSale(row)"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-top"
              v-else
              @click="OnSale(row)"
            ></el-button>

            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="edit(row)"
            ></el-button>
            <el-button
              type="info"
              icon="el-icon-zoom-in"
              @click="Look(row)"
            ></el-button>
            <el-button type="danger" icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
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

    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :direction="direction"
      size="30%"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>

      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>

      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}</el-col>
      </el-row>

      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
                <el-tag
            style="margin: 5px 10px"
            type="success"
            v-for="(item, index) in skuInfo.skuAttrValueList"
            :key="item.id"
            >{{ `${item.attrName}:${item.valueName}`}}</el-tag
          >
          
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">

            <!-- 轮播图 -->
          <el-carousel height="300px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl" alt="" style="width:100%;height:100%">
            </el-carousel-item>
          </el-carousel>

        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      total: 0,
      page: 1,
      limit: 5,
      List: [],
      drawer: false,
      direction: "rtl",
      skuInfo: {},
    };
  },
  methods: {
    currentChange(page) {
      this.page = page;
      this.getData(page, this.limit);
    },
    sizeChange(limit) {
      this.limit = limit;
      this.getData(this.page, limit);
    },
    async getData(page = 1, limit = 5) {
      let result = await this.$API.sku.reqSkuAllList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.List = result.data.records;
      }
    },
    edit(row) {
      console.log(row);
      this.$message({
        message: "正在开发中",
        duration: 1000,
      });
    },
    //  上架
    async OnSale(row) {
      let result = await this.$API.sku.reqOnSale(row.id);
      if (result.code == 200) {
        this.$message({
          message: "上架成功",
          duration: 1000,
          type: "success",
        });
        this.getData(this.page, this.limit);
      }
    },
    async cancelSale(row) {
      let result = await this.$API.sku.reqCancelSale(row.id);
      if (result.code == 200) {
        this.$message({
          message: "下架成功",
          duration: 1000,
          type: "success",
        });
        this.getData(this.page, this.limit);
      }
    },
    async Look(row) {
      this.drawer = true;
      let result = await this.$API.sku.reqGetSkuById(row.id);
      if (result.code == 200) {
        this.skuInfo = result.data;
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
.el-row .el-col-5 {
  text-align: right;
  font-size: 18px;
  font-weight: bold;
}
.el-col {
  margin: 10px 10px;
}

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }

  .el-carousel__button{
      width: 10px;
      height: 10px;
      background: red;
      border-radius: 50%;
  }
</style>