<template>
  <div class="audio-warp">
    <div class="header">
      <div class="search-bank">
        <i class="gxs-icon" v-on:click="bank($event)"><img src="../assets/images/icon-back.png" alt=""></i>
      </div>
      <div class="audio-title">
        <p class="song-name">{{song.name}}</p>
        <p class="singer-name">{{song.singer}}</p>
      </div>
    </div>
    <div class="audio-box">
      <!-- timeupdate 事件在音频/视频（audio/video）的播放位置发生改变时触发 -->
      <audio id="music" v-bind:src="dataUrl" v-on:timeupdate="updateTime" v-on:ended="playContinueS" v-bind:autoplay="dataAutoPlay" v-bind:loop="isLoop">
      </audio>
    </div>
    <div class="lyric" ref="abc">
      <p class="lyric-item" v-for="data in lyric" v-bind:class="data[0][1]">{{data[1]}}</p>
    </div>
    <div class="audio-progress-warp">
      <div class="audio-progress" v-on:click="touchSit($event)" id="audio-progress">
        <div class="audio-progress-box" v-bind:style="{width:indicatorPosition+'%'}">
          <div class="audio-progress-touch"></div>
        </div>
      </div>
      <div class="audio-progress-text">
        <p>{{currentTime}}</p>
        <p>{{duration}}</p>
      </div>
    </div>
    <div class="audio-nav">
      <div class="audio-nav-button">
        <div class="audio-play-order">
          <i v-bind:class="getPlayModeClass" class="gxs-icon" v-on:click="changePlayMode"></i>
        </div>
        <div class="audio-nav-btn">
          <i class="audio-l" v-on:click="playFront"><img src="../assets/images/icon-step-backward.png" alt=""></i>
          <i class="audio-c" v-bind:class="playing ? 'gxs-playClass' : 'gxs-pauseClass'" v-on:click="$parent.tapButton"></i>
          <i class="audio-r" v-on:click="playNext"><img src="../assets/images/icon-icon-step-forward.png" alt=""></i>
        </div>
        <div class="audio-list" v-show="isShowLove">
          <i class="icon-aixin" :class="isLoved ? 'icon-aixin-full' : 'icon-aixin-empty'" v-on:click="addLoveList()"></i>
        </div>
        <div class="audio-list" v-show="!isShowLove">
          <i class="gxs-icon icon-reorder" v-on:click="showPlayList($event)"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import Base64 from '../base64.js'
import PlayList from './PlayList'
import axios from 'axios'
import { mapMutations, mapGetters, mapState } from 'vuex'
export default {
  name: 'Search',
  data() {
    return {
      searchRes: null,
      searchInfo: '',
      isSearch: false,
      isMid: null,
      isId: null,
      pauseClass: 'icon-pause',
      PlayClass: 'icon-play',
      playModeClass: null
    }
  },
  components: {
    PlayList
  },
  computed: {
    getPlayModeClass() {
      let playModeClass = ''
      if (this.playMode === 1) {
        playModeClass = 'icon-retweet'
        this.$store.state.isLoop = true
      } else if (this.playMode === 2) {
        playModeClass = 'icon-exchange'
        this.$store.state.isLoop = false
      } else {
        playModeClass = 'icon-random'
        this.$store.state.isLoop = false
      }
      return playModeClass
    },
    ...mapState({
      dataUrl(state) {
        if (typeof state.song.id === 'undefined') {
          this.isId = state.song.data.songid
        } else {
          this.isId = state.song.id
        }
        if (this.isId) {
          return 'http://ws.stream.qqmusic.qq.com//' + this.isId + '.m4a?fromtag=46'
        } else {
          return ''
        }
      },
      dataAutoPlay(state) {
        return state.playing
      },
      isShowLove(state) {
        if (state.userName.length > 0) {
          return true
        } else {
          return false
        }
      }
    }),
    ...mapGetters([
      'currentTime', 'duration'
    ]),
    ...mapState([
      'playing', 'song', 'playList', 'playMode', 'isLoop', 'lyric', 'userName', 'isLoved'
    ]),
    ...mapState({
      indicatorPosition(state) {
        let dataTime
        for (let data in this.lyric) {
          dataTime = data.split(':')
          dataTime = parseInt(dataTime[0]) * 60 + parseInt(dataTime[1])
          if (state.currentTime === dataTime) {
            for (let inData in this.lyric) {
              if (this.lyric[inData][0][1] === 'cur') {
                this.lyric[inData][0][1] = ''
              }
            }
            let ele = $('.lyric').find('.cur')
            if (ele.length > 0) {
              $('.lyric').animate({ 'scrollTop': $('.lyric').scrollTop() + ele.offset().top - $('.lyric').offset().top - 130 }, 350)
            }
            this.lyric[data][0].push('cur')
          }
          dataTime = ''
        }
        return state.currentTime / state.duration * 100
      }
    })
  },
  methods: {
    updateTime() {
      // currentTime 属性设置或返回音频/视频播放的当前位置（以秒计）
      this.$store.commit('updateCurrentTime', parseInt(document.getElementById('music').currentTime))
      // duration 属性返回当前音频的长度
      this.$store.commit('updateDuration', parseInt(document.getElementById('music').duration))
    },
    showPlayList(event) {
      this.$parent.isPlayList = true
    },
    touchSit(event) {
      document.getElementById('music').currentTime = parseInt(document.getElementById('music').duration) * ((event.pageX - 10) / $('#audio-progress').width())
      this.$store.commit('updateCurrentTime', parseInt(document.getElementById('music').duration) * ((event.pageX - 10) / $('#audio-progress').width()))
      event.preventDefault()
    },
    playContinueS() {
      if (this.playList.length <= 1) {
        // this.$parent.tapButton()
        this.$store.dispatch('playContinue')
        this.$parent.tapButton()
      } else {
        this.$store.dispatch('playContinue')
      }
    },
    bank() {
      this.$parent.isAudioShow = false
    },
    ...mapMutations([
      'playNext', 'playFront', 'changePlayMode'
    ]),
    addLoveList() {
      let self = this
      if (self.$store.state.userName.length) {
        if (!self.$store.state.isLoved) {
          axios({
            method: 'post',
            url: 'api/user/addLove',
            data: {
              user_name: self.$store.state.userName,
              songid: self.$store.state.song.id,
              songmid: self.$store.state.song.mid,
              song_name: self.$store.state.song.name,
              song_singer: self.$store.state.song.singer
            },
            timeout: 3000
          }).then(function(response) {
            self.$store.state.isLoved = true
            self.$store.commit("setLoveList",self.$store.state.song)
          }).catch(function(error) {
            console.log(error);
          });
        } else if (self.$store.state.isLoved) {
          axios({
            method: 'post',
            url: 'api/user/removeLove',
            data: {
              id: self.$store.state.song.id
            },
            timeout: 3000
          }).then(function(response) {
            self.$store.commit('removeToLoveList')
            self.$store.state.isLoved = false
          }).catch(function(error) {
            console.log(error);
          });
        }
        
      } else {}
    }
  },
  watch: {
    // 获取歌词
    song(song) {
      $('.lyric').animate({ 'scrollTop': 0 }, 350)
      $('body').css({ 'overflow': 'hidden' })
      this.$http.jsonp('https://api.darlin.me/music/lyric/' + song.id, {
        jsonp: 'callback'
      }).then(function(response) {
        this.$store.state['lyric'] = Base64
          .decode(response.data.lyric)
          .split('[')
          .slice(5)
          .map(str => {
            let t = str.split(']')
            return {
              [t[0]]: [
                [t[0]], t[1]
              ]
            }
          })
          .reduce((a, b) => {
            return { ...a, ...b }
          })
      })
    }
  }
}

</script>
<style type="text/css" scoped>
.audio-list {
  
}

.icon-aixin {
  width: 3.2rem;
  height: 3rem;
  display: block;
  background-size: 100%;
}

.icon-aixin-empty {
  background: url(../assets/images/aixin-empty.png) no-repeat;
}

.icon-aixin-full {
  background: url(../assets/images/aixin-full.png) no-repeat;
}

</style>
