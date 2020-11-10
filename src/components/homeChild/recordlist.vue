<template>
  <div class="playBox">
      <!-- table表格 -->
      <el-table :data="songSheet" stripe>
          <el-table-column type="index">
              <template slot-scope="scoped">
                  <i v-if="$store.state.curId == scoped.row.id" class="iconfont icon-yinliang red"></i>
                  <span v-else>{{scoped.$index+1}}</span>
              </template>
          </el-table-column>
          <el-table-column>
              <template slot-scope="scoped">
                  <span class="musictitle" @dblclick="checkedMusic(scoped.row)">{{scoped.row.name}}</span>
              </template>
          </el-table-column>
          <el-table-column width="160px">
              <template slot-scope="scoped">{{scoped.row.ar[0].name}}</span>
              </template>
          </el-table-column>
          <el-table-column width="60px">
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
    props: ['songSheet','musicId'],
    data(){
        return{
        }
    },
    methods:{
        //播放该歌曲
        checkedMusic(item){
            this.changeCurId(item.id)
            this.$emit('openMusic')
        },
        ...mapMutations({
            changeCurId: 'PUT_CURID'
        })
    },
    watch: {
        songSheet(newval){
            this.songSheet = newval
        },
        musicId(newval){
            this.musicId = newval
        }
    }
}
</script>

<style lang='less' scoped>
.el-table {
    z-index: 50;
    font-size: 13px;
    .musictitle{
        display: block;
        cursor: pointer;
        -moz-user-select: none; /*火狐*/
        -webkit-user-select: none; /*webkit浏览器*/
        -ms-user-select: none; /*IE10*/
        -khtml-user-select: none; /*早期浏览器*/
        user-select: none;
    }
}
.red{
    color: #C62F2F;
}
</style>