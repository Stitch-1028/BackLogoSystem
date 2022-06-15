import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    // 用户姓名
    name: '',
    // 用户头像
    avatar: '',
    // 路由信息
    routes:[],
    // 按钮信息
    buttons:[],
    // 用户权限
    roles:[],
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_SETUSERINFO: (state, data) => {
    // 用户名
    state.name = data.name
    // 用户头像
    state.avatar = data.avatar
    // 菜单权限标记
    state.routes = data.routes
    // 按钮权限标记
    state.buttons = data.buttons
    // 角色
    state.roles = data.roles
    
  },
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })

    try{
      let result = await login({username: username.trim(), password: password })
      if(result.code == 20000){
        commit('SET_TOKEN',result.data.token)
        setToken(result.data.token)
      }
      console.log(result);
    }catch(err){
      console.log(err);
    }
    
    
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        

        commit('SET_SETUSERINFO', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  async logout({ commit, state }) {

    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {
    //     removeToken() // must remove  token  first
    //     resetRouter()
    //     commit('RESET_STATE')
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
    console.log(state);
    try{
      let result = await logout(state.token)
      if(result.code == 20000){
        removeToken()
        resetRouter()
        commit('RESET_STATE')
      }
    }catch(err){
      console.log(err);
    }
    

  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }

  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

