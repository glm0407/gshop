import Msite from '../pages/Msite/Msite'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'
import Login from '../pages/Login/Login'
import shop from '../pages/shop/shops'
import Goods from '../pages/shop/Goods/Goods'
import Info from '../pages/shop/Info/Info'
import Ratings from '../pages/shop/Ratings/Ratings'


export default [
  {
    path:'/msite',
    component:Msite,
    meta:{
      isShowFoot:true
    }
  },
  {
    path:'/order',
    component:Order,
    meta:{
      isShowFoot:true
    }
  },
  {
    path:'/search',
    component:Search,
    meta:{
      isShowFoot:true
    }
  },
  {
    path:'/profile',
    component:Profile,
    meta:{
      isShowFoot:true
    }
  },
  {
    path:'/shop',
    component:shop,
    children:[
      {
        path:'/shop/Info',
        component:Info
      },
      {
        path:'/shop/Ratings',
        component:Ratings
      },
      {
        path:'/shop/Goods',
        component:Goods
      },
      {
        path:'/shop',
        redirect: '/shop/Goods'
      }
    ]
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/',
    redirect:'/msite'
  }
  ]
