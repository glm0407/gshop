/*
包含n个mutation函数名常量名称的模块

有几个type就会有几个mutation函数
 */
export const RECEIVE_ADDRESS = 'receive_address' // 接收addess
export const RECEIVE_CATEGORYS = 'receive_categorys' // 接收分类数组
export const RECEIVE_SHOPS = 'receive_shops' // 接收商家数组
export const RECEIVE_USER= 'receive_user'
export const RESET_USER = 'reset_user' //重置用户
export const RECEIVE_GOODS = 'receive_goods' // 接收商品数组
export const RECEIVE_RATINGS = 'receive_ratings' // 接收商家评价数组
export const RECEIVE_INFO = 'receive_info' // 接收商家信息

export const INCREMENT_FOOD_COUNT = 'increment_food_count' // 增加food数量(+1)
export const DECREMENT_FOOD_COUNT = 'decrement_food_count' // 减少food数量(-1)
export const CLEAR_CART = 'clear_cart' // 清空购物车
