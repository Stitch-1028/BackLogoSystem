<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <el-card>
        <!-- 顶部区域 -->
        <div class="top">
          <div>线上热门搜索</div>
          <div>...</div>
        </div>
        <!-- 中间区域 -->
        <div class="mid">
          <el-col :span="12">
            <div>
              <!-- 搜索用户数 -->
              <div>
                <span>搜索用户数</span>
                <!-- 小图标 -->
              </div>
              <!-- 数据展示 -->
              <div style="margin-top: 15px">
                <span style="font-size: 28px">12321</span>
                <span style="margin-left: 20px">17.1</span>
              </div>
              <!-- Echarts -->
              <div class="userNumber" style="width: 100%; height: 200px">
                <UserNumber></UserNumber>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <!-- 搜索用户数 -->
              <div>
                <span>人均搜索数</span>
                <!-- 小图标 -->
              </div>
              <!-- 数据展示 -->
              <div style="margin-top: 15px">
                <span style="font-size: 28px">2.7</span>
                <span style="margin-left: 20px">26.2</span>
              </div>
              <!-- Echarts -->
              <div class="userNumber" style="width: 100%; height: 200px">
                <UserFind></UserFind>
              </div>
            </div>
          </el-col>
        </div>
        <!-- table栏 -->
        <div>
          <el-table height="108" :data="list" border style="width: 100%">
            <el-table-column type="index" label="排名" width="180">
            </el-table-column>
            <el-table-column prop="" label="搜索关键字" width="180">
            </el-table-column>
            <el-table-column prop="" label="用户数" sortable> </el-table-column>
            <el-table-column prop="" label="周涨幅" sortable> </el-table-column>
          </el-table>
        </div>
      </el-card>
    </el-col>

    <el-col :span="12">
      <el-card>
        <!-- 顶部区域 -->
        <div style="display:flex;justify-content: space-between;font-weight: bold;height: 50px;border-bottom: 1px solid rgb(221, 216, 216);">
          <span style="padding-top:10px">销售额类别占比</span>

          <el-radio-group v-model="tabPosition">
            <el-radio-button label="全部门店">全部门店</el-radio-button>
            <el-radio-button label="线上">线上</el-radio-button>
            <el-radio-button label="门店">门店</el-radio-button>
          </el-radio-group>
        </div>
        <!-- 中间区域 -->
        <Pie></Pie>
        
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import UserNumber from "./UserNumber";
import UserFind from "./UserFind";
import Pie from "./Pie";
export default {
  components: { UserNumber, UserFind ,Pie},
  name: "footerBottom",
  data() {
    return {
      list: [1],
      tabPosition:''
    };
  },
};
</script>

<style>
.top {
  height: 50px;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  border-bottom: 1px solid rgb(221, 216, 216);
}
.mid {
  margin-top: 30px;
}

</style>