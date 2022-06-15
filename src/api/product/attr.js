import request from '@/utils/request'

// 获取一级分类接口
export const reqCategory1List = ()=>{
    return request({url:`/admin/product/getCategory1`,method:"get"})
}

// 获取二级分类接口
export const reqCategory2List = (category1Id)=>{
    return request({url:`/admin/product/getCategory2/${category1Id}`,method:"get"})
}

// 获取三级分类接口
export const reqCategory3List = (category2Id)=>{
    return request({url:`/admin/product/getCategory3/${category2Id}`,method:"get"})
}

// 获取三级分类商品详情接口
export const reqGetCateGory= (categoryForm)=>{
    return request({url:`/admin/product/attrInfoList/${categoryForm.c1Id}/${categoryForm.c2Id}/${categoryForm.c3Id}`,method:"get"})
}

// 添加属性与属性值的接口 
export const reqAddAttr = (data)=>{
    return request({url:`/admin/product/saveAttrInfo`,method:"post",data})
}