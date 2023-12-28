import {request} from "@/utils";

// 获取频道列表
export function getChannelAPI() {
    return request({
        url:'/channels',
        method:'get'
    })
}

// 提交文章表单数据
export function createArticleAPI(data) {
    return request({
        url:'/mp/articles?draft=false',
        method:'post',
        data
    })
}