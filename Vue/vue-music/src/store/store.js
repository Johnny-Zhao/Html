import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    playing: false, //歌曲播放、暂停
    currentTime: 0, //歌曲当前播放时间
    duration: 0, //歌曲总时长
    playMode: 2, //播放模式=>随机0、单曲1、顺序2(默认)
    index: 0, //播放歌曲索引
    isLoop: false, //是否循环
    coverImgUrl: null, //歌曲信息图片
    song: {
      id: null,
      mid: null,
      name: null,
      singer: null
    },//歌曲信息
    lyric: null, //歌词
    playList: [], //播放列表
    loveList: [], //收藏列表
    loveIndex: 0, //收藏歌曲索引
    count: [], //获取api提供的一首歌曲信息
    countList: [], //获取api提供的所有歌曲信息列表
    searchRes: null, //搜索歌曲结果
    searchAlbumData: null,
    isShowInput: false,
    userName:'', //登录用户名
    isLoved: false
  },
  mutations: {
    setPlayList (state, playList) {
      state.index = playList.index
      // console.log(playList)
      if (playList.list[playList.index].data) {
        state.playList.push({
          'id': playList.list[state.index].data.songid,
          'mid': playList.list[state.index].data.songmid,
          'name': playList.list[state.index].data.songname,
          'singer': playList.list[state.index].data.singer[0].name
        })
      } else if (playList.list[playList.index].musicData) {
        state.playList.push({
          'id': playList.list[state.index].musicData.songid,
          'mid': playList.list[state.index].musicData.songmid,
          'name': playList.list[state.index].musicData.songname,
          'singer': playList.list[state.index].musicData.singer[0].name
        })
      } else if (playList.list[playList.index].belongCD) {
        state.playList.push({
          'id': playList.list[state.index].songid,
          'mid': playList.list[state.index].songmid,
          'name': playList.list[state.index].songname,
          'singer': playList.list[state.index].singer[0].name
        })
      } else {
        state.playList.push(playList.list[state.index])
      }
      state.song = state.playList[state.playList.length - 1]
    },
    setLoveList (state, loveList) {
      if (loveList.id) {
        state.loveList.push({
          'id': loveList.id,
          'mid': loveList.mid,
          'name': loveList.name,
          'singer': loveList.singer
        })
      }
    },
    getPlayList (state, index) {
      state.index = index.index
      state.song = state.playList[state.index]
    },
    getLoveList (state) {
      state.song = state.playList[state.playList.length-1]
    },
    isCount (state, is) {
      state.isCount = is.isCount
    },
    isRecommendedShow (state, is) {
      state.isRecommendedShow = is.isRecommendedShow
    },
    isAudioShow (state, is) {
      state.isAudioShow = is.isAudioShow
    },
    isLoved (state, is) {
      state.isLoved = is.isLoved
    },
    setCountList (state, countList) {
      state.count = countList.list
      state.countList = countList.countList
    },
    addToPlayList (state, item) {
      state.playList.push({'id': item.list.songid, 'mid': item.list.songmid, 'name': item.list.songname, 'singer': item.list.singer[0].name})
      if(state.currentTime==0){
        state.song = state.playList[0]
      }
    },
    loveAddToPlayList (state, item) {
      state.playList.push({'id': item.list.id, 'mid': item.list.mid, 'name': item.list.name, 'singer': item.list.singer})
      if(state.currentTime==0){
        state.song = state.playList[0]
      }
    },
    removeToPlayList (state, item) {
      state.playList.splice(item.index, 1)
      if (item.index <= 0) {
        state.index = 0
      }
      state.song = state.playList[state.index]
      if (typeof state.song === 'undefined') {
        state.song = {
          id: null,
          mid: null,
          name: null,
          singer: null
        }
        state.coverImgUrl = null
        state.playing = false
      }
    },
    removeToLoveList (state) {
      state.loveList.splice(state.loveIndex, 1)
    },
    updateDuration (state, time) {
      state.duration = time
    },
    updateCurrentTime (state, time) {
      state.currentTime = time
    },
    play (state) {
      if (state.song.id !== null) {
        state.playing = true
      }
    },
    pause (state) {
      state.playing = false
    },
    playFront (state) {
      state.index = (state.index - 1 + state.playList.length) % state.playList.length
      state.song = state.playList[state.index]
    },
    playNext (state) {
      state.index = (state.index + 1) % state.playList.length
      state.song = state.playList[state.index]
    },
    changePlayMode (state) {
      state.playMode = (state.playMode + 1) % 3
    },
    setUserName(state){
      state.userName = ''
    }
  },
  getters: {
    currentTime: state => {
      return parseInt(state.currentTime / 60) + ':' + (Array(2).join(0) + (state.currentTime % 60)).slice(-2)
    },
    duration: state => {
      return parseInt(state.duration / 60) + ':' + (Array(2).join(0) + (state.duration % 60)).slice(-2)
    }
  },
  actions: {
    playContinue ({commit, state}) {
      if (state.playList.length <= 1) {
        document.getElementById('music').currentTime = 0
        commit('updateCurrentTime', 0)
        state.song = state.playList[0]
        return
      }
      if (state.playMode === 1) {
      } else if (state.playMode === 2) {
        state.index = (state.index + 1) % state.playList.length
        state.song = state.playList[state.index]
      } else if (state.playMode === 0) {
        state.index = Math.floor(Math.random() * state.playList.length)
        state.song = state.playList[state.index]
        // console.log(state.playList, state.playMode, state.index)
      }
    }
  }
})

export default store