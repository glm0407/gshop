/*
* 包含n个接口的请求函数的对象模块
*
* */
import ajax from './ajax'
const BASE = '/api'
// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)<br/>
export const reqAdress = (latitude,longitude) => ajax(BASE+`position/${latitude},${longitude}`)
//  [2、获取食品分类列表](#2获取食品分类列表)<br/>
export const reqCategorys = () => ajax('/index_category')
// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)<br/>
export const reqShops = (latitude,longitude) => ajax(BASE+'/shops',{latitude,longitude})
