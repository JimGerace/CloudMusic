<template>
  <div class="searchMusicBox">
      <el-table :data="musiclist" stripe border>
          <el-table-column type="index" label="序号" width="80px">
              <template slot-scope="scoped">
                  <i v-if="$store.state.curId == scoped.row.id" class="iconfont icon-yinliang red"></i>
                  <span v-else>{{scoped.$index+1}}</span>
              </template>
          </el-table-column>
          <el-table-column label="音乐标题">
              <template slot-scope="scoped">
                  <span class="music" @dblclick="checkedMusic(scoped.row.id)">{{scoped.row.name}}</span>
              </template>
          </el-table-column>
          <el-table-column label="歌手" width="250px">
              <template slot-scope="scoped">
                  <span>{{scoped.row.artists[0].name}}</span>
              </template>
          </el-table-column>
          <el-table-column label="专辑">
              <template slot-scope="scoped">
                  <span>{{scoped.row.album.name}}</span>
              </template>
          </el-table-column>
          <el-table-column label="音乐标题" width="120px">
              <template slot-scope="scoped">
                  <span>{{scoped.row.duration | FormTime()}}</span>
              </template>
          </el-table-column>
      </el-table>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    props: ['musiclist'],
    data(){
        return{
        }
    },
    methods:{
        //播放该歌曲
        checkedMusic(id){
            this.changeCurId(id)
            this.$emit('openSong')
        },
        ...mapMutations({
            changeCurId: 'PUT_CURID'
        })
    },
    watch:{
        musiclist(newval){
            this.musiclist = newval
        }
    }
}
</script>

<style lang='less' scoped>
.red{
    color: #C62F2F;
}
.searchMusicBox{
    margin-bottom: 40px;
}
.music{
    display: block;
    cursor: pointer;
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
}
</style>