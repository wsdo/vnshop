<template>
  <div>
    <div class="site-header" style="clear:both;">
        <div class="container">
            <div class="header-logo">
                <router-link to="/" title=""><img src="/static/img/vn-logo.png" /></router-link>
            </div>
            <div class="header-nav">
                <ul class="nav-list">
                    
                </ul>
            </div>
            <!-- <div class="container-user"> -->
            <div class="topbar-cart" id="ECS_CARTINFO">
                <router-link class="cart-mini" to="/cart">
                    <i class="iconfont">&#xe60c;</i> 购物车
                    <span class="mini-cart-num J_cartNum" id="hd_cartnum">(0)</span>
                </router-link>
            </div>
            <div class="topbar-info J_userInfo" id="ECS_MEMBERZONE">
                <span v-text="nickName" v-if="nickName"> </span>
                <a  href="javascript:void(0)" class="link" rel="nofollow" v-if="!nickName" @click="loginModalFlag  = true">登录</a>
                <span class="sep" v-if="nickName">|</span>
                <a class="link" href="javascript:void(0)" @click="logout" v-if="nickName" rel="nofollow">退出</a>
            </div>
            <!-- </div> -->
        </div>

        <div id="J_navMenu" class="header-nav-menu" style="display: none;">
            <div class="container"></div>
        </div>
    </div>

<!-- 登录框 -->
      <div class="md-modal modal-msg md-modal-transition " :class="{'md-show' : loginModalFlag}" >
        <div class="md-modal-inner">
          <div class="md-top">
            <div class="md-title">login in</div>
            <button class="md-close">Close</button>
          </div>
          <div class="md-content">
            <div class="confirm-tips">
              <div class="error-wrap">
                <span class="error error-show" >用户名或密码错误</span>
              </div>
              <ul>
                <li class="regi_form_input">
                  <input type="text" tabindex="1" name="loginname" v-model="userName" placeholder="User Name" data-type="loginname" class="regi_login_input regi_login_input_left">
                </li>
                <li class="regi_form_input noMargin">
                  <i class="icon IconPwd"></i>
                  <input type="password" tabindex="2" name="password" v-model="userPwd" placeholder="Password" class="regi_login_input regi_login_input_left login-input-no input_text" @keyup.enter="login">
                </li>
              </ul>

            </div>
            <div class="login-wrap">
              <a href="javascript:;" class="btn-login" @click="login">登录</a>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-if="loginModalFlag" @click="loginModalFlag = false">
      </div>

  </div>
</template>
<script>
import axios from 'axios'
export default {
  name:'header',
  data(){
    return{
          userName:'',
          userPwd:'',
          nickName:'',
          loginModalFlag:false
    }
  },
  mounted:function(){
      this.checkLogin();
  },
  methods:{
      login(){
            console.log(this.userName,this.userPwd);
            axios.post("/users/login",{
                userName:this.userName,
                userPwd:this.userPwd
            }).then((result)=>{
                console.log(result.data);
                let res = result.data;
                this.nickName = res.result.userName;
                this.loginModalFlag = false;
            })
        },
        checkLogin(){
            axios.post('/users/checkLogin').then((result) => {
                let res = result.data;
                this.nickName = res.result;
            })
        },
        logout(){
            axios.post('/users/logout').then((result)=>{
                let res = result.data;
                this.nickName = '';
            })
        }
  }
}
</script>
<style>

</style>

