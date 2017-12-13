<template>
  <div class="list-warp">
    <div class="list">
      <div class="list-box list-box-audio">
        <p class="audio-songName">{{clickLoveList.name}}</p>
        <p class="audio-singerName">{{clickLoveList.singer}}</p>
      </div>
      <div class="list-box" v-on:click="removeLoveList(index)">取消收藏</div>
    </div>
    <div class="list-bg" v-on:click="closeListMeng(isLoveListMeng)"></div>
  </div>
</template>
<script type="text/javascript">
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  name: 'Search',
  props: ['ListMeng', 'index', 'clickLoveList'],
  data() {
    return {
      isMid: null,
      isId: null,
      isLoveListMeng: false
    }
  },
  computed: {
    ...mapState([
      'playing', 'song', 'coverImgUrl', 'count', 'playList'
    ])
  },
  mounted() {},
  methods: {
    removeLoveList(index) {
      let self = this
      for (let i = 0; i < this.$store.state.loveList.length; i++) {
        if (self.clickLoveList.id == this.$store.state.loveList[i].id) {
          self.$store.state.loveIndex = i
        }
      }
      axios({
        method: 'post',
        url: 'api/user/removeLove',
        data: {
          id: self.clickLoveList.id
        },
        timeout: 3000
      }).then(function(response) {
        self.$store.commit('removeToLoveList')
      }).catch(function(error) {
        console.log(error);
      });
      this.$parent.isLoveListMeng = false
    },
    closeListMeng(isLoveListMeng) {
      this.$parent.isLoveListMeng = false
    }
  },
  watch: {}
}

</script>
<style type="text/css">


</style>
