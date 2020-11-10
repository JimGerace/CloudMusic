<template>
  <div class="songBox">
      <div class="box-header">

        <div class="header-left">
          <img v-lazy="listDetail.coverImgUrl+'?param=200y200'">

          <div class="left-content">
            <div class="content-title">
              <span class="title-tag">歌单</span>
              <span>{{listDetail.name}}</span>
            </div>

            <div class="content-user">
              <img v-lazy="creator.avatarUrl">
              <span class="username">{{creator.nickname}}</span>
              <span class="create-time">{{listDetail.createTime | Form('yy-mm-dd')}}创建</span>
            </div>

            <div class="content-btn">
              <el-button icon="el-icon-video-play" size="small" class="playevery" @click="openFirstMusic">播放全部</el-button>
              <el-button icon="el-icon-folder-add" disabled v-if="userInfo  && creator.nickname == userInfo.nickname" size="small" class="collection">收藏{{'('+listDetail.subscribedCount+')'}}</el-button>
              <el-button icon="el-icon-folder-add" @click="collectMusic" v-else-if="listDetail.subscribed == false" size="small" class="collection">未收藏{{'('+listDetail.subscribedCount+')'}}</el-button>
              <el-button icon="el-icon-folder-checked" @click="cancelCollect" v-else size="small" class="collection">已收藏{{'('+listDetail.subscribedCount+')'}}</el-button>
              <el-button icon="iconfont icon-fenxiang" size="small" class="share"> 分享{{'('+listDetail.shareCount+')'}}</el-button>
              <el-button icon="iconfont icon-download" size="small" class="download"> 下载全部</el-button>
            </div>

            <div class="tagBox" v-if="listDetail.description !== null">
              <div class="tagsContent">
                <label class="tagsTitle">标签:</label>
                <span class="tags" v-if="listDetail.tags == false">添加标签</span>
                <span class="tags" v-else v-for="(item,index) in listDetail.tags" :key="index">{{item}} </span>
              </div>
              <div class="des">
                <span class="desTitle">简介:</span>
                <div v-if="listDetail.description != ''" class="desContent">
                  {{listDetail.description}}
                </div>
                <div v-else class="desFont">添加标签</div>
              </div>
            </div>

          </div>
        </div>

        <div class="header-right">

          <div class="musicNum">
            <i></i>
            <span>歌曲数</span>
            <p>{{listDetail.trackCount}}</p>
          </div>

          <div class="playcount">
            <span>播放数</span>
            <p>{{listDetail.playCount}}</p>
          </div>
        </div>
      </div>

      <!-- Tabs标签页 -->
      <div class="box-tabs">
        <el-tabs v-model="activeName">
          <el-tab-pane label="歌单列表" name="musiclist">
            <!-- 歌单详细组件 -->
            <songlist-detail @openSong='openSong()' :id='id'></songlist-detail>
          </el-tab-pane>
          <el-tab-pane :label="'评论('+ listDetail.commentCount +')'" name="musicCommend">
            <!-- 歌单评论 -->
            <song-commend></song-commend>
          </el-tab-pane>
          <el-tab-pane label="收藏者" name='musicCollection'>
            <!-- 歌单收藏 -->
            <song-collection></song-collection>
          </el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>

<script>
import songlistDetail from './songlistDetail'
import songCommend from './songCommend'
import songCollection from './songCollection'
import { mapMutations } from 'vuex'
export default {
  data(){
    return {
      id: this.$route.params.id,
      listDetail: {},
      creator: {},
      //用户信息
      userInfo: window.localStorage.getItem('userInfo') === 'null'? null: JSON.parse(window.localStorage.getItem('userInfo')),
      //当前激活的标签页
      activeName: 'musiclist',
      // 是否收藏该歌单的提交信息
      t: 1,
      //该歌单的歌曲
      songlist: [],
      //该歌单歌曲的id数组
      listId: []
    }
  },
  mounted(){
    this.getPlaylistDetail()
  },
  watch: {
    $route(){
      this.activeName = 'musiclist'
      window.localStorage.setItem('currentId', this.$route.params.id)
      this.id = this.$route.params.id
      this.getPlaylistDetail()
    }
  },
  methods:{
    //向根组件传递id
    openSong(){
      this.$emit('openSong')
    },
    //播放第一首歌曲
    openFirstMusic(){
      this.$api.playlistDetail(this.id).then(res => {
        this.songlist = res.data.playlist.tracks
        this.handleSongSheetID(this.songlist)
        this.changeCurId(this.listId[0])
        this.changeListId(this.listId)
        this.changeCurrentPlaylist(this.songlist)
        this.$emit('openSong')
      })
    },
    //获取歌单的详细信息
    getPlaylistDetail(id){
      this.$api.playlistDetail(this.id).then(res => {
        this.listDetail = res.data.playlist
        this.creator = res.data.playlist.creator
        this.playcount(this.listDetail, 'playCount')
      })
   },
    //点击收藏歌单
    collectMusic(){
      this.$api.collectPlaylist(this.t, this.id).then(res => {
        this.$message.success('收藏歌单成功')
      })
    },
    //取消收藏
    async cancelCollect(){
      const result = await this.$confirm('确定不再收藏该歌单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).catch((error)=>{
          return error
        })
      if(result == 'cancel'){
        return this.$message.info('已取消操作')
      }
      this.t = 2
      this.$api.collectPlaylist(this.t, this.id).then(res => {
        this.t = 1
        this.$message.success('已成功取消收藏')
      })
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
  },
  components: {
    songlistDetail,
    songCommend,
    songCollection
  }
}
</script>

<style lang='less' scoped>
.songBox{
  padding: 10px;
}
.box-header{
  display: flex;
  justify-content: space-between;

  .header-left{
    width: 80%;
    display: flex;
    img{
      width: 200px;
      height: 200px;
      margin-right: 20px;
    }
    .left-content{
      .content-title{
        display: flex;
        padding-bottom: 10px;
        align-items: center;
        .title-tag{
          width: 40px;
          height: 20px;
          font-size: 14px;
          color: #E03F40;
          margin-top: 4px;
          margin-right: 10px;
          text-align: center;
          border: 1px solid #E03F40;
        }
        span{
          font-size: 24px;
        }
      }
    }

    .content-user{
      display: flex;
      align-items: center;
      img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .username{
        color: #666;
        margin-right: 15px;
      }
      .create-time{
        font-size: 12px;
        color: #888;
      }
    }

    .content-btn{
      display: flex;
      align-items: center;
      margin-top: 10px;
      .playevery{
        border: 0;
        color: #fff;
        background-color: #C62F2F;
        &:hover{
          background-color: #B12323;
        }
      }
    }

    .tagBox{
      font-size: 13px;
      padding-top: 20px;
      .tagsContent{
        margin-bottom: 5px;
        .tagsTitle{
          color: #333;
          margin-right: 10px;
        }
        .tags{
          color: #0C73C2;
        }
        .tags2{
          cursor: pointer;
          color: #0C73C2;
        }
      }
      .des{
        display: flex;
        .desTitle{
          white-space: nowrap;
          margin-right: 10px;
        }
        .desContent{
          width: 100%;
          height: 50px;
          overflow: hidden;
          font-size: 13px;
          color: #7f8c8d;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;

        }
        .desFont{
          color: #0C73C2;
        }
      }

    }
  }

  .header-right{
    width: 20%;
    display: flex;
    justify-content: flex-end;
    .musicNum{
      position: relative;
      font-size: 14px;
      color: #999;
      i{
        position: absolute;
        left: 50px;
        top: 3px;
        width: 1px;
        height: 35px;
        background-color: #eee;
      }
    }

    .playcount{
      font-size: 14px;
      color: #999;
      margin-left: 20px;
    }
  }
}

// tabs标签页
.box-tabs{
  padding-top: 20px;
}
</style>