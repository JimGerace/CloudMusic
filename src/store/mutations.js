import * as types from './mutation-type'

const mutations = {
    // 修改search内容
    [types.PUT_SEARCH](state, params){
        state.searchContent = params,
        window.localStorage.setItem('searchContent', params)
    },
    //修改当前播放歌曲id
    [types.PUT_CURID](state, params){
        state.curId = params,
        window.localStorage.setItem('curId', params)
    },
    //修改右底部列表数据
    [types.PUT_CURRENTPLAYLIST](state, params){
        state.currentPlaylist = params
    },
    //修改右底部列表数组id
    [types.PUT_LISTID](state, params){
        state.listId = params
    },
    //修改底部进度条显示或隐藏
    [types.PUT_ISFOOTER](state, params){
        state.isFooter = params
    },
    //修改当前进度条播放时间
    [types.PUT_DURATION](state, params){
        state.musicDuration = params
    },
    //修改播放状态
    [types.PUT_ISCONTROL](state, params){
        state.iconShow = params
    }
}

export default mutations