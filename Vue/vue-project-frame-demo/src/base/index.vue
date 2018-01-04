<template>
  <div>
    <v-header></v-header>
    <div class="mianContainer borderbox">
      <div class="mianColor">
        <router-view></router-view>
      </div>
    </div>
    <v-footer></v-footer>
  </div>

</template>

<script>
  import vHeader from './header..vue'
  import vFooter from './footer..vue'
  export default {
    components: {
      vHeader,
      vFooter
    },
    data() {
      return {}
    },
    methods: {},
    mounted() {

    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
