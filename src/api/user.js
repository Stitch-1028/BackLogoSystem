import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-admin-template/user/login',
    url: '/admin/acl/index/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/acl/index/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/acl/index/logout',
    method: 'post'
  })
}

// 获取商品信息
