<template>
  <div class="albumTitle">
      <div class="albumBox">
        <!-- 左端 -->
        <div class="left-box">
          <!-- 图片 -->
          <img v-lazy="albumContent.blurPicUrl+'?param=300y300'">

          <!-- 详细信息 -->
          <div class="albumInfo">
            <!-- 头部题目 -->
            <div class="InfoTitle">
              <span class="albumTag">专辑</span>
              <h1 class="albumTitle">{{albumContent.name}}</h1>
            </div>

            <!-- 按钮区域 -->
            <div class="btnArea">
              <el-button class="playEvery" size="mini" icon="el-icon-video-play" @click="openFirstMusic">播放全部</el-button>
              <el-button size="mini" icon="el-icon-folder-add">收藏({{dynamicInfo.subCount}})</el-button>
              <el-button size="mini" icon="iconfont icon-fenxiang"> 分享({{dynamicInfo.shareCount}})</el-button>
              <el-button size="mini" icon="iconfont icon-download"> 下载全部</el-button>
            </div>

            <!-- 时间与歌手名 -->
            <div class="singerInfo">
              <div class="singerName">
                <span>歌手: </span>
                <label v-if="artistInfo.length == 1">{{artistInfo[0].name}}</label>
                <label v-else-if="artistInfo.length == 2">{{artistInfo[0].name+'/'+artistInfo[1].name}}</label>
              </div>

              <div class="creatTime">
                <span>时间: </span>
                <label>{{albumContent.publishTime | Form('yy-mm-dd')}}</label>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Tab标签页 -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="歌曲列表" name="musiclist">
          <!-- 歌曲列表 -->
          <album-list @openSong='openSong' :music-info='musicInfo'></album-list>
        </el-tab-pane>
        <el-tab-pane :label="'评论('+albumTotal+')'" name="comment">
          <!-- 评论 -->
          <album-comment
           :album-comments='albumComments'
           :hot-comments='albumHotComments'
           :total='albumTotal'
           :album-info='albumInfo'
           @currentChange='handleCurrentChange($event)'
           @sendComment= 'sendComment'
           @toLike='toLike'></album-comment>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import albumList from './albumList'
import albumComment from './albumComment'
export default {
  data () {
    return {
      id: this.$route.params.id,
      albumContent: {},
      artistInfo: [],
      dynamicInfo: {},
      activeName: 'musiclist',
      musicInfo: [],
      albumInfo: {
        id: this.$route.params.id,
        limit: 20,
        offset: 0
      },
      albumComments: [],
      albumHotComments: [],
      albumTotal: 0,
      listId: []
    }
  },
  methods:{
    //接收子组件传递过来的事件，再传递给根组件
    openSong(){
      this.changeCurrentPlaylist(this.musicInfo)
      this.changeListId(this.listId)
      this.$emit('openSong')
    },
    //播放第一首歌
    openFirstMusic(){
      this.changeCurrentPlaylist(this.musicInfo)
      this.changeListId(this.listId)
      this.changeCurId(this.listId[0])
      this.$emit('openSong')
    },
    //获取专辑内容
    getAlbumContent(){
      this.$api.albumDetail(this.id).then(res => {
        this.musicInfo = res.data.songs
        this.handlelistId(this.musicInfo)
        this.albumContent = res.data.album
        this.artistInfo.push( ...res.data.album.artists)
      })
    },
    //获取动态专辑信息
    getDynamicAlbum(){
      this.$api.albumDynamic(this.id).then(res => {
        this.dynamicInfo = res.data
      })
    },
    //获取专辑评论
    getAlbumComment(){
      this.$api.albumComment(this.id, this.albumInfo.limit, this.albumInfo.offset).then(res => {
        this.albumComments = res.data.comments
        this.albumHotComments = res.data.hotComments
        this.albumTotal = res.data.total
      })
    },
    //监听当前页数的变化
    handleCurrentChange(val){
      this.albumInfo.offset = (val-1)*this.albumInfo.limit
      this.getAlbumComment()
    },
    //发送评论
    sendComment(){
      this.getAlbumContent()
    },
    //点赞
    toLike(){
      this.getAlbumContent()
    },
    //获取专辑歌曲id
    handlelistId(list){
      this.listId = []
      for(let i=0; i<list.length; i++){
        this.listId.push(list[i].id)
      }
    },
    ...mapMutations({
      changeCurrentPlaylist : 'PUT_CURRENTPLAYLIST',
      changeListId : 'PUT_LISTID',
      changeCurId : 'PUT_CURID'
    }),
    //初始化
    initialization(){
      this.getAlbumContent()
      this.getDynamicAlbum()
      this.getAlbumComment()
    }
  },
  mounted(){
    this.initialization()
  },
  components: {
    albumList,
    albumComment
  }
}
</script>

<style lang='less'>
.albumBox{
  .left-box{
    display: flex;
    img{
      width: 200px;
      height: 200px;
      margin-right: 60px;
    }

    .albumInfo{

      .InfoTitle{
        display: flex;
        margin-bottom: 20px;
        .albumTag{
          display: block;
          color: #fff;
          width: 40px;
          height: 25px;
          font-size: 12px;
          line-height: 25px;
          text-align: center;
          border-color: #C62F2F;
          background-color: #C62F2F;
        }
        .albumTitle{
          font-size: 20px;
          font-weight: 500;
          margin-left: 10px;
        }
      }

      .btnArea{
        display: flex;
        margin-bottom: 25px;
        i{
          font-size: 14px;
        }
        .el-button{
          margin-right: 10px;
        }
        .playEvery{
          color: #fff;
          border-color: #C62F2F;
          background-color: #C62F2F;
          &:hover{
            background-color: #B12323;
          }
        }
      }

      .singerInfo{
        display: flex;
        flex-direction: column;
        label{
          color: #666;
        }
        .singerName{
          margin-bottom: 10px;
        }
      }
    }
  }
}

.el-tabs{
  margin-top: 20px;
}
</style>