<template>
  <div class="backtop">
      <el-backtop :visibility-height='300' :bottom="100">
          <img src="../../assets/img/backtop.png">
      </el-backtop>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.backtop{
  position: fixed;
  right: 2%;
  bottom: 0;
  img{
    position: relative;
    width: 90px;
    height: 100px;

    &:hover{
      transform: translateY(-5%);
    }
  }
}
.el-backtop{
    width: 0;
    height: 0;
    background-color: none;
}
</style>