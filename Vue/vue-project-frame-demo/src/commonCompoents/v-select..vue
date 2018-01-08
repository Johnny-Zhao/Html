<template>
  <div class="select-wrap">
    <div v-if="selectType == 'single'">
      <label>{{ labelText }}</label>
      <el-select v-model="value" clearable filterable :placeholder="placeholder" @change="getQueryInfo">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div v-if="selectType == 'multiple'">
      <label>{{ labelText }}</label>
      <el-select v-model="value" clearable multiple filterable :placeholder="placeholder" @change="getQueryInfo">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div v-if="selectType == 'date'">
      <label>{{ labelText }}</label>
      <el-date-picker
        v-model="value"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
    </div>
    <div v-if="selectType == 'text'">
      <label>{{ labelText }}</label>
      <input type="text" class="input" v-model="value">
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Select, DatePicker } from "element-ui";
Vue.use(Select, DatePicker);
export default {
  name: "Select",
  data() {
    return {
      value: ""
    };
  },
  props: {
    selectType: {
      type: String,
      default: "single"
    },
    labelText: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getQueryInfo() {
      if (this.selectType == "date") {
        // 格式化时间
        let formadate = common.formmatDate(this.value);
        this.$emit("getSingleSelectInfo", formadate);
      } else {
        this.$emit("getSingleSelectInfo", this.value);
        console.log(this.value);
      }
    }
  },
  created() {}
};
</script>
<style lang="less" rel="stylesheet/less">
// 重写select样式
.el-icon-arrow-up:before {
  content: "\E60C";
}
.el-input__inner {
  border-radius: 0.03rem;
}
.el-input__inner {
  height: 0.44rem;
  width: 2.75rem;
  border-color: #d5d5d5;
}
</style>
<style lang="less" rel="stylesheet/less" scoped>
//label字体颜色
@labelFontColor: #333333;
.select-wrap {
  display: inline-block;
  width: 25%;
  margin-bottom: 0.1rem;
  float: left;
  label {
    color: @labelFontColor;
    width: 1rem;
    font-size: 0.18rem;
    float: left;
    height: 0.44rem;
    line-height: 0.44rem;
    margin-left: 0.275rem;
  }
  .input {
    width: 2.75rem;
    height: 0.44rem;
    box-sizing: border-box;
    border-top: none;
    border-bottom: none;
    border-left: none;
    border-right: none;
    border: 0.01rem solid #d5d5d5;
    font-size: 0.16rem;
    padding: 0rem 0.1rem;
    border-radius: 0.03rem;
    display: inline-block;
    &::focus {
      border-color: #409eff;
    }
  }
}
</style>
