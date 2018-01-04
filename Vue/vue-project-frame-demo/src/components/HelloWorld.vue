<template>
  <div class="hello">
    <vue-echarts :id="hehe" :height="600" :width="600" :option="options"></vue-echarts>
  </div>
</template>
<script>
import vueEcharts from '../commonCompoents/vue-echarts..vue'
export default {
  name: 'HelloWorld',
  components: {
    vueEcharts
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      hehe: 'id',
      options: {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
@import "../common/css/index.less";
</style>
