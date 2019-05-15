<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont iconicon_remove" v-show="food.count>0" @click.stop="updateCount(false)"></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="iconfont iconjia1" @click.stop="updateCount(true)"></div>
  </div>

</template>

<script>
  export default {
    name: 'CartControl',

    props: {
      food: Object
    },
    methods:{
      updateCount(isAdd){
        console.log(this.food.count)
        this.$store.dispatch('updateCount',{isAdd,food:this.food})
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .iconicon_remove
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active,&.move-leave-active
        transition all .5s
      &.move-enter,&.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .iconjia1
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
</style>


