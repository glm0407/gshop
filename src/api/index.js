/*
* 包含n个接口的请求函数的对象模块
*
* */
import ajax from './ajax'
const BASE = '/api'
// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)<br/>
export const reqAdress = (latitude,longitude) => ajax(BASE+`position/${latitude},${longitude}`)
//  [2、获取食品分类列表](#2获取食品分类列表)<br/>
export const reqCategorys = () => ajax(BASE+'/index_category')
// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)<br/>
export const reqShops = (latitude,longitude) => ajax(BASE+'/shops',{latitude,longitude})
//用户名密码登陆
export const reqPwdLogin = ({name,pwd,captcha}) => ajax(BASE+'/login_pwd',{name,pwd,captcha},'POST')
// 发送短信验证码
export const reqSendCode = (phone) => ajax(BASE+'/sendcode',{phone})
// 手机号验证码登陆
export const reqSmsLogin = (phone,code) => ajax(BASE+'/login_sms',{phone,code},"POST")
// 根据会话获取用户信息
export const reqUser = () => ajax(BASE + '/userinfo')
// 用户登出
export const reqLogout = () => ajax(BASE + '/logout')

export const reqGoods = () => ajax('/goods')
export const reqRatings = () => ajax('/ratings')
export const reqInfo = () => ajax('/info')
