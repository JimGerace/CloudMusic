<template>
  <div class="videoBox">
      <!-- Tabs标签页 -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="视频" name="video">
            <video-child @closedFooter='closedFooter'></video-child>
        </el-tab-pane>
        <el-tab-pane label="MV" name="mv">
            <mv-list @closedFooter='closedFooter'></mv-list>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import videoChild from './videoChild'
import mvList from './mvList'
export default {
    data(){
        return{
            activeName: 'video'
        }
    },
    methods:{
        //接受子组件传递过来的信息
        closedFooter(){
            this.$emit('closedFooter')
        }
    },
    components: {
        videoChild,
        mvList
    }
}
</script>

<style lang='less' scoped>

</style>