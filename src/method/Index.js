import Vue from 'vue'

// 处理时间格式
Vue.filter('Form', (time, arg)=>{
    let date = new Date(time)
    let year, month, day, hour, minute, second
    year  = date.getFullYear()
    month = date.getMonth() + 1
    day = date.getDate()
    hour = date.getHours()
    minute = date.getMinutes()
    second = date.getSeconds()
    if(month < 10) month = '0' + month
    if(day < 10) day = '0' + day
    if(hour < 10) hour = '0' + hour
    if(minute < 10) minute = '0' + minute
    if(second < 10) second = '0' + second

    if(arg == 'mm-dd-hh-mm'){
        return month + '-' + day + ' ' + hour + ':' + minute
    }
    if(arg == 'yy-mm-dd'){
        return year + '-' + month + '-' + day
    }
    if(arg == 'yy-mm-dd-hh-mm-ss'){
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    }
})

//处理歌曲时间
Vue.filter('FormTime', (time)=>{
    if(time ==0){
        return 0+ ':'+0+0
    }
    let duration = String(time).substring(0,3)
    let minute, second
    duration = parseInt(duration)
    minute = parseInt(duration / 60)
    second = parseInt(duration % 60)
    if(minute < 10) minute = '0' + minute
    if(second < 10) second = '0' + second
    return minute + ':' + second
})

//处理歌单播放量
Vue.prototype.playcount = function(list,playCount){
    let result
    let a
    let b
    if(list.length > 0){
        list.forEach(item=>{
            if(item[playCount] > 9999 && item[playCount] < 100000){
                result = item[playCount] + ''
                a = result.substring(0,1)
                b = result.substring(1,2)
                result = a + '.' + b + '万'
                item[playCount] = result
            }else if(item[playCount] > 99999 && item[playCount] < 1000000){
                result = item[playCount] + ''
                result = result.substring(0,2) + '万'
                item[playCount] = result
            }else if(item[playCount] > 999999 && item[playCount] < 10000000){
                result = item[playCount] + ''
                result = result.substring(0,3) + '万'
                item[playCount] = result
            }else if(item[playCount] > 9999999 && item[playCount] < 100000000){
                result = item[playCount] + ''
                result = result.substring(0,4) + '万'
                item[playCount] = result
            }else if(item[playCount] > 99999999 && item[playCount] < 1000000000){
                result = item[playCount] + ''
                a = result.substring(0,1)
                b = result.substring(1,2)
                result = a + '.' + b + '亿'
                item[playCount] = result
            }else if(item[playCount] > 999999999 && item[playCount] < 10000000000){
                result = item[playCount] + ''
                result = result.substring(0,2) + '亿'
                item[playCount] = result
            }else{
                result = item[playCount] + ''
                item[playCount] = result
            }
        })
    }else{
        if(list[playCount] > 9999 && list[playCount] < 100000){
            result = list[playCount] + ''
            a = result.substring(0,1)
            b = result.substring(1,2)
            result = a + '.' + b + '万'
            list[playCount] = result
        }else if(list[playCount] > 99999 && list[playCount] < 1000000){
            result = list[playCount] + ''
            result = result.substring(0,2) + '万'
            list[playCount] = result
        }else if(list[playCount] > 999999 && list[playCount] < 10000000){
            result = list[playCount] + ''
            result = result.substring(0,3) + '万'
            list[playCount] = result
        }else if(list[playCount] > 9999999 && list[playCount] < 100000000){
            result = list[playCount] + ''
            result = result.substring(0,4) + '万'
            list[playCount] = result
        }else if(list[playCount] > 99999999 && list[playCount] < 1000000000){
            result = list[playCount] + ''
            a = result.substring(0,1)
            b = result.substring(1,2)
            result = a + '.' + b + '亿'
            list[playCount] = result
        }else if(list[playCount] > 999999999 && list[playCount] < 10000000000){
            result = list[playCount] + ''
            result = result.substring(0,2) + '亿'
            list[playCount] = result
        }else{
            result = list[playCount] + ''
            list[playCount] = result
        }
    }  
}