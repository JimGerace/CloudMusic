const state = {
    // 存储搜索栏值，避免刷新获取不到数据
    searchContent: window.localStorage.getItem('searchContent'),
    //当前播放着歌曲的id
    curId: window.localStorage.getItem('curId'),
    //home组件右底部列表数据
    currentPlaylist: [],
    //右底部列表播放id数组
    listId: [],
    //控制底部进度条
    isFooter: false,
    //音乐播放的当前进度时间
    musicDuration: 0,
    //控制播放器暂停还播放状态
    iconShow: true
}

export default state