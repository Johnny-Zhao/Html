<template>
  <transition name="custom-classes-transition" enter-active-class="animated flipInX" leave-active-class="animated lightSpeedOut">
    <div class="login-wrap">
      <div class="header">
        <div class="search-bank">
          <i class="gxs-icon" v-on:click="bank($event)"><img src="../assets/images/icon-back.png" alt=""></i>
        </div>
      </div>
      <!-- <div class="login-title">
        <h2>登录</h2>
      </div> -->
      <div class="login-form">
        <form>
          <div class="input-item">
            <label for="username"><i class="icon-zhanghao"></i></label>
            <input type="text" name="username" id="username" v-model="username" :value='userName' autocomplete="off">
          </div>
          <div class="input-item">
            <label for="password"><i class="icon-mima"></i></label>
            <input type="password" name="password" id="password" v-model="password">
          </div>
          <div class="checkbox-item">
            <input type="checkbox" name="checkRemebered" checked="none" id="checkRemebered" class="checkbox1">
            <label for="checkRemebered">
            </label>
            <span>7天内免登录</span>
            <em>{{ tipInfo }}</em>
          </div>
          <div class="toRegister">
            <a @click="toRegister()">没有账号?请先注册-></a>
          </div>
          <input type="button" name="login" value="登 录" class="btn-login" @click="checkUser()">
          <!-- <input type="button" name="quit" value="取 消" class="btn-quit" @click="bankIndex()"> -->
        </form>
      </div>
    </div>
  </transition>
</template>
<script>
import $ from 'jquery'
import { mapState } from 'vuex'
import { setCookie } from '../assets/js/setcookie.js'
import axios from 'axios'
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      tipInfo:''
    }
  },
  computed: {
    ...mapState([
      'userName'
    ])
  },
  methods: {
    checkUser() {
      var name = this.username;
      var pwd = this.password;
      var self = this;
      if (name != '' && pwd != '') {
        axios({
          method: 'get',
          url: 'api/user/searchUser',
          data: {
            username: name,
            pwd: pwd
          },
          timeout: 3000
        }).then(function(response) {
          var i, flag = false;
          for (i in response.data) {
            if (name == response.data[i].user_name && pwd == response.data[i].user_pwd && name != '' && pwd != '') {
              flag = true;
            }
          }
          if (flag) {
            var cookie_name = unescape(setCookie.setInfo().name);
            //cookie中是否有记录
            if ((cookie_name != name && name != '' && cookie_name != '') || cookie_name == '') {
              setCookie.getInfo(self.username, self.password);
              setCookie.userLogin();
              console.log("success");
              self.$store.state['userName'] = name;
            } else if (cookie_name == name && name != '' && cookie_name != '') {
              console.log("success_history");
            }
            self.$router.push("/");
          } else {
            self.tipInfo = '用户名和密码填写错误';
          }
        }).catch(function(error) {
          console.log(error);
          self.tipInfo = '服务器繁忙，请刷新页面或者稍后重试';
        });
      } else {
        self.tipInfo = '请填写用户名和密码！';
      }
    },
    toRegister() {
      this.$router.push({ path: '/Register' })
    },
    bank() {
      this.$router.push({ path: '/' })
    }
  }
}

</script>
<style type="text/css" scoped>
/*@import '../assets/css/iconfont.css'*/

</style>
<style type="text/css" scoped="" lang="scss">
.login-wrap {
  position: relative;
  flex: 1;
  flex-direction: column;
  display: flex;
  display: -webkit-flex;
  color: #FFFFFF;
  min-height: 100vh;
  input {
    border: none;
  }
  .login-title {
    width: 100%;
    text-align: center;
    h2 {
      font-size: 2.2rem;
      color: #FFFFFF;
      font-weight: 400;
    }
  }
  .login-form {
    text-align: center;
    padding: 0 50px;
    padding-top: 15rem;
    .toRegister {
      display: flex;
      justify-content: flex-end;
      a {
        color: #FFFFFF;
        font-size:0.8rem;
      }
    }
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
      margin-top: 1.5rem;
      padding: 6px 0px;
      display: flex;
      align-items: stretch;
      position:relative;
      span {
        font-size: 1.3rem;
      }
      input {
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 1rem;
      }
      em{
        position:absolute;
        right: 0;
        color: #FD4A4A;
        font-size:1.2rem;
      }
    }
    .btn-login{
      font-size: 1.6rem;
      background: #3C4457;
      color: #FFFFFF;
      padding: 6px 0px;
      margin-top: 1rem;
      width:10rem;
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
  .checkbox1 {
    display: none;
  }
  .checkbox1+label {
    background-color: #FFF;
    border: 1px solid #C1CACA;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
    padding: 9px;
    border-radius: 5px;
    display: inline-block;
    position: relative;
    margin-right: 10px;
  }
  .checkbox1+label:active {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px 1px 3px rgba(0, 0, 0, 0.1);
  }

  .checkbox1:checked+label {
    background-color: #ECF2F7;
    border: 1px solid #92A1AC;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05), inset 15px 10px -12px rgba(255, 255, 255, 0.1);
    color: #243441;
  }

  .checkbox1:checked+label:after {
    content: '\2714'; //勾选符号 
    position: absolute;
    top: 0px;
    left: 0px;
    color: #758794;
    width: 100%;
    text-align: center;
    font-size: 1.4em;
    padding: 0;
    vertical-align: text-top;
  }
}

</style>
