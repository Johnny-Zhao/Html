<template>
  <div class="childrenNav">
     <div class="navList borderbox">
       <div class="secNav">
         <router-link tag="span" v-for="(items,index) in navList" :to="items.url" :key="index">{{items.name}}</router-link>
       </div>
       </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      navList:{
        type:Array,
        default:[]
      }
    },
    data() {
      return {
      }
    },
    methods: {

    },
    created() {

    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../common/css/_variate";
  .navList{
    background-color: @secNavBgColor;
    .secNav{
      border-bottom: 3px solid @headerBgColor;
      span{
        display: inline-block;
        padding: 0 0.16rem;
        background-color: @secNavFontColor;
        margin-right: 0.02rem;
        font-size: @tabFontSize;
        line-height: .4rem;
        color: @curFirstTabBgColor;
        cursor: pointer;
      }
      span.router-link-active{
        background-color: @NavBgColr;
        color: #fff;
      }
    }
  }
</style>
