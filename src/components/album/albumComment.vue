<template>
  <div class="albumCommentBox">
      <!-- 评论框 -->
      <div class="commentBox">
          <el-input ref="textareaRef" maxlength="140" v-model="content" resize="none" type="textarea" placeholder="留下点足迹吧"></el-input>
          <i class="num">140</i>
          <el-button class="btn" size="mini" @click="sendComment">评论</el-button>
      </div>

      <!-- 精彩评论 -->
      <div class="hotCommentBox" v-if="albumInfo.offset == false">
          <span class="title">精彩评论</span>
          <!-- 每一条精彩评论 -->
          <div class="hotItem" v-for="(item,index) in hotComments" :key="index">
              <img v-lazy="item.user.avatarUrl">
              <!-- 具体信息 -->
              <div class="detailInfo">
                  <!-- 用户评论 -->
                  <div class="userComment">
                      <span class="username">{{item.user.nickname}}: </span>
                      <span class="content">{{item.content}}</span>
                  </div>
                  <!-- 回复评论 -->
                  <div v-if="item.beReplied != false" class="responseBox">
                      <span class="res-name">@{{item.beReplied[0].user.nickname}}: </span>
                      <span class="res-content">{{item.beReplied[0].content}}</span>
                  </div>
                  <!-- 日期 -->
                  <div class="creatTime">
                      <span class="time">{{item.time | Form('mm-dd-hh-mm')}}</span>
                      <!-- 点赞、分享、回复 -->
                      <div class="box">
                          <span class="dianzan">
                              <i class="iconfont icon-dianzan"></i>({{item.likedCount}})
                          </span>
                          <span>分享</span>
                          <span @click="responseComment(item.commentId)">回复</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <!-- 最新评论 -->
      <div class="hotCommentBox">
          <span class="title">最新评论({{total}})</span>
          <!-- 每一条精彩评论 -->
          <div class="hotItem" v-for="(item,index) in albumComments" :key="index">
              <img v-lazy="item.user.avatarUrl">
              <!-- 具体信息 -->
              <div class="detailInfo">
                  <!-- 用户评论 -->
                  <div class="userComment">
                      <span class="username">{{item.user.nickname}}: </span>
                      <span class="content">{{item.content}}</span>
                  </div>
                  <!-- 回复评论 -->
                  <div v-if="item.beReplied != false" class="responseBox">
                      <span class="res-name">@{{item.beReplied[0].user.nickname}}: </span>
                      <span class="res-content">{{item.beReplied[0].content}}</span>
                  </div>
                  <!-- 日期 -->
                  <div class="creatTime">
                      <span class="time">{{item.time | Form('mm-dd-hh-mm')}}</span>
                      <!-- 点赞、分享、回复 -->
                      <div class="box">
                          <span class="dianzan red" @click="toLike(item)" v-if="item.liked">
                              <i class="iconfont icon-dianzan"></i>({{item.likedCount}})
                          </span>
                          <span class="dianzan" @click="toLike(item)" v-else>
                              <i class="iconfont icon-dianzan"></i>({{item.likedCount}})
                          </span>
                          <span>分享</span>
                          <span @click="responseComment(item.commentId)">回复</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <!-- 分页 -->
      <el-pagination @current-change='handleCurrentChange' background :page-size="albumInfo.limit" layout="prev, pager, next" :total="total">
</el-pagination>
  </div>
</template>

<script>
export default {
    props: ['albumComments', 'hotComments', 'total','albumInfo'],
    data(){
        return{
            id: this.$route.params.id,
            t: 1,
            type: 3,
            content: '',
            commentId: null,
            lt: 1,
            cid: null
        }
    },
    methods: {
        //监听当前页数的变化
        handleCurrentChange(val){
            this.$emit('currentChange', val)
        },
        //发送评论
        async sendComment(){
            if(this.content.length === 0){
                return this.$message.error('请输入内容')
            }
            this.$api.sendComment(this.id, this.t, this.type, this.content, this.commentId).then(res => {
                this.t = 1
                this.commentId = null
                this.content = ''
                this.$emit('sendComment')
                this.$message.success('发送成功')
            })
        },
        //监听点击回复
        responseComment(id){
            this.$refs.textareaRef.focus()
            this.t = 2
            this.commentId = id
        },
        //点赞
        toLike(row){
            this.cid = row.commentId
            if(row.liked){
                this.lt = 0
            }else{
                this.lt = 1
            }
            this.$api.support(this.id, this.cid, this.lt, this.type).then(res => {
                this.$emit('toLike')
                if(row.liked){
                    this.$message.success("取消点赞成功")
                }else{
                    this.$message.success('点赞成功')
                }
                this.lt = 1
                this.cid = null
            })
        },
        //处理富文本字数
        handleEditorNum(){
            let txt = document.getElementsByClassName('el-textarea__inner')[0]
            let num = document.getElementsByClassName('num')[0]
            num.innerHTML = 140 - this.content.length
            txt.onkeypress = function(){
                if(num.innerHTML == 0){
                    return
                }
                num.innerHTML--
            }
        }
    },
    updated(){
        this.handleEditorNum()
    },
    watch:{
        albumComments(newval){
            this.albumComments = newval
        },
        hotComments(newval){
            this.hotComments = newval
        },
        total(newval){
            this.total = newval
        },
        albumInfo(newval){
            this.albumInfo = newval
        }
    }
}
</script>

<style lang='less' scoped>
.red{
    color:#C62F2F;
}
.commentBox{
    position: relative;
    padding-bottom: 40px;
    background-color: #F0F0F2;
    .el-textarea{
        padding: 10px 20px;
        box-sizing: border-box;
    }
    .num{
        position: absolute;
        right: 30px;
        bottom: 53px;
        color: #666;
    }
    .btn{
        position: absolute;
        right: 21px;
        bottom: 10px;
    }
}

.hotCommentBox{
    margin-top: 20px;
    .title{
        display: block;
        margin-bottom: 5px;
    }
    .hotItem{
        position: relative;
        display: flex;
        width: 100%;
        padding: 20px 0px;
        border-top: 1px solid #eee;
        img{
            width: 40px;
            height: 40px;
            margin-right: 15px;
            border-radius: 50%;
        }

        .detailInfo{
            display: flex;
            flex-direction: column;

            .userComment{
                display: flex;
                .username{
                    color: #0C73C2;
                    white-space: nowrap;
                }
            }
            .responseBox{
                display: flex;
                margin-top: 8px;
                padding: 10px 10px;
                background-color: #F1F1F4;
                .res-name{
                    color: #0C73C2;
                    white-space: nowrap;
                }
            }
            .creatTime{
                margin-top: 10px;
                .time{
                    color: #999;
                }
                .box{
                    display: flex;
                    position: absolute;
                    bottom: 20px;
                    right: 0;
                    color: #999;
                    .dianzan{
                        display: flex;
                        i{
                            font-size: 22px;
                        }
                    }
                    span{
                        cursor: pointer;
                        margin-left: 15px;
                    }
                }
            }
        }
    }
}
.el-pagination{
    text-align: center;
    margin-bottom: 40px;
}
</style>