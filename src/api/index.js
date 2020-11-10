//统一接口出口
import * as getUser from './network/User'
import * as getApi from './network/Api'

export default {
    ...getUser,
    ...getApi
}