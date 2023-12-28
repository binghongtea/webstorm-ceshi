import {request} from "@/utils";

// 登录请求
export function getChannelAPI() {
    return request({
        url:'/channels',
        method:'get'
    })
}
