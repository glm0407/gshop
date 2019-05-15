/*
* 商家模块
*
* */
import Vue from 'vue'
import {RECEIVE_GOODS,
    RECEIVE_INFO,
    RECEIVE_RATINGS,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CART
 } from '../mutation-types'
import {reqGoods, reqInfo, reqRatings} from '../../api'

const state = {
  goods: [], // 商品列表
  ratings: [], // 商家评价列表
  info: {}, // 商家信息
  cartFoods:[],  //购物车中的food
}
const mutations = {
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },

  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },

  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },
  [INCREMENT_FOOD_COUNT](state,{food}){
    if(food.count){
      food.count++
    }else{//第一次点+
      /*
      问题: 直接给有数据绑定的对象(响应式对象)添加新的属性, 新的属性没有数据绑定效果
      解决: 使用Vue.set()添加属性, 这个属性就有数据绑定
       */
      // 给food添加一个新的属性: count: 1
      //food.count = 1

      // 为响应式对象添加一个属性，确保新属性也是响应式的，并且能够触发视图更新
      Vue.set(food,'count',1)
      //购物车添加food
      state.cartFoods.push(food)
    }
  },
  [DECREMENT_FOOD_COUNT](state,{food}){
    if(food.count>0){
      food.count--
      //删除购物车中的食物
      if(food.count===0){
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },
  [CLEAR_CART](state){
    //清除购物车中food的所有count
    state.cartFoods.forEach(food => food.count = 0)
    state.cartFoods = []  //清空购物车数组
  }
}
const actions = {
  // 异步获取商家信息
  async getInfo({commit}) {
    const result = await reqInfo()
    if(result.code===0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },

  // 异步获取商家评价列表
  async getRatings({commit}) {
    const result = await reqRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
    }
  },

  // 异步获取商家商品列表
  async getGoods({commit}) {
    const result = await reqGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
    }
  },
  //点击加号更新food.count的值
  updateCount({commit},{isAdd,food}){
    if(isAdd){
      commit(INCREMENT_FOOD_COUNT,{food})
    }else{
      commit(DECREMENT_FOOD_COUNT,{food})
    }
  }
}
const getters = {
   //购物车中food的总价格
   totalFoodPrice(){
     return state.cartFoods.reduce((pre, food) => pre + food.count * food.price, 0)
   },
   //购物车中food的总数量
   totalFoodCount(){
     return state.cartFoods.reduce((pre, food) => pre + food.count, 0)
   },
  // 评价的总数量
  ratingsTotalCount (state) {
    return state.ratings.length
  },

// 推荐评价的总数量
  positiveRatingsTotalCount (state) {
    return state.ratings.reduce((pre, rating) => pre + (rating.rateType===0 ? 1 : 0), 0)
  }

}
export default {
  state,
  mutations,
  actions,
  getters
}
