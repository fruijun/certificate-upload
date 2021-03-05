<template>
  <div class="loading-container">
    <div class="mask">
      <div>
        <img src="../../assets/img/app_toast_loading@2x.png" class="loading"/>
      </div>
      <div class="tips">{{ tips }}</div>
    </div>
  </div>
</template>

<script>
export default {
name:'Loading',
props:{
  tips:{
    type:String,
    // required:true,
    default:'数据加载中'
  }
}
}
</script>

<style lang="scss" scoped>
.loading-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  z-index: 9999;
}
.mask{
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  height: 120px;
  margin: 0 auto;
  background-color: $maskBg;
  opacity: .7;
  border-radius: 5px;
  .tips{
    font-size: $fontSize14;
    color:$white;
    margin-top: 27.5px;
  }
}
.loading {
  margin-top: 25px;
  width: 29px;
  height: 29.5px;
  animation: 1.2s loader linear infinite;
}
@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>