<template>
  <transition name="custom-classes-transition" enter-active-class="animated lightSpeedIn" leave-active-class="animated rotateOutUpRight" mode="out-in">
    <div class="login-wrap">
      <div class="header">
        <div class="search-bank">
          <i class="gxs-icon" v-on:click="bank($event)"><img src="../assets/images/icon-back.png" alt=""></i>
        </div>
      </div>
      <!-- <div class="login-title">
        <h2>注册</h2>
      </div> -->
      <div class="login-form">
        <form>
          <div class="input-item">
            <label for="username"><i class="icon-zhanghao"></i></label>
            <input type="text" name="username" id="username" v-model="username" autocomplete="off">
          </div>
          <div class="input-item">
            <label for="password"><i class="icon-mima"></i></label>
            <input type="password" name="password" id="password" v-model="password">
          </div>
          <div class="input-item">
            <label for="password"><i class="icon-mima"></i></label>
            <input type="password" name="confirmPassword" id="confirmPassword" v-model="confirmPassword">
          </div>
          <div class="errinfo">{{ errinfo }}</div>
          <input type="button" name="register" value="注 册" class="btn-register" @click="register()">
          <!-- <input type="button" name="quit" value="返 回" class="btn-quit" @click="bankIndex()"> -->
        </form>
      </div>
      <pop-up-window v-show="isShowWindow" v-bind:info="tipInfo"></pop-up-window>
    </div>
  </transition>
</template>
<script>
import $ from 'jquery'
import { mapState } from 'vuex'
import { setCookie } from '../assets/js/setcookie.js'
import axios from 'axios'
import PopUpWindow from '../components/PopUpWindow'
export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      errinfo: '',
      isShowWindow: false,
      tipInfo: ''
    }
  },
  components: {
    PopUpWindow
  },
  methods: {
    register() {
      var name = this.username;
      var pwd = this.password;
      var conpwd = this.confirmPassword;
      var self = this;
      if (name == '' || pwd == '' || conpwd == '') {
        this.errinfo = '信息填写不完整';
      } else if(pwd.length < 6 || pwd.length > 16){
        this.errinfo = '请输入6至16位的密码';
      } else if (pwd != conpwd) {
        this.errinfo = '两次密码不一致';
      } else {
        axios({
          method: 'get',
          url: 'api/user/searchUser',
          data: {
            username: name,
            pwd: pwd
          },
          timeout: 3000
        }).then(function(response) {
          var i;
          var flag = false;
          for (i in response.data) {
            if (name == response.data[i].user_name) {
              flag = true;
            }
          }
          if (flag) {
            self.errinfo = '用户名已存在';
          } else if (!flag) {
            axios({
              method: 'post',
              url: 'api/user/addUser',
              data: {
                username: name,
                pwd: pwd
              },
              timeout: 3000
            }).then(function(response) {
              console.log(response)
              if (response.status == 200) {
                //弹窗  注册成功跳转登录页面
                // self.errinfo = '註冊成功，歡迎妳，' + name;
                self.errinfo = '';
                self.isShowWindow = true;
                self.tipInfo = '注册成功,2s后跳转至登录界面';
                setTimeout(function() {
                  self.$router.push({ path: '/login' });
                }, 2000)
              } else {
                self.errinfo = '注册失败，未知的错误';
              }
            }).catch(function(error) {
              console.log(error);
            });
          }
        }).catch(function(error) {
          console.log(error);
          self.errinfo = '服务器繁忙，请刷新页面或者稍后重试'
        });
      }
    },
    bank() {
      this.$router.push({ path: '/login' })
    }
  }
}

</script>
<style type="text/css" scoped="" lang="scss">
.login-wrap {
  position: relative;
  flex: 1;
  flex-direction: column;
  display: flex;
  display: -webkit-flex;
  min-height: 100vh;
  input {
    border-bottom: none;
    border-top: none;
    border-left: none;
    border-right: none;
  }
  .login-bank{
    i{

    }
    width:2.1rem;
    height:2.1rem;
    img{
      max-width: 100%;
      height: 100%; 
    }
  }
  .login-title {
    width: 100%;
    text-align: center;
    padding-top: 10rem;
    h2 {
      font-size: 2.2rem;
      color: #FFFFFF;
      font-weight: 400;
      color: #FFFFFF;
    }
  }
  .login-form {
    text-align: center;
    padding: 0 50px;
    padding-top: 15rem;
    .input-item {
      width: 100%;
      display: flex;
      align-items: flex-end;
      padding: 6px 5px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 1rem;
      label {
        font-size: 1.6rem;
        margin-right: 1rem;
      }
      input[type="text"],
      input[type="password"] {
        padding: 2px 5px;
        font-size: 1.6rem;
        background: none;
        border: none;
        color: #FFFFFF;
        width: 100%;
        letter-spacing: .5px;
        outline: none;
      }
    }
    .checkbox-item {
      margin-top: 1rem;
      padding: 6px 15px;
      display: flex;
      align-items: center;
      label {
        font-size: 1.6rem;
      }
      input {
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 1rem;
      }
    }
    .btn-register {
      font-size: 1.6rem;
      background: #3C4457;
      color: #FFFFFF;
      padding: 6px 0px;
      margin-top: 1rem;
      width: 10rem;
      border-radius: 20px;
      text-align:center;
    }
  }
  .icon-zhanghao {
    background: url(../assets/images/zhanghao.png);
    display: inline-block;
    width: 16px;
    height: 16px;
  }
  .icon-mima {
    background: url(../assets/images/mima.png);
    display: inline-block;
    width: 16px;
    height: 16px;
  }
  .errinfo{
    width:100%;
    text-align:right;
    color: #FD4A4A;
    font-size:1.2rem;
  }
}

</style>
