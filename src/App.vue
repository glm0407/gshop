<template>
  <div>
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.isShowFoot"></FooterGuide>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide'
  export default {
    name: 'App',
    async mounted(){
      this.$store.dispatch('getAddress')
      this.$store.dispatch('getUser')
    },
    components:{
      FooterGuide
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
