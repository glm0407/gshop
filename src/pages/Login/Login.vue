<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}"  @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" name="phone"
                     v-model="iphone" v-validate="{required: true,regex: /^1\d{10}$/}">

              <span style="color: red">{{ errors.first('phone') }}</span>
              <button :disabled="!isRightP || sendTime>0"
                      class="get_verification"
                      :class="{right_iphone_number:isRightP}"
                      @click.prevent="sendCode"
              >{{sendTime>0 ? `已发送${sendTime}s` : '获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" name="code"
                     v-model="code" v-validate="{required: true,regex: /\d{6}$/}"
              >
              <span style="color: red">{{ errors.first('code') }}</span>

            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" name="用户名"
                       v-model="name" v-validate="'required'">
                <span style="color: red">{{ errors.first('用户名') }}</span>

              </section>
              <section class="login_verification">
                <input :type="isShowPwd ? 'text':'password'" name="密码"
                       maxlength="8" placeholder="密码" v-model="pwd"
                       v-validate="'required'"
                >
                <div class="switch_button" :class="{on:isShowPwd}" @click="isShowPwd = !isShowPwd">
                  <div class="switch_circle" :class="{right:isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd?'he':''}}</span>
                </div>
                <span style="color: red">{{ errors.first('密码') }}</span>

              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" name="验证码"
                       v-model="captcha" v-validate="{required: true,regex: /^.{4}$/}">
                <span style="color: red">{{ errors.first('验证码') }}</span>
                <img class="get_verification" src="http://localhost:5000/captcha"
                     alt="captcha" @click="updateCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back">
        <i class="iconfont iconjiantouyou1" @click="$router.back()"></i>
      </a>
    </div>
  </section>
</template>

<script>
  import {reqSendCode,reqPwdLogin,reqSmsLogin} from '../../api'
  import {RECEIVE_USER} from '../../store/mutation-types'
  import { Toast ,MessageBox} from 'mint-ui';
  export default {
    name: 'Login',
    data(){
      return{
        loginWay:true, //登录方式切换 短信登录默认true，密码登录为false
        iphone:'', //收集输入的手机号
        sendTime:0, //倒计时效果
        code: '', // 一次性短信验证码
        name: '', // 用户名
        pwd: '', // 密码
        captcha: '', // 一次性图形验证码
        isShowPwd:false,   //是否显示密码
      }
    },
    computed:{
      //判断是否是一个正确的手机号
      isRightP(){
        return /^1\d{10}$/.test(this.iphone)
      }
    },
    methods:{
      //发送获取验证码的信息时，计时
      async sendCode(){
        const {iphone} = this
        //指定最大的时间
        this.sendTime = 30
        //开启定时器，每隔一秒变化一次
        const intervalId = setInterval(() => {
          this.sendTime--
          if(this.sendTime<=0){
            clearInterval(intervalId)
          }
        },1000)
        //请求发送验证码短信
        const result = await reqSendCode(iphone)
        console.log(reqSendCode(iphone))
        if(result.code===0){
          Toast('发送成功')
        }else{
          //停止计时
          this.sendTime=0
          MessageBox.alert(result.msg)
        }
      },
      async login(){
        let names
        let result
        const {loginWay,phone, code, name, pwd, captcha} =this
        if(loginWay){
          names=['phone','code']
        }else{
          names=['用户名','密码','验证码']
        }
        const success = await this.$validator.validateAll(names)
        if(success){
          //如果验证通过发送登录请求
          if(loginWay){
            result = await reqSmsLogin(phone, code)
          }else{
            result = await reqPwdLogin({name, pwd, captcha})
          }
          //请求成功后，
          if(result.code===0){
            const user = result.data
            //保存user到state中去
            this.$store.commit(RECEIVE_USER,user)
            //跳转到个人中心
            this.$router.replace('/profile')
          }else{
            MessageBox.alert(result.msg)
          }

        }else{
          alert('验证失败')
        }
      },
      updateCaptcha(){
        // 只要给img指定一个新的src值, 浏览器自动发请求显示新的图片(携带一个时间戳的参数)
        this.$refs.captcha.src = 'http://localhost:5000/captcha?time='+Date.now()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_iphone_number
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
