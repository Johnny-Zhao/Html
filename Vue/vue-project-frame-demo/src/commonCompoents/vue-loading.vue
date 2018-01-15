<template>
  <div class="loading-wrap">
    <svg class="loading" width="44px" height="44px" viewBox="0 0 44 44">
      <circle class="path" fill="none" stroke-width="4" stroke-linecap="round" cx="22" cy="22" r="20"></circle>
    </svg>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {}
    },
    methods: {},
    created() {

    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .loading-wrap {
    position: absolute;
    top:0;
    right: 0;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .loading-text {
    color: #999;
    padding: 25px 0;
  }
  .loading {
    animation: rotator 1.4s linear infinite;
  }
  @keyframes rotator {
    0% {
      transform: scale(0.5) rotate(0deg);
    }
    100% {
      transform: scale(0.5) rotate(270deg);
    }
  }
  .loading .path {
    stroke: #009dd7;
    stroke-dasharray: 126;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: dash 1.4s ease-in-out infinite;
  }
  @keyframes dash {
    0% {
      stroke-dashoffset: 126;
    }
    50% {
      stroke-dashoffset: 63;
      transform: rotate(135deg);
    }
    100% {
      stroke-dashoffset: 126;
      transform: rotate(450deg);
    }
  }
</style>
