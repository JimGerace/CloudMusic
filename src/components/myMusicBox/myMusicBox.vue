<template>
  <div class="myMusicBox">
      <!-- Table表单 -->
      <el-table :data="musiclist" border stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="100px">
          <template slot-scope="scoped">
            <i class="iconfont icon-yinliang red" v-if="$store.state.curId == scoped.row.songId"></i>
            <span v-else>{{scoped.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="songName" label="音乐标题">
          <template slot-scope="scoped">
            <span @dblclick="checkedMusic(scoped.row)" class="songName">{{scoped.row.songName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="artist" label="歌手" width="150px"></el-table-column>
        <el-table-column prop="album" label="专辑名"></el-table-column>
        <el-table-column prop="addTime" label="上传时间" width="150px">
          <template slot-scope="scoped">
            {{scoped.row.addTime|Form('yy-mm-dd')}}
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data(){
    return {
      limit: 20,
      offset: 0,
      musiclist: [],
      playlist: [],
      playlistId: []
    }
  },
  mounted(){
    this.getCloudBoxData()
  },
  methods:{
    //播放该歌曲
    checkedMusic(item){
      this.changeCurId(item.songId)
      this.changeCurrentPlaylist(this.playlist)
      this.changeListId(this.playlistId)
      this.$emit('openSong')
    },
    //获取云盘信息
    getCloudBoxData(){
      if(!window.localStorage.getItem('cookie')){
        return this.$message.error('请先登录，再进行操作')
      }
      this.$api.cloudData(this.limit, this.offset).then(res => {
        this.musiclist = res.data.data
        this.handleAddMusic(this.musiclist)
      })
    },
    //添加playlist数组
    handleAddMusic(list){
      this.playlist = []
      this.playlistId = []
      list.forEach(item => {
        this.playlist.push(item.simpleSong)
        this.playlistId.push(item.simpleSong.id)
      })
    },
    ...mapMutations({
        changeCurId: 'PUT_CURID',
        changeCurrentPlaylist: 'PUT_CURRENTPLAYLIST',
        changeListId: 'PUT_LISTID'
    })
  }
}
</script>

<style lang='less' scoped>
.red{
  color: #C62F2F;
}
.songName{
  display: block;
  cursor: pointer;
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}

.el-table{
  margin-bottom: 40px;
}
</style>