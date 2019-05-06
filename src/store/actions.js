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

    async getCategorys({commit}) {
    //发送ajax请求获取信息(异步获取信息)
    const result = await reqCategorys()
    if(result.code===0){
      //通过执行: commit()来触发mutation的调用, 间接更新state
      commit(RECEIVE_CATEGORYS,result.data)
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
