<template>
  <div class="popup-wrap">
    <div class="popup-box">
      <span>{{ info }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Register',
  props:['info']
}
</script>

<style type="text/css" scoped="" lang="scss">
  .popup-wrap{
    position: fixed;
    top:30%;
    left: 50%;
    margin-left: -10rem;
    z-index:10;
    .popup-box{
      width:20rem;
      height: 8rem;
      background: #FFFFFF;
      box-shadow: 0 3px 10px #EEEEEE;
      border-radius: 5px;   
      span{
        height:100%;
        width:100%;
        display: flex;
        justify-content:center;
        align-items:center;
        font-size: 1.3rem;
      }
    }
  }
</style>
