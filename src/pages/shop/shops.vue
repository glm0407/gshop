<template>
  <div>
    <ShopHeader/>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/Goods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/Ratings" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/Info" replace>商品</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>

</template>

<script>
  import ShopHeader  from '../../components/ShopHeader/ShopHeader'
  import {reqGoods} from '../../api'
  export default {
    name: 'shops',
    components:{
      ShopHeader
    },
    async mounted(){
      const result = await reqGoods()
      console.log(result)
      this.$store.dispatch('getGoods')
      this.$store.dispatch('getInfo')
      this.$store.dispatch('getRatings')
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>


