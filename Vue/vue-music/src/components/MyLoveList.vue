<template>
  <div class="list-warp play-list-warp count-warp">
    <div class="audio-head header">
      <div class="search-bank">
        <i class="gxs-icon" v-on:click="bank($event)"><img src="../assets/images/icon-back.png" alt=""></i>
      </div>
      <div class="audio-title">
        <p class="song-name">我的收藏</p>
      </div>
    </div>
    <div class="list play-list">
      <div class="count-box" v-for="(item,index) in loveList">
        <div class="count-box-index">{{index+1}}</div>
        <div class="count-box-info" v-on:click="play(index)">
          <p class="count-box-title">{{item.name}}</p>
          <p class="count-box-name">{{item.singer}}</p>
        </div>
        <div class="count-box-button" v-on:click="list(index)"><i class="icon-angle-down"></i></div>
      </div>
    </div>
    <div class="list-bg" v-on:click="bank($event)"></div>
    <transition name="fade">
      <love-list-meng v-if="isLoveListMeng" v-bind:ListMeng="isLoveListMeng" v-bind:index="LoveListIndex" v-bind:clickLoveList="LoveListNew"></love-list-meng>
    </transition>
  </div>
</template>
<script type="text/javascript">
import LoveListMeng from './LoveListMeng'
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isLoveListMeng: false,
      LoveListNew: null,
      LoveListIndex: null
    }
  },
  computed: {
    ...mapState([
      'playing', 'song', 'coverImgUrl', 'count', 'loveList'
    ])
  },
  components: {
    LoveListMeng
  },
  props: ['ListMeng', 'index'],
  methods: {
    bank() {
      this.$parent.isLoveList = false
    },
    play(index) {
      this.$store.state['playing'] = true
      let self = this
      let flag = false
      if (this.$store.state.playList.length < 1) {
        this.$store.commit('loveAddToPlayList', {
          list: this.$store.state.loveList[index]
        })
      } else {
        for (let i = 0; i < self.$store.state.playList.length; i++) {
          if (self.$store.state.playList[i].mid == self.$store.state.loveList[index].songmid) {
            flag = true
          }
        }
        if (!flag) {
          self.$store.commit('loveAddToPlayList', {
            list: self.$store.state.loveList[index]
          })
        }
      }
      self.$store.state.isLoved = true
      this.$store.commit('getLoveList', {})
      this.bank()
    },
    list(index) {
      this.isLoveListMeng = true
      this.LoveListNew = this.$store.state.loveList[index]
      this.LoveListIndex = index
    }
  },
  watch: { }
}

</script>
<style type="text/css">


</style>
