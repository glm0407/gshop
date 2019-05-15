/*
使用mockjs模拟数据接口
 */

import Mock from 'mockjs'
//引入data的json数据
import data from './data'  //内部自动解析为js对象

//生成goods的接口
Mock.mock( '/goods',{code:0,data:data.goods} )

//生成info接口
Mock.mock( '/info',{code:0,data:data.info} )
//生成ratings接口
Mock.mock( '/ratings',{code:0,data:data.ratings} )
console.log('Mock')

