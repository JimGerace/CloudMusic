<template>
  <div class="MVbox">
      <!-- 左端 -->
      <div class="mv-left">
          <!-- 标题 -->
          <div class="left-title">
              <span class="tag">视频</span>
              <h1 class="musicname">{{videolist.title}}</h1>
              <label class="name" v-if="videolist.creator">by{{videolist.creator.nickname}}</label>
          </div>

          <!-- 视频 -->
          <video class="video" autoplay :src="videoUrl" controls></video>

          <!-- 按钮区域 -->
          <div class="btnArea">
              <el-button icon="el-icon-folder-add" size="mini">收藏({{videolist.subscribeCount}})</el-button>
              <el-button icon="iconfont icon-fenxiang" size="mini"> 分享({{videolist.shareCount}})</el-button>
              <el-button icon="iconfont icon-download" size="mini"> 下载</el-button>
          </div>

          <!-- 评论标题 -->
          <h1 class="commentTitle">评论({{total}})</h1>

          <!-- 富文本 -->
          <div class="textareaBox">
              <el-input ref="textareaRef" placeholder="留下点足迹吧" maxlength="140" type="textarea" v-model="content" resize="none"></el-input>
              <i class="num">140</i>
              <el-button size="mini" @click="sendComment">评论</el-button>
          </div>

          <!-- 精彩评论 -->
          <div class="CommentBox" v-if="offset == 0">
              <h3 class="title">精彩评论</h3>

              <div class="commentItem" v-for="(item,index) in hotComment" :key="index">
                  <!-- 头像 -->
                  <img v-lazy="item.user.avatarUrl">

                  <!-- 详情 -->
                  <div class="detailBox">
                      <div class="userBox">
                          <span class="username">{{item.user.nickname}}: </span>
                          <span class="userContent">{{item.content}}</span>
                      </div>

                      <div v-if="item.beReplied != false" class="responseBox">
                          <span class="res-name">@{{item.beReplied[0].name}}: </span>
                          <span class="res-content">{{item.beReplied[0].content}}</span>
                      </div>

                      <div class="creat-time">
                          <span>{{item.time | Form('mm-dd-hh-mm')}}</span>
                      </div>

                      <div class="shareBox">
                          <div @click="giveSupport(item)" v-if="!item.liked">
                              <i class="iconfont icon-dianzan"></i>
                              <span>({{item.likedCount}})</span>
                          </div>
                          <div @click="giveSupport(item)" v-else class="red">
                              <i class="iconfont icon-dianzan"></i>
                              <span>({{item.likedCount}})</span>
                          </div>
                          <div>分享</div>
                          <div @click="responseComment(item.commentId)">回复</div>
                      </div>
                  </div>
              </div>
          </div>

          <!-- 最新评论 -->
          <div class="CommentBox">
              <h3 class="title">最新评论({{total}})</h3>

              <div class="commentItem" v-for="(item,index) in comment" :key="index">
                  <!-- 头像 -->
                  <img v-lazy="item.user.avatarUrl">

                  <!-- 详情 -->
                  <div class="detailBox">
                      <div class="userBox">
                          <span class="username">{{item.user.nickname}}: </span>
                          <span class="userContent">{{item.content}}</span>
                      </div>

                      <div v-if="item.beReplied != false" class="responseBox">
                          <span class="res-name">@{{item.beReplied[0].user.nickname}}: </span>
                          <span class="res-content">{{item.beReplied[0].content}}</span>
                      </div>

                      <div class="creat-time">
                          <span>{{item.time | Form('mm-dd-hh-mm')}}</span>
                      </div>

                      <div class="shareBox">
                          <div @click="giveSupport(item)" v-if="!item.liked">
                              <i class="iconfont icon-dianzan"></i>
                              <span>({{item.likedCount}})</span>
                          </div>
                          <div @click="giveSupport(item)" v-else class="red">
                              <i class="iconfont icon-dianzan"></i>
                              <span>({{item.likedCount}})</span>
                          </div>
                          <div>分享</div>
                          <div @click="responseComment(item.commentId)">回复</div>
                      </div>
                  </div>
              </div>
          </div>
          
          <!-- 分页 -->
          <el-pagination @current-change='handleCurrentChange' background layout="prev, pager, next" :page-size="limit" :total="total"></el-pagination>

      </div>
    
      <!-- 右端 -->
      <div class="mv-right">
          <!-- 标题 -->
          <h1>视频介绍</h1>

          <!-- 介绍信息 -->
          <div class="message">
              <div class="creatTime">
                  <span>发布时间: </span>
                  <label>{{videolist.publishTime | Form('yy-mm-dd')}}</label>
              </div>

              <div class="playcount">
                  <span>播放次数: </span>
                  <label>{{videolist.playTime}}</label>
              </div>
          </div>

          <!-- 描述内容 -->
          <div class="descBox">
              简介: {{videolist.description}}
          </div>

          <!-- 相关视频 -->
          <div class="resembleBox">
              <!-- 标题 -->
              <h3>相关视频</h3>
              <!-- 各项视频 -->
              <div class="mvItem" @click="toVideoPage(item.vid)" v-for="(item,index) in relatedlist" :key="index">
                  <!-- 图片 -->
                  <div class="mvPic">
                      <img v-lazy="item.coverUrl">
                      <div class="rbga">
                          <i class="el-icon-video-camera"></i>
                          <span>{{item.playTime}}</span>
                      </div>
                  </div>
                  <!-- 详情 -->
                  <div class="mvDetail">
                      <span class="mvname">{{item.title}}</span>
                      <span class="artname">{{item.creator[0].userName}}</span>
                  </div>
              </div>
          </div>
      </div>  
  </div>
</template>

<script>
export default {
    data () {
        return {
            id: this.$route.params.id,
            videolist: {},
            limit: 20,
            offset: 0,
            hotComment: [],
            comment: [],
            total: 0,
            t: 1,
            content: '',
            type: 5,
            commentId: null,
            st: 1,
            cid: null,
            relatedlist: [],
            videoUrl: ''
        }
    },
    methods:{
        //获取视频详细信息
        getVideoDetail(){
            this.$api.videoDetail(this.id).then(res => {
                this.videolist = res.data.data
                this.playcount(this.videolist, 'playTime')
            })
        },
        //获取视频评论
        getVideoComment(){
            this.$api.videoComment(this.id, this.limit, this.offset).then(res => {
                this.hotComment = res.data.hotComments
                this.comment = res.data.comments
                this.total = res.data.total
            })
        },
        //处理当前页数的变化
        handleCurrentChange(val){
            this.offset = (val-1)*this.limit
            this.getVideoComment()
        },
        //发送评论
        sendComment(){
            if(this.content.length == 0){
                return this.$message.error('请输入内容')
            }
            this.$api.sendComment(this.id, this.t, this.type, this.content, this.commentId).then(res => {
                this.getVideoComment()
                this.t = 1
                this.content = ''
                this.commentId = null
                this.$message.success('发送成功')
                this.getVideoComment()
            })
        },
        //回复评论
        responseComment(id){
            this.commentId = id
            this.t = 2
            this.$refs.textareaRef.focus()
        },
        //点赞
        giveSupport(row){
            this.cid = row.commentId;
            if(row.liked){
                this.st = 0
            }else{
                this.st = 1
            }
            this.$api.support(this.id, this.cid, this.st, this.type).then(res => {
                this.st = 1
                this.cid = null
                if(row.liked){
                    this.$message.success('已取消点赞')
                }else{
                    this.$message.success('点赞成功')
                }
                this.getVideoComment()
            })
        },
        //获取相关视频
        getRelatedVideo(){
            this.$api.simiVideo(this.id).then(res => {
                this.relatedlist = res.data.data
                this.playcount(this.relatedlist, 'playTime')
            })
        },
        // 获取视频播放地址
        getVideoUrl(){
            this.$api.videoUrl(this.id).then(res => {
                this.videoUrl = res.data.urls[0].url
            })
        },
        //跳转到mv详情页
        toVideoPage(id){
            this.$router.push(`/video/${id}`)
        },
        //处理富文本字数
        handleEditorNum(){
            let textarea = document.getElementsByClassName('el-textarea__inner')[0]
            let num = document.getElementsByClassName('num')[0]
            num.innerHTML = 140 - this.content.length
            textarea.onkeypress = function(){
                if(num.innerHTML == 0){
                    return
                }
                num.innerHTML --
            }
        },
        //初始化
        initialization(){
            this.getVideoDetail()
            this.getVideoComment()
            this.getRelatedVideo()
            this.getVideoUrl()
        }
    },
    mounted(){
        this.initialization()
    },
    updated(){
        this.handleEditorNum()
    },
    watch: {
        '$route'(){
            this.$router.go(0)
        }
    }
}
</script>

<style lang='less' scoped>
.MVbox{
    display: flex;
    justify-content: space-between;
    // 左端
    .mv-left{
        display: flex;
        width: 55%;
        margin-left: 5%;
        flex-direction: column;
        .left-title{
            display: flex;
            margin-bottom: 5px;
            align-items: center;
            .tag{
                display: block;
                color: #E03F40;
                width: 40px;
                height: 20px;
                line-height: 20px;
                margin-right: 5px;
                text-align: center;
                white-space: nowrap;
                border: 1px solid #E03F40;
            }
            .musicname{
                width: 85%;
                font-weight: 500;
                margin-right: 5px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .name{
                color: #666;
                width: 14%;
                font-size: 12px;
                margin-left: 1%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }

        .video{
            width: 100%;
            cursor: pointer;
            &:focus{
                outline: none;
            }
        }

        .btnArea{
            display: flex;
            margin-top: 15px;
            .el-button{
                margin-right: 10px;
            }
        }

        .commentTitle{
            font-weight: 500;
            margin-top: 50px;
            padding-bottom: 5px;
            padding-right: 20px;
            border-bottom: 1px solid #eee;
        }

        .textareaBox{
            position: relative;
            margin-top: 15px;
            padding: 10px 30px 40px 30px;
            background-color: #F0F0F2;

            .num{
                position: absolute;
                right: 52px;
                bottom: 45px;
                color: #ddd;
            }

            .el-button{
                position: absolute;
                right: 30px;
                bottom: 5px;
            }
        }
    }
    // 右端
    .mv-right{
        display: flex;
        min-width: 260px;
        width: 30%;
        margin: 0 5%;
        flex-direction: column;

        h1{
            color: #333;
            padding-bottom: 5px;
            border-bottom: 1px solid #eee;
        }

        .message{
            display: flex;
            color: #888;
            font-size: 14px;
            margin-top: 5px;
            justify-content: space-between;
        }

        .descBox{
            color: #888;
            font-size: 14px;
            margin-top: 10px;
        }
    }
}
// 评论项
.CommentBox{
    margin-top: 40px;
    .title{
        display: block;
        font-size: 14px;
        font-weight: 500;
        padding-bottom: 5px;
    }

    .commentItem{
        position: relative;
        font-size: 13px;
        display: flex;
        align-items: center;
        padding: 10px 0px;
        border-top: 1px solid #eee;
        img{
            width: 40px;
            height: 40px;
            margin-right: 15px;
            border-radius: 50%;
        }

        .userBox{
            display: flex;
            .username{
                color: #0C73C2;
                white-space: nowrap;
            }
        }

        .responseBox{
            display: flex;
            margin-top: 5px;
            padding: 5px 10px;
            background-color: #F0F0F2;
            .res-name{
                color: #0C73C2;
                white-space: nowrap;
            }
        }

        .creat-time{
            color: #999;
            margin-top: 5px;
        }

        .shareBox{
            position: absolute;
            right: 10px;
            bottom: 10px;
            display: flex;
            align-items: center;
            div{
                display: flex;
                align-items: center;
                color: #999;
                font-size: 12px;
                margin-left: 8px;
                cursor: pointer;
            }
            i{
                font-size: 16px;
            }
        }
    }
}

.el-pagination{
    margin-top: 10px;
    text-align: center;
}
.red{
    color: #C62F2F !important;
}

.resembleBox{
    display: flex;
    margin-top: 15px;
    flex-direction: column;
    h3{
        color: #333;
        font-weight: 500;
        padding-bottom: 5px;
        border-bottom: 1px solid #eee;
    }

    .mvItem{
        display: flex;
        margin: 10px 0px;
        .mvPic{
            cursor: pointer;
            position: relative;
            img{
                width: 120px;
                height: 70px;
            }
            .rbga{
                display: flex;
                align-items: center;
                position: absolute;
                top: 0px;
                color: #fff;
                width: 120px;
                height: 20px;
                background: rgba(128, 128, 128, 0.2);
                i{
                    margin: 0px 3px;
                }
                span{
                    font-size: 13px;
                }
            }
        }

        .mvDetail{
            display: flex;
            margin-left: 10px;
            flex-direction: column;

            .mvname{
                display: -webkit-box;    
                -webkit-box-orient: vertical;    
                -webkit-line-clamp: 3;    
                overflow: hidden;
                font-size: 12px;
            }

            .artname{
                color: #999;
                margin-top: 5px;
                font-size: 13px;
            }
        }
    }
}
</style>