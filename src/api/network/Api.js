import api from '../instance'

//获取歌曲详细信息
export function songDetail(ids){
    return api({
        url: '/song/detail',
        params: {
            ids
        }
    })
}

//获取歌曲Url
export function songUrl(id){
    return api({
        url: '/song/url',
        params: {
            id
        }
    })
}

//获取轮播图
export function banner(){
    return api({
        url: '/banner'
    })
}

//推荐歌单
export function recommendPlaylist(limit=12, offset=0){
    return api({
        url: '/top/playlist',
        params: {
            limit,
            offset
        }
    })
}

//独家播放
export function privateMusic(){
    return api({
        url: '/personalized/privatecontent'
    })
}

//最新音乐
export function lastestMusic(){
    return api({
        url: '/personalized/newsong'
    })
}

//所有榜单
export function charts(){
    return api({
        url: '/toplist/detail'
    })
}

//热门歌单标签
export function hotPlaylistTags(){
    return api({
        url: '/playlist/hot'
    })
}

//精选歌单
export function topPlaylist(cat, limit, offset){
    return api({
        url: '/top/playlist',
        params: {
            cat,
            limit,
            offset
        }
    })
}

//歌手
export function singer(limit, offset, type, area){
    return api({
        url: '/artist/list',
        params: {
            limit,
            offset,
            type,
            area
        }
    })
}

//新音乐
export function topMusic(type){
    return api({
        url: '/top/song',
        params: {
            type
        }
    })
}

//歌单详细
export function playlistDetail(id){
    return api({
        url: '/playlist/detail',
        params: {
            id
        }
    })
}

//收藏歌单
export function collectPlaylist(t, id){
    return api({
        url: '/playlist/subscribe',
        params: {
            t,
            id
        }
    })
}

//歌单评论
export function playlistComment(id, limit, offset){
    return api({
        url: '/comment/playlist',
        params: {
            id,
            limit,
            offset
        }
    })
}

//发送评论
export function sendComment(id, t, type, content, commentId){
    return api({
        url: '/comment',
        params: {
            id,
            t,
            type,
            content,
            commentId
        }
    })
}

//收藏者
export function subscribers(id, limit, offset){
    return api({
        url: '/playlist/subscribers',
        params:{
            id,
            limit,
            offset
        }
    })
}

//歌手信息
export function singerDetail(id){
    return api({
        url: '/artists',
        params: {
            id
        }
    })
}

//歌手mv
export function singerMv(id){
    return api({
        url: '/artist/mv',
        params: {
            id
        }
    })
}

//歌手专辑
export function singerAlbum(id, limit, offset){
    return api({
        url: '/artist/album',
        params: {
            id,
            limit,
            offset
        }
    })
}

//相似歌手
export function simiSinger(id){
    return api({
        url: '/simi/artist',
        params:{
            id
        }
    })
}

//获取视频标签
export function videoTags(){
    return api({
        url: '/video/group/list'
    })
}

//标签相关视频
export function videolist(id, offset){
    return api({
        url: '/video/group',
        params:{
            id,
            offset
        }
    })
}

//视频详细
export function videoDetail(id){
    return api({
        url: '/video/detail',
        params:{
            id
        }
    })
}

//视频评论
export function videoComment(id, limit, offset){
    return api({
        url: '/comment/video',
        params: {
            id,
            limit,
            offset
        }
    })
}

//点赞
export function support(id, cid, t, type){
    return api({
        url: '/comment/like',
        params: {
            id,
            cid,
            t,
            type
        }
    })
}

//相关视频
export function simiVideo(id){
    return api({
        url: '/related/allvideo',
        params: {
            id
        }
    })
}

//视频播放地址
export function videoUrl(id){
    return api({
        url: '/video/url',
        params: {
            id
        }
    })
}

//mv视频
export function mvVideo(order, type, area, limit, offset){
    return api({
        url: '/mv/all',
        params: {
            order,
            type,
            area,
            limit,
            offset
        }
    })
}

//mv详细信息
export function mvDetail(mvid){
    return api({
        url: '/mv/detail',
        params: {
            mvid
        }
    })
}

// mv评论
export function mvComment(id, limit, offset){
    return api({
        url: 'comment/mv',
        params: {
            id,
            limit,
            offset
        }
    })
}

//相似mv
export function simiMv(mvid){
    return api({
        url: '/simi/mv',
        params: {
            mvid
        }
    })
}

//mv视频地址
export function mvUrl(id){
    return api({
        url: '/mv/url',
        params: {
            id
        }
    })
}

//云盘信息
export function cloudData(limit, offset){
    return api({
        url: '/user/cloud',
        params: {
            limit,
            offset
        }
    })
}

//专辑信息
export function albumDetail(id){
    return api({
        url: '/album',
        params: {
            id
        }
    })
}

//专辑动态信息
export function albumDynamic(id){
    return api({
        url: '/album/detail/dynamic',
        params: {
            id
        }
    })
}

//专辑评论
export function albumComment(id, limit, offset){
    return api({
        url: '/comment/album',
        params: {
            id,
            limit,
            offset
        }
    })
}

// 搜索
export function search(keywords, type){
    return api({
        url: '/search',
        params: {
            keywords,
            type
        }
    })
}

//歌词
export function lyric(id){
    return api({
        url: '/lyric',
        params: {
            id
        }
    })
}

//歌曲评论
export function songComment(id, limit, offset){
    return api({
        url: '/comment/music',
        params: {
            id,
            limit,
            offset
        }
    })
}

//相似歌曲
export function simiSong(id){
    return api({
        url: '/simi/song',
        params: {
            id
        }
    })
}