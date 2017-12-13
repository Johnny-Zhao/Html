<template>
  <transition name="custom-classes-transition" enter-active-class="animated zoomIn fast" leave-active-class="animated zoomOutUp" mode="out-in">
    <div class="search-warp">
      <div class="header">
        <div class="search-bank" v-if="isShowInput">
          <i class="gxs-icon" v-on:click="bank($event)"><img src="../assets/images/icon-back.png" alt=""></i>
        </div>
        <div class="search-menu" v-if="!isShowInput">
          <i class="gxs-icon" v-on:click="menus()"><img src="../assets/images/icon-menuH.png" alt=""></i>
        </div>
        <div class="search-input">
          <transition name="custom-classes-transition" enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight" mode="out-in">
            <input class="gxs-input" v-on:focus="keyUp($event,searchInfo)" type="text" v-model="searchInfo" placeholder="搜索 歌曲/专辑/歌手">
          </transition>
        </div>
        <div class="search-button">
          <i class="gxs-icon" v-on:click="key($event,searchInfo)"><img src="../assets/images/icon-search.png" alt=""></i>
        </div>
      </div>
      <transition name="custom-classes-transition" enter-active-class="animated fadeInUp fast" leave-active-class="animated fadeOutDown" mode="out-in">
        <div class="search-hot-warp" v-if="isSearchHot">
          <div class="search-hot">
            <div class="search-res-box" v-for="(item,index) in searchHot.hotkey" v-on:click="key($event,item.k)">
              <div class="search-res-text">
                <p><span class="search-res-index">{{index+1}}</span><span class="search-res-name">{{item.k}}</span><span class="search-res-singer">{{item.n}}</span></p>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <transition name="custom-classes-transition" enter-active-class="animated fast slideInLeft" leave-active-class="animated fast slideOutLeft">
        <div class="weather-warp" v-show="isMenus">
          <div class="weather-menus">
            <div class="weather-menu gxs-cell gxs-cells-icon">
              <div class="weather-bd gxs-cell-bd gxs-cell-default"><a href="http://www.gxspp.com/web/jl/index.html">音乐不放弃</a></div>
              <div class="weather-ft gxs-cell-ft"></div>
            </div>
            <div class="weather-menu gxs-cell gxs-cells-icon">
              <div class="weather-bd gxs-cell-bd gxs-cell-default"><a @click="toLogin()">{{ welcomeInfo }} {{ userName }}</a></div>
              <div class="weather-ft gxs-cell-ft" @click="exit">{{exitInfo}}</div>
            </div>
            <div class="weather-menu gxs-cell gxs-cells-icon">
              <div class="weather-bd gxs-cell-bd gxs-cell-default"><a href="http://www.gxspp.com">个性换肤</a></div>
              <div class="weather-ft gxs-cell-ft"></div>
            </div>
            <div class="weather-menu gxs-cell gxs-cells-icon" v-show="userName.length">
              <div class="weather-bd gxs-cell-bd gxs-cell-default" @click="toMyLoveList">我的收藏</div>
              <div class="weather-ft gxs-cell-ft"></div>
            </div>
          </div>
        </div>
      </transition>
      <transition name="custom-classes-transition" enter-active-class="animated fast fadeIn" leave-active-class="animated fast fadeOut">
        <div class="weather-menus-bg" v-show="isMenus" v-on:click="menus()"></div>
      </transition>
    </div>
  </transition>
</template>
<script>
import { setCookie } from '../assets/js/setcookie.js'
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'Search',
  data() {
    return {
      searchList: null,
      searchInfo: '',
      searchHot: null,
      isSearchHot: false,
      isMenus: false,
      welcomeInfo: '请先登录',
      exitInfo: ''
    }
  },
  beforeMount() {
    if (this.$route.query.search) {
      this.searchInfo = this.$route.query.search
    }
  },
  created() {
    if (unescape(setCookie.setInfo().name)) {
      this.$store.state['userName'] = unescape(setCookie.setInfo().name);
      this.welcomeInfo = '欢迎您 ';
      this.exitInfo = '退出';
    } else if (this.$store.state['userName'] !== '') {
      this.welcomeInfo = '欢迎您 ';
      this.exitInfo = '退出';
    }

    if (this.$store.state.userName) {
      let self = this; // 很重要！！！
      axios({
        method: 'post',
        url: 'api/user/loveList',
        data: {
          user_name: self.$store.state.userName
        },
        timeout: 3000
      }).then(function(response) {
        self.$store.state.loveList = response.data
      }).catch(function(error) {
        console.log(error);
      });
    }
  },
  computed: {
    ...mapState([
      'searchRes', 'isShowInput', 'userName', 'loveList'
    ])
  },
  methods: {
    menus() { // 判断是否显示menu菜单
      this.isMenus = !this.isMenus
    },
    keyUp(event, val) {
      if (val === '') {
        this.$http.jsonp('http://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg', {
          params: {
            g_tk: 5381,
            loginUin: 0,
            hostUin: 0,
            format: 'jsonp',
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq',
            needNewCode: 0
          },
          jsonp: 'jsonpCallback'
        }).then((response) => {
          this.searchHot = response.data.data
          this.$store.state['isShowInput'] = true
          this.$parent.isSearchList = false
          this.isSearchHot = true
        })
      }
    },
    key(event, val) {
      if (val === '') {
        return
      }
      this.$parent.isSearch = true
      this.isSearchHot = false
      this.$parent.isSearchList = true
      this.searchInfo = val
      this.$router.push({ path: '/searchList', query: { search: val } })
    },
    bank() {
      this.isSearchHot = false
      this.$store.state['isShowInput'] = false
      this.$router.push({ path: '/' })
    },
    play(index) {
      this.$parent.isSearch = false
      this.$parent.isAudioShow = true
      this.$store.commit('setPlayList', {
        index: index,
        list: this.$parent.searchRes.song.itemlist
      })
    },
    toLogin() {
      if (this.welcomeInfo == "请先登录") {
        this.$router.push({ path: '/Login' })
      } else {}
    },
    exit() {
      setCookie.deleteCookie('userName', '/');
      setCookie.deleteCookie('userPass', '/');
      this.isMenus = false;
      this.welcomeInfo = '请先登录';
      this.exitInfo = '';
      this.$store.commit('setUserName', {});
    },
    toMyLoveList() {
      this.$parent.isLoveList = true;
      this.isMenus = false;
    }
  }
}

</script>
<style type="text/css">


</style>
