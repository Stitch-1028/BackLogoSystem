import request from '@/utils/request'

// 获取三级分类后的SPU列表
export const reqGetSPUList = (page,limit,category3Id)=>{
    return request({url:`/admin/product/${page}/${limit}`,method:"get",params:{category3Id}})
}

// 品牌的数据需要发请求的 /admin/product/baseTrademark/getTrademarkList
export const reqGetTrademarkList= ()=>{
    return request({url:`/admin/product/baseTrademark/getTrademarkList`,method:"get"})
}

// 获取平台销售属性 /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList = ()=>{
    return request({url:`/admin/product/baseSaleAttrList`,method:"get"})
}

// 获取某一个SPU的信息 /admin/product/getSpuById/{id}
export const reqGetSPUinformation= (spuId)=>{
    return request({url:`/admin/product/getSpuById/${spuId}`,method:"get"})
}

// 获取SPU图片 /admin/product
export const reqSpuImageList = (spuId)=>{
    return request({url:`/admin/product/spuImageList/${spuId}`,method:"get"})
}

//保存信息并提交
export const reqSaveSpuInfo = (data)=>{
    return request({url:`/admin/product/saveSpuInfo`,method:'post',data})
} 

// 修改信息 并提交
export const reqUpdateSpuInfo = (data)=>{
    return request({url:`/admin/product/updateSpuInfo`,method:"post",data})
}

