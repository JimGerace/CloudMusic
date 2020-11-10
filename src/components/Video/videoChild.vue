<template>
  <div class="videoListBox">
    <!-- 按钮 -->
    <el-button @click="openDialog">全部分类</el-button>

     <!-- 视频列表 -->
     <div class="videoList">
         <div @click="toVideoPage(item.data.vid)" class="videoItem" v-for="(item,index) in videolist" :key='index'>
             <a href="javascript:;">
                 <div class="playcount">
                     <i class="iconfont icon-erji"></i>
                     <span>{{item.data.playTime}}</span>
                 </div>
                 <img v-lazy="item.data.coverUrl+'?param=190y107'" >
                 <p>{{item.data.title}}</p>
             </a>
         </div>
     </div>

    <!-- 分页 -->
    <el-pagination @current-change='handleCurrentChange' background layout="prev, next"></el-pagination>

    <!-- 标签对话框 -->
    <el-dialog
        :modal="false"
        title="全部标签"
        :visible.sync="videoVisible"
        width="50%">
        <!-- 渲染所有标签 -->
        <div class="tagsBox">
            <el-tag 
            @click="tagsSelected(item.id)"
            class="tagsItem" 
            v-for="(item,index) in tagslist" 
            :style="item.id === id ? 'color: #FF0000': 'color: #7DA6FF'"
            :key="index">{{item.name}}
            </el-tag>
        </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
    data(){
        return{
            tagslist: [],
            id: 58100,
            offset: 0,
            videoVisible: false,
            videolist: []
        }
    },
    mounted(){
        this.getVideoTags()
        this.getVideoList()
    },
    methods:{
        // 获取视频标签列表
        getVideoTags(){
            this.$api.videoTags().then(res => {
                this.tagslist = res.data.data
            })
        },
        //监听按钮是否启动
        openDialog(){
            this.videoVisible = true
        },
        //选择其他标签
        tagsSelected(id){
            this.id = id
            this.videoVisible = false
            this.getVideoList()
        },
        //获取标签的相关视频
        getVideoList(){
            if(!window.localStorage.getItem('cookie')){
                return this.$message.error('请登录，再进行操作');
            }
            this.$api.videolist(this.id, this.offset).then(res => {
                this.videolist = res.data.datas
                this.handlePlayCount(this.videolist)
            })
        },
        //处理当前页面变化
        handleCurrentChange(val){
            this.offset = val
            this.getVideoList()
        },
        //跳转到视频详情页
        toVideoPage(id){
            this.$emit('closedFooter')
            this.$router.push(`/video/${id}`)
        },
        //处理播放量
        handlePlayCount(list){
            let result
            let a
            let b
            list.forEach(item=>{
                if(item.data.playTime > 9999 && item.data.playTime < 100000){
                    result = item.data.playTime + ''
                    a = result.substring(0,1)
                    b = result.substring(1,2)
                    result = a + '.' + b + '万'
                    item.data.playTime = result
                }else if(item.data.playTime > 99999 && item.data.playTime < 1000000){
                    result = item.data.playTime + ''
                    result = result.substring(0,2) + '万'
                    item.data.playTime = result
                }else if(item.data.playTime > 999999 && item.data.playTime < 10000000){
                    result = item.data.playTime + ''
                    result = result.substring(0,3) + '万'
                    item.data.playTime = result
                }else if(item.data.playTime > 9999999 && item.data.playTime < 100000000){
                    result = item.data.playTime + ''
                    result = result.substring(0,4) + '万'
                    item.data.playTime = result
                }else if(item.data.playTime > 99999999 && item.data.playTime < 1000000000){
                    result = item.data.playTime + ''
                    a = result.substring(0,1)
                    b = result.substring(1,2)
                    result = a + '.' + b + '亿'
                    item.data.playTime = result
                }else{
                    result = item.data.playTime + ''
                    item.data.playTime = result
                }
            });
        }
    }
}
</script>

<style lang='less' scoped>
.videoListBox{
    padding: 10px 50px;
}
.tagsBox{
    .tagsItem{
        margin: 5px;
        cursor: pointer;
        background-color: #fff;
        &:hover{
            color: red !important;
        }
    }
}

.videoList{
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
    .videoItem{
        padding: 10px 40px 10px 0px;
        a{
            display: block;
            position: relative;
            width: 190px;
            color: #000;
            .playcount{
                position: absolute;
                width: 100%;
                height: 21px;
                background: rgba(128, 128, 128, 0.2);
                i{
                    margin-left: 10px;
                    margin-right: 3px;
                    color: #fff;
                    font-size: 18px;
                    font-weight: 600;
                }
                span{
                    color: #fff;
                }
            }
            img{
                width: 190px;
                height: 107px;
                border-radius: 10px;
                box-shadow: grey 0px 0px 2px 2px;
            }
            p{
                font-size: 13px;
                overflow: hidden;
                padding-top: 7px;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
}
.el-pagination{
    padding-top: 15px;
    margin-bottom: 40px;
}
</style>