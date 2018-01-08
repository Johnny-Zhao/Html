<template>
  <div class="btn_wrap">
    <!-- 灰色按钮 点击弹出文本 -->
    <input v-if="btnClassType=='info'&&functionType=='popText'" type="button" class="btn btnInfo" v-model="btnText" @click="popText()">
    <!-- 灰色按钮 点击弹出日期文本框 -->
    <input v-if="btnClassType=='info'&&functionType=='popDate'" type="button" class="btn btnInfo" v-model="btnText" @click="popDate()">
    <!-- 橘色按钮 点击查询 -->
    <input v-if="btnClassType=='query'&&functionType=='queryOption'" type="button" class="btn btnQuery" v-model="btnText">
    <!-- 导出按钮 点击下载 -->
    <input v-if="btnClassType=='download'&&functionType=='downFile'" type="button" class="btn btnDownfile" v-model="btnText">
    <!-- 蒙层 -->
    <div class="mask" @click="closeDialog()" v-show="isShowItemDialog || isShowDateDialog"></div>
    <!-- 物料-对话框 -->
    <transition name="fade">
      <dialog open="open" class="dialog-xs" v-show="isShowItemDialog">
        <div class="title">
          <span>{{dialogTitle}}</span>
          <i @click="closeDialog()">&times;</i>
        </div>
        <div class="item-panel">
          <ul>
            <li v-for="(item,index) in itemData" @click="selectItemNum(index)" :key="index">{{ item }}</li>
          </ul>
        </div>
      </dialog>
    </transition>
    <!-- 日期-对话框 -->
    <transition name="fade">
      <dialog open="open" v-show="isShowDateDialog">
        <div class="title">
          <span>{{dialogTitle}}</span>
            <i @click="closeDialog()">&times;</i>
        </div>
        <div class="panel">
          <!-- <vue-input value="新交货周期" wrapWidth="75%"></vue-input> -->
          <!-- <vue-button value="更新" orangeBg="true"></vue-button> -->
        </div>
      </dialog>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
// import vueButton from "../commonCompoents/vue-button..vue";
// import vueInput from "../commonCompoents/vue-input..vue";
export default {
  components: {
    // vueButton,
    // vueInput
  },
  data() {
    return {
      isShowItemDialog: false,
      isShowDateDialog: false
    };
  },
  props: {
    btnClassType: {
      type: String,
      default: "info"
    },
    btnText: {
      type: String,
      default: ""
    },
    functionType: {
      type: String,
      default: "popText"
    },
    itemData: {
      type: Array,
      default: []
    },
    dialogTitle: {
      type: String,
      default: ""
    }
  },
  methods: {
    closeDialog() {
      this.isShowItemDialog = false;
      this.isShowDateDialog = false;
    },
    popText() {
      this.isShowItemDialog = true;
    },
    popDate() {
      this.isShowDateDialog = true;
    }
  },
  created() {}
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "../common/css/_variate.less";
.btn_wrap {
  display: inline-block;
  margin-right: 0.06rem;
  font-size: 0.18rem;
  .btn {
    height: 0.44rem;
    border-top: none;
    border-bottom: none;
    border-left: none;
    border-right: none;
    outline: none;
    cursor: pointer;
    border-radius: 0.03rem;
    padding: 0 0.35rem;
    transition: background 1s;
  }
}

.btnInfo {
  background: linear-gradient(rgba(230, 230, 230, 0.7), rgba(207, 207, 207, 1));
  color: #333333;
  &:hover {
    background: linear-gradient(
      rgba(230, 230, 230, 0.7),
      rgba(207, 207, 207, 0.7)
    );
  }
}

.btnQuery {
  background: linear-gradient(rgba(248, 184, 73, 0.7), rgba(237, 161, 28, 1));
  color: #ffffff;
  &:hover {
    background: linear-gradient(
      rgba(248, 184, 73, 0.7),
      rgba(237, 161, 28, 0.7)
    );
  }
}

.btnDownfile{
  background: linear-gradient(rgba(27, 156, 236, 0.7), rgba(27, 156, 236, 1));
  color: #ffffff;
  &:hover {
    background: linear-gradient(
      rgba(27, 156, 236, 0.7),
      rgba(27, 156, 236, 0.7)
    );
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

// 对话框
dialog {
  width: 6rem;
  height: 3.3rem;
  padding: 0 0.16rem;
  font-weight: 600;
  border-radius: 0.03rem;
  border: none;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -1.15rem;
  margin-left: -3rem;
  background: #ffffff;
  z-index: 9999;
  -webkit-overflow-scrolling: touch;
  .title {
    height: 0.48rem;
    line-height: 0.48rem;
    color: #333333;
    font-size: 0.2rem;
    position: relative;
    i {
      float: right;
      cursor: pointer;
      font-style: normal;
      &:hover {
        color: @checkBoxBorderColor;
      }
    }
    &::after {
      content: "";
      position: absolute;
      top: 0.48rem;
      left: 0;
      width: 100%;
      height: 0.01rem;
      background: #e0e0e0;
    }
  }
  .panel {
    background: #eeeeee;
    margin: 0.3rem 0;
    padding: 0.89rem 0.16rem;
  }
  .item-panel {
    background: #eeeeee;
    padding: 0.22rem 0.32rem 0.1rem 0.32rem;
    overflow: auto;
    height: 2.2rem;
    ul {
      display: block;
      li {
        display: block;
        font-size: 0.18rem;
        padding: 0.1rem;
        cursor: pointer;
        &:hover {
          background: #d2d2d2;
        }
      }
    }
  }
}
// 小号弹出框
.dialog-xs {
  width: 2.8rem;
  position: absolute;
  margin-left: -1.4rem;
}

// 蒙层
.mask {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: rgba(51, 51, 51, 0.4);
  z-index: 9998;
}
</style>
