<template>
  <div style="position: relative;margin-top:.1rem;">
    <div style="width:2.4rem;position:absolute;z-index: 1;background-color:#fff;">
      <table class="df-table" style="width: 2.4rem;">
        <thead>
          <tr>
            <th style="width: 1rem;">物料</th>
            <th style="width: 1.4rem;">来源</th>
          </tr>
        </thead>
        <tbody v-for="(item,index) in basicCode" :key="index" class="df-tbody">
          <tr>
            <th rowspan="8">{{item}}</th>
          </tr>
          <tr>
            <th>预留</th>
          </tr>
          <tr>
            <th>专项备料</th>
          </tr>
          <tr>
            <th>新品替代</th>
          </tr>
          <tr>
            <th>手工导入</th>
          </tr>
          <tr>
            <th>模型预测</th>
          </tr>
          <tr>
            <th>预测手工调整</th>
          </tr>
          <tr>
            <th>合计</th>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="width: 17.4rem;overflow-x: auto;">
      <div id="dftableContainer" style="position: relative;">
        <div class="fl" style="width: 2.4rem;height: 100%;">占位符</div>
        <div class="fl" style="width: 2.4rem;">
          <table class="df-table">
            <tr>
              <th v-for="(item,index) in whichWeek" :key="index" style="min-width:2.4rem;">{{item}}</th>
            </tr>
            <tr v-for="(item,index) in 7">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr v-for="(item,index) in 7">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr v-for="(item,index) in 7">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {};
</script>

<style lang="less" scoped>
// 表格
.df-table {
  box-sizing: border-box;
  table-layout: fixed;
  th,
  td {
    font-weight: 500;
    text-align: center;
    box-sizing: border-box;
    height: 0.4rem;
    border: 1px solid @tableBorderColor;
    font-size: 0.16rem;
  }
}
</style>

