/*
包含n个用于间接更新状态数据的方法的对象
 */
import {reqAdress,reqCategorys,reqShops} from '../api'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
}
  from './mutation-types'
export default {
   async getAddress ({commit,state}) {
     const {latitude, longitude} =state
     //发送ajax请求获取信息(异步获取信息)
      const result = await reqAdress(latitude, longitude)
      if(result.code===0){
      //通过执行: commit()来触发mutation的调用, 间接更新state
        commit(RECEIVE_ADDRESS,result.data)
      }
   },

  // 获取食品分类列表的异步action
  async getCategorys ({commit}, callback) {
    // 1. 发送异步ajax请求
    const result = await reqCategorys()
    // 2. 成功后, 提交mutation
    if(result.code===0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, categorys)
      // 更新完状态数据后调用
      typeof callback ==='function' && callback()
    }

  },


  async getShops ({commit,state}) {
    const {latitude, longitude} =state
    //发送ajax请求获取信息(异步获取信息)
    const result = await reqShops(latitude, longitude)
    if(result.code===0){
      //通过执行: commit()来触发mutation的调用, 间接更新state
      commit(RECEIVE_SHOPS,result.data)
    }
  }
}
