<template>
  <div class="findMusicBox">
    <!-- Tabs标签页 -->
    <el-tabs v-model="activeName" tab-position="top">
        <el-tab-pane name="recommend" label="个性推荐">
          <banner-img @closedFooter='closedFooter' @openSong='openSong'></banner-img>
        </el-tab-pane>
        <el-tab-pane name="songList" label="歌单">
          <music-list></music-list>
        </el-tab-pane>
        <el-tab-pane name="charts" label="排行榜">
          <charts></charts>
        </el-tab-pane>
        <el-tab-pane name="singer" label="歌手">
          <singer></singer>
        </el-tab-pane>
        <el-tab-pane name="lastestMusic" label="最新音乐">
          <lastest-music @openSong='openSong'></lastest-music>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
const bannerImg = () => import('./banner')
const musicList = () => import('./musicList')
const Charts = () => import('./Charts')
const Singer = () => import('./Singer')
const lastestMusic = () => import('./lastestMusic')
export default {
  data(){
    return{
      activeName: 'recommend'
    }
  },
  methods: {
    //接收子组件传递过来的事件，再向根组件传递
    openSong(){
      this.$emit('openSong')
    },
    //关闭底部进度条
    closedFooter(){
      this.$emit('closedFooter')
    }
  },
  components: {
    bannerImg,
    musicList,
    Charts,
    Singer,
    lastestMusic
  }
}
</script>

<style lang='less' scoped>
</style>