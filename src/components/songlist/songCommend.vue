<template>
  <div class="commendBox">

      <!-- 富文本编辑器 -->
      <div class="editorBox">
        <el-input ref="inputRef" placeholder="留下点足迹吧" maxlength=140 type="textarea" resize='none' v-model="content"></el-input>
        <el-button size="mini" class="editorBtn" @click="sendComment">评论</el-button>
        <i class="inputNum">140</i>
      </div>

      <!-- 精彩评论 -->
      <div v-if="hotComments != false && offset == 0" class="hotCommendBox">
        <span class="hotTitle">精彩评论</span>
        <div class="commendItem" v-for="(item,index) in hotComments" :key="index">
          <img v-lazy="item.user.avatarUrl" />
          <div class="Detail">
            <div class="userCommend">
              <span class="username">{{item.user.nickname}}:</span>
              <span class="commendDetail">{{item.content}}</span>
            </div>

            <div v-if="item.beReplied.length !== 0" class="responseBox">
              <span class="res-username">@{{item.beReplied[0].user.nickname}}:</span>
              <span class="res-content">{{item.beReplied[0].content}}</span>
            </div>
            <span class="creatTime">{{item.time|Form('yy-mm-dd-hh-mm-ss')}}</span>
          </div>
          
          <div class="shareBox">
            <span class="support"><i class="iconfont icon-dianzan"></i>({{item.likedCount}})</span>
            <span class="row">|</span>
            <span class="share">分享</span>
            <span class="row">|</span>
            <span class="response" @click="responseComment(item)">回复</span>
          </div>
        </div>
      </div>

      <!-- 抢沙发 -->
      <div v-if="hotComments == false && comments == false" class="sofa">
        <span>还没有评论，快来抢沙发~</span>
      </div>

      <!-- 最新评论 -->
      <div v-if="comments != false" class="hotCommendBox">
        <span class="hotTitle">最新评论({{total}})</span>
        <div class="commendItem" v-for="(item,index) in comments" :key="index">
          <img v-lazy="item.user.avatarUrl" />
          <div class="Detail">
            <div class="userCommend">
              <span class="username">{{item.user.nickname}}:</span>
              <span class="commendDetail">{{item.content}}</span>
            </div>

            <div v-if="item.beReplied.length !== 0" class="responseBox">
              <span class="res-username">@{{item.beReplied[0].user.nickname}}:</span>
              <span class="res-content">{{item.beReplied[0].content}}</span>
            </div>
            <span class="creatTime">{{item.time|Form('yy-mm-dd-hh-mm-ss')}}</span>
          </div>
          
          <div class="shareBox">
            <span class="support"><i class="iconfont icon-dianzan"></i>({{item.likedCount}})</span>
            <span class="row">|</span>
            <span class="share">分享</span>
            <span class="row">|</span>
            <span class="response" @click="responseComment(item)">回复</span>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <el-pagination v-if="comments != false" @current-change='handleCurrentChange' background layout="prev, pager, next" :page-size='limit' :total="total">
      </el-pagination>
  </div>
</template>

<script>
export default {
  props: ['playlistID'],
  data(){
    return{
      id: this.$route.params.id,
      limit: 20,
      offset: 0,
      t: 1,
      type: 2,
      content: '',
      commentId: null,
      hotComments: [],
      comments: [],
      total: 0,
    }
  },
  updated(){
    this.handleEditorNum()
  },
  mounted(){
    this.getMusicCommend()
  },
  watch:{
    $route(){
      this.id = window.localStorage.getItem('currentId')
      this.getMusicCommend()
    }
  },
  methods:{
    //处理富文本字数
    handleEditorNum(){
      let dom = document.getElementsByClassName('el-textarea__inner')[0]
      let Num = document.getElementsByClassName('inputNum')[0]
      Num.innerHTML =  140 - this.content.length
      dom.onkeypress = function(){
        if(Num.innerHTML == 0){
          return
        }
        Num.innerHTML--
      }
    },
    // 获取歌单评论数据
    getMusicCommend(){
      this.$api.playlistComment(this.id, this.limit, this.offset).then(res => {
        this.hotComments = res.data.hotComments
        this.comments = res.data.comments
        this.total = res.data.total
      })
    },
    //监听当前页面的变化
    handleCurrentChange(val){
      this.offset = (val-1)*this.limit
      this.getMusicCommend()
    },
    //发送评论
    sendComment(){
      this.$api.sendComment(this.id, this.t, this.type, this.content, this.commentId).then(res => {
        this.$message.success('发送评论成功')
        this.t = 1
        this.content = ''
        this.commentId = null
        this.getMusicCommend()
      })
    },
    //回复评论
    responseComment(row){
      this.commentId = row.commentId
      this.t = 2
      this.$refs.inputRef.focus()
    }
  }
}
</script>

<style lang='less' scoped>
.editorBox{
  position: relative;
  padding: 10px 20px 50px 20px;
  background-color: #F0F0F2;
  box-sizing: border-box;
  .editorBtn{
    position: absolute;
    right: 30px;
    bottom: 10px;
  }
  .inputNum{
    position: absolute;
    right: 30px;
    bottom: 55px;
    color: #ddd;
  }
}
// 精彩评论
.hotCommendBox{
  margin-top: 20px;
  .hotTitle{
    display: block;
    font-size: 14px;
    padding-bottom: 10px;
  }
  
  .commendItem{
    display: flex;
    position: relative;
    font-size: 14px;
    padding: 20px 0px 10px 0px;
    border-top: 1px solid #eee;
    img{
      width: 36px;
      height: 36px;
      padding-right: 15px;
      border-radius: 50%;
    }
    .Detail{
      display: flex;
      flex-direction: column;
      .userCommend{
        padding-bottom: 8px;
        .username{
          color: #0C73C2;
          padding-right: 5px;
        }
      }
    }

    .responseBox{
      padding: 5px 5px;
      background-color: #F1F1F4;
      .res-username{
        color: #0C73C2;
        padding-right: 5px;
      }
      .res-content{
        color: #95a5a6;
      }
    }

    .creatTime{
      font-size: 13px;
      color: #999;
      padding-top: 10px;
    }

    .shareBox{
      position: absolute;
      right: 0;
      bottom: 10px;
      color: #999;
      .support{
        i{
          font-size: 20px;
          vertical-align: text-top;
        }
      }
      .row{
        padding: 0px 10px;
      }
      .response{
        cursor: pointer;
      }
    }
  }
}
// 沙发
.sofa{
  width: 100%;
  height: 150px;
  color: #999;
  line-height: 150px;
  text-align: center;
}
// 分页
.el-pagination{
  padding-top: 20px;
  padding-bottom: 40px;
  text-align: center;
}
</style>