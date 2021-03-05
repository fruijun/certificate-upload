<template>
  <div>
    <div class="title"><span class="bar"></span>{{ title }}</div>
  </div>
</template>

<script>
export default {
    name:'Title',
    props:{
        title:{
            type:String,
            default:'标题'
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    display: flex;
    flex-direction: row;;
    align-items: center;
    text-align: left;
    margin-top: 15px;
    margin-left: 14px;
    margin-right: 5px;
    padding-bottom: 15.5px;
    border-bottom: .6px solid $grayLine;
    color: $baseBlue;
    font-size: $fontSize14;;
    font-family: SourceHanSansCN-Medium;
    font-weight: 500;
    .bar {
        display: inline-block;
        width: 2px;
        height: 14px;
        background-color: $barBlue;
        margin-right: 9px;
    }
}
</style>