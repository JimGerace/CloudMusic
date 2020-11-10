<template>
  <div class="playBox">
      <!-- table表格 -->
      <el-table :data="$store.state.currentPlaylist" stripe>
          <el-table-column type="index" width="50px">
              <template slot-scope="scoped">
                  <i v-if="$store.state.curId == scoped.row.id" class="iconfont icon-yinliang red"></i>
                  <span v-else>{{scoped.$index+1}}</span>
              </template>
          </el-table-column>
          <el-table-column width="320px">
              <template slot-scope="scoped">
                  <span class="musictitle" @dblclick="checkedMusic(scoped.row)">{{scoped.row.name}}</span>
              </template>
          </el-table-column>
          <el-table-column width="150px">
              <template slot-scope="scoped">
                  <span class="artists" v-if="scoped.row.ar">{{scoped.row.ar[0].name}}</span>
                  <span class="artists" v-else>{{scoped.row.artists[0].name}}</span>
              </template>
          </el-table-column>
          <el-table-column width="60px">
              <template slot-scope="scoped">
                  <span v-if="scoped.row.dt">{{scoped.row.dt | FormTime()}}</span>
                  <span v-else>{{scoped.row.duration | FormTime()}}</span>
              </template>
          </el-table-column>
      </el-table>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    data(){
        return{
        }
    },
    methods:{
        //播放该歌曲
        checkedMusic(item){
            this.changeCurId(item.id)
            this.$emit('openMusic');
        },
        ...mapMutations({
            changeCurId: 'PUT_CURID'
        })
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
        overflow: hidden;
        -moz-user-select: none; /*火狐*/
        -webkit-user-select: none; /*webkit浏览器*/
        -ms-user-select: none; /*IE10*/
        -khtml-user-select: none; /*早期浏览器*/
        user-select: none;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
.red{
    color: #C62F2F;
}
.artists{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>