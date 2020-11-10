<template>
  <div>
    <!-- 布局容器 -->
    <el-container>
        <!-- 头部 -->
        <el-header>
            <div class="header-left">
                <!-- logo -->
                <img src="../assets/img/logo2.png" >
                <h2>彩虹云音乐</h2>
                <!-- 搜索栏 -->
                <div class="searchBox">
                    <input v-model="searchContent" @keyup.enter="toSearch" class="hearder-search" ref="inputBtn" type="text" placeholder="森林">
                    <i @click="toSearch" class="el-icon-search"></i>
                </div>
            </div>
            <div class="header-right">
                <div class="userBox">
                    <img v-if="userInfo === null" src="../assets/img/default.jpg" >
                    <img v-else v-lazy="userInfo.avatarUrl" >
                    <span v-if="userInfo === null" @click="toLogin" class="username">未登录</span>
                    <span v-else class="username">{{userInfo.nickname}}</span>
                </div>
                <div v-if="userInfo !== null" @click="toWithdraw" class="withdraw">退出登录</div>
            </div>
        </el-header>
        <el-container>

            <!-- 左侧菜单栏 -->
            <el-aside width="13%">
                <!-- 导航菜单 -->
                <el-menu :default-active="activePath" router>
                    <el-menu-item-group>
                        <template slot="title">推荐</template>
                        <el-menu-item @click="savePath('/findMusic')" index='/findMusic'>
                            <i class="iconfont icon-yinle"></i>
                            发现音乐
                        </el-menu-item>
                        <el-menu-item @click="savePath('/video')" index='/video'>
                            <i class="iconfont icon-video"></i>
                            视频
                        </el-menu-item>
                    </el-menu-item-group>

                    <el-menu-item-group>
                        <template slot="title">我的音乐</template>
                        <el-menu-item @click="savePath('/myMusic')" index='/myMusic'>
                            <i class="iconfont icon-yun"></i>
                            我的音乐云盘
                        </el-menu-item>
                    </el-menu-item-group>

                    <el-menu-item-group>
                        <template slot="title">创建的歌单</template>
                        <el-menu-item @click="savePath('/songlist/'+item.id)" :index="'/songlist/'+item.id" v-if="item.userId == userInfo.userId" v-for="(item,index) in playList" :key="index">
                            <i class="iconfont icon-liebiao"></i>
                            {{item.name}}
                        </el-menu-item>
                    </el-menu-item-group>

                    <el-menu-item-group>
                        <template slot="title">收藏的歌单</template>
                        <el-menu-item @click="savePath('/songlist/'+item.id)" :index="'/songlist/'+item.id" v-if='item.userId != userInfo.userId' v-for="(item,index) in playList" :key="index">
                            <i class="iconfont icon-liebiao"></i>
                            {{item.name}}
                        </el-menu-item>
                    </el-menu-item-group>
                </el-menu>
                
                <div class="musicInfo" v-show="$store.state.isFooter">
                    <div class="ImgBox">
                        <img v-lazy="picUrl+'?param=50y50'">
                        <div @click="toSongDetail" class="backImgBox">
                            <div class="backImg">
                                <i class="iconfont icon-jiantou_shang"></i>
                            </div>
                        </div>
                    </div>
                    <div class="artInfo">
                        <span class="musicName">{{musicname}}</span>
                        <span class="artName">{{artists}}</span>
                    </div>
                </div>
            </el-aside>
            <!-- 主内容 -->
            <el-main>
                <router-view @openSong='openMusic()' @closedFooter='closedFooter'></router-view>
            </el-main>
        </el-container>

        <!-- 底部 -->
        <div class="footer" v-show="$store.state.isFooter">
            <!-- 进度条 -->
            <div class="controlBox">
                <!-- 控制按钮 -->
                <div class="controlBtns">
                    <i @click="toPreSong" class="iconfont icon-pre"></i>
                    <i v-if="$store.state.iconShow" @click="controlMusic" class="iconfont icon-zanting iconMain"></i>
                    <i v-else @click="controlMusic" class="iconfont icon-bofang iconMain"></i>
                    <i @click="toNextSong" class="iconfont icon-next"></i>
                </div>

                <!-- 音乐进度条 -->
                <div class="sliderBox">
                    <label class="startNum">{{$store.state.musicDuration | FormTime()}}</label>
                    <el-slider @change="SliderChange" class="musicSlider" v-model="$store.state.musicDuration" :max="totalDuration" :show-tooltip="false"></el-slider>
                    <label class="lastNum">{{totalDuration | FormTime()}}</label>
                </div>

                <!-- 音量进度条 -->
                <div class="volumeBox">
                    <i v-if="musicVolume != 0" class="iconfont icon-yinliang"></i>
                    <i v-else class="iconfont icon-jingyin"></i>
                    <el-slider @change="VolumeChange" class="volumeSlider" :max="100" v-model="musicVolume" :show-tooltip="false"></el-slider>
                </div>

                <!-- 图标 -->
                <div class="iconBox">
                    <i class="iconfont icon-liebiaoshunxu"></i>
                    <i @click="openPlaylistDialog" class="iconfont icon-wj-bflb"></i>
                </div>
            </div>

            <!--  -->
            <audio :src="musicUrl" autoplay class="playMusic"></audio>
        </div>
    </el-container> 

    <!-- 登录对话框 -->
  <el-dialog @close='loginDialogClosed' title="登录" :visible.sync="loginVisible" width="35%">
    <div class="dialogBox">
        <!-- 手机图片 -->
        <div class="phoneImg">
            <img src="../assets/img/phone.png" />
        </div>
        <!-- Form表单验证 -->
        <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" label-width="70px">
            <el-form-item prop="phone">
                <el-input prefix-icon='iconfont icon-user' v-model="loginForm.phone" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input prefix-icon='iconfont icon-mima' type="password" v-model="loginForm.password" placeholder="密码"></el-input>
            </el-form-item>
            <el-button @click="submitLogin" class="loginBtn">登录</el-button>
        </el-form>
    </div>
  </el-dialog>

  <!-- 右底部播放列表对话框 -->
  <div v-show="dialogShow" class="playlistDialog">
      <!-- 删除图标 -->
      <i @click="closedDialog" class="iconfont icon-shanchu"></i>
      <!-- Tab标签页 -->
      <el-tabs v-model="activeName" type="card">
         <el-tab-pane label="播放列表" name="playlist">
             <!-- 播放列表 -->
             <playlist @openMusic='openMusic()'></playlist>
         </el-tab-pane>
         <el-tab-pane label="历史记录" name="history">
             <!-- 历史记录 -->
             <recordlist @openMusic='openRecordMusic()' :songSheet='recordList'></recordlist>
         </el-tab-pane>
      </el-tabs>
  </div>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import playlist from './homeChild/playlist'
import recordlist from './homeChild/recordlist'
export default {
    data(){
        var phoneRule = (rule, value, callback)=>{
            const reg = /^[1]{1}[3-9]{1}[0-9]{9}$/
            const result = reg.test(value)
            if(value == ''){
                callback('请输入手机号')
            }else if(!result){
                callback('请输入正确的手机号')
            }
            callback()
        }
        var passwordRule = (rule, value, callback)=>{
            const reg = /^\w{6,}$/
            const result = reg.test(value)
            if(value == ''){
                callback('请输入密码')
            }else if(!result){
                callback('请输入正确的密码')
            }
            callback()
        }
        return{
            loginVisible: false,
            loginForm: {
                phone: 13129765067,
                password: 13129765067
            },
            loginFormRules: {
                phone: [
                    {required:true, message:'请输入手机号码', trigger:'blur'},
                    {validator:phoneRule, trigger:'blur'}
                ],
                password: [
                    {required:true, message:'请输入密码', trigger:'blur'},
                    {validator:passwordRule, trigger:'blur'}
                ]
            },
            userInfo: window.localStorage.getItem('userInfo') === 'null'? null: JSON.parse(window.localStorage.getItem('userInfo')),
            playList: [],
            activePath: '/findMusic',
            musicId: '',
            artists: '',
            musicUrl: '',
            picUrl: '',
            musicname: '',
            totalDuration: 0,
            musicVolume: 60,
            dialogShow: false,
            activeName: 'playlist',
            recordList: [],
            recordIndex: [],
            //控制播放列表的来源
            isControl: true,
            //搜索栏值
            searchContent: ''
        }
    },
    mounted(){
        this.activePath = window.localStorage.getItem('activePath');
        if(window.localStorage.getItem('cookie') != null){
            this.getUserPlayList()
        }
    },
    methods: {
        //获取用户播放记录
        getUserRecord(){
            this.$api.userRecord(this.userInfo.userId).then(res => {
                this.handleRecordLength(res.data.weekData)
            })
        },
        //获取歌曲详细信息
        getSongInfo(){
            this.$api.songDetail(this.musicId).then(res => {
                this.picUrl = res.data.songs[0].al.picUrl
                this.musicname = res.data.songs[0].name
                this.totalDuration = res.data.songs[0].dt
                this.totalDuration = this.handleDuration(this.totalDuration)
                this.getMusicUrl()
                this.setAudio()
                this.handleMusicSinger(res.data.songs[0].ar)
            })
        },
        //获取音乐Url
        getMusicUrl(){
            this.$api.songUrl(this.musicId).then(res => {
                if(res.data.data[0].url == null){
                    // 有bug,当专辑只有一首歌
                    this.$message.error('该歌曲没版权,已为你跳过')
                    return this.toNextSong()
                }else if(res.data.data[0].freeTrialInfo != null){
                    this.$message.info('该歌曲需vip才能听完整版')
                }   
                this.musicUrl = res.data.data[0].url
            })
        },
        //设置audio初始化
        setAudio(){
            const audio = document.getElementsByClassName('playMusic')[0]
            audio.volume = this.musicVolume / 100
            audio.addEventListener('timeupdate', ()=>{
                this.changeDuration(audio.currentTime)
                if(audio.currentTime >= audio.duration){
                    audio.load()
                    this.toNextSong()
                }
            })
        },
        //来源播放列表的播放该音乐
        openMusic(){
            this.changeIsFooter(true)
            this.changeControl(true)
            this.isControl = true
            this.musicId = this.$store.state.curId
            this.getSongInfo()
        },
        //播放来源历史记录的歌曲
        openRecordMusic(){
            this.changeIsFooter(true)
            this.changeControl(true)
            this.isControl = false
            this.musicId = this.$store.state.curId
            this.getSongInfo()
        },
        //播放下一首
        toNextSong(){
            this.changeControl(true)
            if(this.isControl){
                let index = this.$store.state.listId.findIndex(item => {
                    return item == this.musicId
                });
                if(index === this.$store.state.listId.length -1){
                    index = 0
                }else{
                    index = index +1
                }
                this.musicId = this.$store.state.listId[index]
                this.changeCurId(this.musicId)
            }else{
                let index = this.recordIndex.findIndex(item => {
                    return item == this.musicId
                });
                 if(index === this.recordIndex.length -1){
                    index = 0;
                }else{
                    index = index +1
                }
                this.musicId = this.recordIndex[index]
                this.changeCurId(this.musicId)
            }
            this.getSongInfo()
        },
        //音乐进度条的变化
        SliderChange(){
            const audio = document.getElementsByClassName('playMusic')[0]
            audio.currentTime = this.$store.state.musicDuration
        },
        //音量进度条的变化
        VolumeChange(){
            const audio = document.getElementsByClassName('playMusic')[0]
            audio.volume = this.musicVolume / 100
        },
        //处理左下播放歌曲歌手名
        handleMusicSinger(list){
            this.artists = ''
            for(let i=0; i<list.length; i++){
                if(i == list.length-1){
                    this.artists += list[i].name
                    return;
                }
                this.artists += list[i].name + '/'
            }
        },
        //处理播放记录数组长度
        handleRecordLength(item){
            this.recordIndex = []
            this.recordList = []
            for(let i=0; i<item.length; i++){
                this.recordList.push(item[i].song)
                this.recordIndex.push(item[i].song.id)
            }
        },
        // 显示登录对话框
        toLogin(){
            this.loginVisible = true
        },
        //监听对话框关闭
        loginDialogClosed(){
            this.$refs.loginFormRef.resetFields()
        },
        //登录账号
        submitLogin(){
            this.$refs.loginFormRef.validate((valid)=>{
                if(!valid){
                    return 
                }
                this.$api.login(this.loginForm.phone, this.loginForm.password).then(res => {
                    window.localStorage.setItem('cookie', res.data.cookie)
                    window.localStorage.setItem('userInfo', JSON.stringify(res.data.profile))
                    this.userInfo = res.data.profile
                    //获取用户歌单
                    this.getUserPlayList()
                    //关闭登录对话框
                    this.loginVisible = false
                })
            })
        },
        //点击退出按钮
        toWithdraw(){
            const audio = document.getElementsByClassName('playMusic')[0]
            this.$api.logout().then(res => {
                window.localStorage.clear()
                this.userInfo = null
                this.playList = []
                this.changeIsFooter(false)
                audio.pause()
                this.$router.push('/home')
                this.$message.success('退出登录成功')
            })
        },
        //获取用户的私人歌单
        getUserPlayList(){
            this.$api.userPlaylist(this.userInfo.userId).then(res => {
                this.playList = res.data.playlist
            })
        },
        //播放上一首
        toPreSong(){
            this.changeControl(true)
            if(this.isControl){
                let index = this.$store.state.listId.findIndex(item => {
                    return item == this.musicId
                })
                if(index == 0){
                    index = this.$store.state.listId.length -1
                }else{
                    index = index -1
                }
                this.musicId = this.$store.state.listId[index]
                this.changeCurId(this.curId)
            }else{
                let index = this.recordIndex.findIndex(item => {
                    return item == this.musicId
                });
                 if(index === this.recordIndex.length -1){
                    index = 0
                }else{
                    index = index +1
                }
                this.musicId = this.recordIndex[index]
                this.changeCurId(this.curId)
            }
            this.getSongInfo()
        },
        //监听左侧点击那个选项，并让其高亮
        savePath(activePath){
            window.localStorage.setItem('activePath', activePath)
            this.activePath = activePath
        },
        //控制暂停与播放
        controlMusic(){
            const audio = document.getElementsByClassName('playMusic')[0]
            if(this.$store.state.iconShow){
                audio.pause()
            }else{
                audio.play()
            }
            if(!this.$store.state.iconShow){
                this.changeControl(true)
            }else{
                this.changeControl(false)
            }
        },
        // 处理总时长
        handleDuration(num){
            num = String(num)
            num = num.substring(0,3)
            num = parseInt(num)
            return num
        },
        //打开右底部播放列表对话框
        openPlaylistDialog(){
            if(window.localStorage.getItem('cookie')){
                this.getUserRecord()
            }
            this.dialogShow = !this.dialogShow
        },
        //关闭右底部的对话框
        closedDialog(){
            this.dialogShow = false
        },
        //关闭底部进度条
        closedFooter(){
            const audio = document.getElementsByClassName('playMusic')[0]
            audio.pause()
            this.musicUrl = null
            this.changeIsFooter(false)
        },
        //点击搜索按钮
        toSearch(){
            if(this.searchContent.trim() == ''){
                this.changeSearch(this.$refs.inputBtn.placeholder)
                this.$router.replace('/search/' + encodeURIComponent(this.$refs.inputBtn.placeholder))
            }else{
                this.changeSearch(this.searchContent)
                this.$router.replace('/search/' + encodeURIComponent(this.searchContent))
            }
            
        },
        //跳转到单曲详情页
        toSongDetail(){
            this.$router.push(`/songdetail/${this.$store.state.curId}`)
        },
        ...mapMutations({
            changeIsFooter: 'PUT_ISFOOTER',
            changeControl: 'PUT_ISCONTROL',
            changeSearch: 'PUT_SEARCH',
            changeCurId: 'PUT_CURID',
            changeDuration: 'PUT_DURATION'
        }),
    },
    components: {
        playlist,
        recordlist
    }
}
</script>

<style lang='less' scoped>
.el-header{
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #C62F2F;
    .header-left{
        display: flex;
        align-items: center;
        margin-left: 50px;
        img{
            width: 5%;
            height: 5%;
            border-radius: 50%;
            margin-right: 4%;
        }
        h2{
            color: #fff;
            font-size: 20px;
            font-weight: 500;
            white-space: nowrap;
            margin-right: 50px;
        }
        .searchBox{
            position: relative;
            .hearder-search{
                width: 150%;
                height: 25px;
                border: none;
                outline: none;
                padding: 0px 15px;
                box-sizing: border-box;
                border-radius: 14px;
            }
            .el-icon-search{
                position: absolute;
                top: 18%;
                right: -44%;
            }
        }
        i{
            cursor: pointer;
        }
    }
    .header-right{
        display: flex;
        align-items: center;
        .userBox{
            display: flex;
            color: #fff;
            align-items: center;
            margin-right: 30px;
            img{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-right: 7px;
            }
            .username{
                cursor: pointer;
            }
        }
        .withdraw{
            color: #fff;
            font-size: 14px;
            cursor: pointer;
            padding: 5px 10px;
            margin-right: 20px;
            border-radius: 10px;
            background-color: #f86666;
            &:hover{
                background-color: #f19898;
            }
        }
    }
}
.el-aside{
    border-right: 2px solid #eee;
    .musicInfo{
        z-index: 100;
        display: flex;
        align-items: center;
        position: fixed;
        bottom: 50px;
        width: 12.8%;
        height: 58px;
        border: 1px solid #ddd;
        background-color: #F5F5F7;
        
        .ImgBox{
            width: 45px;
            height: 45px;
            margin-left: 10px;
            margin-right: 5px;
            &:hover .backImgBox{
                display: block;
            }
        }
        .backImgBox{
            cursor: pointer;
            display: none;
            position: absolute;
            left: 10px;
            top: 6px;
            width: 45px;
            height: 45px;
            background-color: rgba(0, 0, 0, 0.5);

            .backImg{
                width: 100%;
                height: 100%;
                line-height: 45px;
                text-align: center;
                
                i{
                    color: rgba(255, 255, 255, 0.8);
                    
                }
            }
        }

        img{
            cursor: pointer;
            width: 45px;
            height: 45px;
        }

        .artInfo{
            display: flex;
            width: 100%;
            flex-direction: column;

            .musicName{
                width: 135px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-bottom: 5px;
            }

            .artName{
                width: 135px;
                color: #999;
                font-size: 13px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
}
//手机对话框
.dialogBox{
    text-align: center;
    .phoneImg{
        img{
            margin-bottom: 10px;
        }
    }
    .el-form{
        padding: 0px 25%;
        box-sizing: border-box;
        .loginBtn{
            width: 100%;
            color: #fff;
            background-color: #FF0000;
        }
    }
}
// 底部
.footer{
    z-index: 100;
    position: fixed;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 50px;
    border: 1px solid #ddd;
    background-color: #F5F5F7;

    .controlBox{
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        height: 50px;
        background-color: #F6F6F8;

        .controlBtns{
            display: flex;
            align-items: center;
            width: 10%;
            height: 100%;
            margin: 0px 2%;
            i{
                cursor: pointer;
                font-size: 32px;
                color: #C62F2F;
                &:hover{
                    color: #B12323;
                }
            }
            .iconMain{
                font-size: 35px;
                margin: 0px 20px;
            }
        }

        .sliderBox{
            display: flex;
            width: 60%;
            align-items: center;
            .startNum{
                margin-right: 20px;
            }

            .musicSlider{
                width: 100%;
            }

            .lastNum{
                margin-left: 15px;
            }
        }

        .volumeBox{
            width: 12%;
            display: flex;
            align-items: center;
            margin-left: 2%;
            i{
                margin-right: 20px;
            }
            .volumeSlider{
                width: 100%;
            }
        }

        .iconBox{
            display: flex;
            align-items: center;
            margin-left: 2%;
            i{
                cursor: pointer;
                color: #666;
                font-size: 20px;
                margin-right: 20px;
                &:hover{
                    color: #333;
                }
            }
        }
    }
}

.playlistDialog{
    z-index: 100;
    overflow-y:hidden;
    position: relative;
    position: fixed;
    right: 0;
    bottom: 50px;
    width: 580px;
    height: 600px;
    background-color: #F4F4F6;
    border: 1px solid #999;

    i{
        z-index: 10;
        position: absolute;
        top: 10px;
        right: 10px;
        color: #999;
        cursor: pointer;
        &:hover{
            color: #000;
        }
    }
}
</style>