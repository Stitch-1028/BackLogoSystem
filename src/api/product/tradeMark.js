import request from '@/utils/request'

// 获取品牌列表接口
export const reqTradeMarkList = (page,limit)=> {
   return request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'})
}

// 新增或者修改品牌接口
export const updateTradeMarkList=(data)=>{
   // const {id,logoUrl,tmName} = data

   // 如果有id则是修改
   if(data.id){
      return request({url:`/admin/product/baseTrademark/update`,method:'put',data})
   }else{
      // 反之 则新增
      return request({url:`/admin/product/baseTrademark/save`,method:'post',data})
   }

  
}

// 删除商品接口
export const deleteTradeMarkList = (id)=>{
   return request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'})
}