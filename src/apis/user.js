import {request} from "@/utils";

// 登录请求
export function loginAPI(formData) {
    return request({
        url:'/authorizations',
        method:'post',
        data:formData
    })
}

// 获取用户信息
export function userInfoAPI() {
    return request({
        url:'/user/profile',
        method:'get'
    })
}