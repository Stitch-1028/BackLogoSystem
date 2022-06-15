import request from '@/utils/request'

// 添加SKU的数据  /admin/product/spuImageList/{id}
//   /admin/product/spuSaleAttrList/{id}
//   /admin/product/attrInfoList/1/1/1

// 获取图片列表信息
export const reqSpuImageList = (id)=>{
    return request({url:`/admin/product/spuImageList/${id}`,method:'get'})
}

// 获取spu销售属性信息
export const reqSpuSaleAttrList = (id)=>{
    return request({url:`/admin/product/spuSaleAttrList/${id}`,method:'get'})
}

// 获取某个属性接口
// /admin/product/attrInfoList/1/1/1
export const reqAttrInfoList = (category1Id,category2Id,category3Id)=>{
    return request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})
}

// 保存添加SKU信息
// /admin/product/saveSkuInfo
export const reqSaveSkuInfo = (data)=>{
    return request({url:`/admin/product/saveSkuInfo`,method:'post',data})
}

// 查看sku列表数据接口
export const reqSkuList = (spuId)=>{
    return request({url:`/admin/product/findBySpuId/${spuId}`,method:"get"})
}

// 查询SKU列表总数据
export const reqSkuAllList = (page,limit)=>{
    return request({url:`/admin/product/list/${page}/${limit}`,method:"get"})
}

// SKU上架
export const reqOnSale = (skuId)=>{
    return request({url:`/admin/product/onSale/${skuId}`,method:'get'})
}

// SKU下架
export const reqCancelSale = (skuId)=>{
    return request({url:`/admin/product/cancelSale/${skuId}`,method:'get'})
}

// 获取SKU详情接口
export const reqGetSkuById = (skuId)=>{
    return request({url:`/admin/product/getSkuById/${skuId}`,method:"get"})
}