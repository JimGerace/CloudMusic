<template>
  <div class="albumListBox">
      <el-table border stripe :data="musicInfo">
          <el-table-column type="index" label="序号" width="80px">
              <template slot-scope="scoped">
                  <span v-if="$store.state.curId == scoped.row.id" class="iconfont icon-yinliang red"></span>
                  <span v-else>{{scoped.$index+1}}</span>
              </template>
          </el-table-column>
          <el-table-column label="音乐标题">
              <template slot-scope="scoped">
                  <span class="musictitle" @dblclick="selectedMusic(scoped.row.id)">{{scoped.row.name}}</span>
              </template>
          </el-table-column>
          <el-table-column label="歌手">
              <template slot-scope="scoped">
                  <span v-if="scoped.row.ar.length == 1">{{scoped.row.ar[0].name}}</span>
                  <span v-else>{{scoped.row.ar[0].name+'/'+scoped.row.ar[1].name}}</span>
              </template>
          </el-table-column>
          <el-table-column label="专辑">
              <template slot-scope="scoped">
                  {{scoped.row.al.name}}
              </template>
          </el-table-column>
          <el-table-column label="时长" width="120px">
              <template slot-scope="scoped">
                  {{scoped.row.dt | FormTime()}}
              </template>
          </el-table-column>
      </el-table>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    props: ['musicInfo'],
    methods: {
        // 播放该音乐
        selectedMusic(id){
            this.changeCurId(id)
            this.$emit('openSong')
        },
        ...mapMutations({
            changeCurId : 'PUT_CURID'
        })
    },
    watch: {
        musicInfo(newVal){
            this.musicInfo = newVal
        }
    }
}
</script>

<style lang='less' scoped>
.red{
    color: #C62F2F;
}
.musictitle{
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