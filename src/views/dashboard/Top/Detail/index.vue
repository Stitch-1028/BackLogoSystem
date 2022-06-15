<template>
  
      <el-card>
        <div class="card-heard">
          <span>{{title}}</span>
          <span>小图标</span>
        </div>

        <div class="card-mid">{{count}}</div>

        <div class="card-icon">
            <slot name="charts"></slot>
        </div>

        <div class="card-bom">
          <slot name="chartsBom"></slot>
        </div>
      </el-card>
    
</template>

<script>
export default {
    name:"detail",
    props:["title","count"]
}
</script>

<style>
 .el-card{
        margin: 10px 10px;
    }
.card-heard{
  display:flex;
  justify-content: space-between;
}

.card-mid{
  font-size: 30px;
  padding: 10px 10px;
}
.card-icon{
  height:50px;
}
.card-bom{
  margin-top:20px;
  border-top: 2px solid gray;
  padding-top: 5px;
}
</style>