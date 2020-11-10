import api from '../instance'

// 登录
export function login(phone, password){
    return api({
        url: '/login/cellphone',
        params: {
            phone,
            password
        }
    })
}

//退出登录
export function logout(){
    return api({
        url: '/logout'
    })
}

//获取用户歌单
export function userPlaylist(uid){
    return api({
        url: '/user/playlist',
        params: {
            uid
        }
    })
}

//用户历史播放记录
export function userRecord(uid, type=1){
    return api({
        url: '/user/record',
        params: {
            uid,
            type
        }
    })
}