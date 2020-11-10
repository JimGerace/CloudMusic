<template>
  <div>
      <el-table :data="songlist" border stripe>
          <el-table-column type="index" label="序号" width="50px">
              <template slot-scope="scoped">
                  <i v-if="$store.state.curId == scoped.row.id" class="iconfont icon-yinliang red"></i>
                  <span v-else>{{scoped.$index+1}}</span>
              </template>
          </el-table-column>
          <el-table-column label="音乐标题">
              <template slot-scope="scoped">
                  <div class="musicTitle" @dblclick="openMusic(scoped.row)">{{scoped.row.name}}</div>
              </template>
          </el-table-column>
          <el-table-column label="歌手" width="200px">
              <template slot-scope="scoped">
                  {{scoped.row.ar[0].name}}
              </template>
          </el-table-column>
          <el-table-column label="专辑">
              <template slot-scope="scoped">
                  {{scoped.row.al.name}}
              </template>
          </el-table-column>
          <el-table-column label="时长" width="100px">
              <template slot-scope="scoped">
                  {{scoped.row.dt |FormTime() }}
              </template>
          </el-table-column>
      </el-table>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    props: ['id','curId'],
    data(){
        return{
            songlist: [],
            listId: []
        }
    },
    mounted(){
        this.getSongDetail()
    },
    watch: {
        id(newval){
            this.id = newval
        },
        curId(newval){
            this.curId = newval
        },
        $route(){
            this.id = window.localStorage.getItem('currentId')
            this.getSongDetail()
        }
    },
    methods: {
        //获取歌单详细
        getSongDetail(){
            this.$api.playlistDetail(this.id).then(res => {
                this.songlist = res.data.playlist.tracks
                this.handleSongSheetID(this.songlist)
            })
        },
        //播放该歌曲
        openMusic(item){
            this.changeCurId(item.id)
            this.changeCurrentPlaylist(this.songlist)
            this.changeListId(this.listId)
            this.$emit('openSong')
        },
        //处理歌单的歌曲id
        handleSongSheetID(list){
            let result = []
            list.forEach(item => {
                result.push(item.id)
            })
            this.listId = result
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
.el-table{
    margin-bottom: 50px;
}
.musicTitle{
    cursor: pointer;
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
}
</style>