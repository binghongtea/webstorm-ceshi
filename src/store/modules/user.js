import { createSlice } from '@reduxjs/toolkit'
import {removeToken, request} from '@/utils'
import {setToken as _setToken,getToken} from "@/utils";
import {loginAPI,userInfoAPI} from "@/apis/user";

const userStore = createSlice({
    name: 'user',
    // 数据状态
    initialState: {
        token: getToken() ? getToken() : '',
        userInfo:{}
    },
    // 同步修改方法
    reducers: {
        setToken (state, action) {
            state.token = action.payload
            //本地存储token
            _setToken(action.payload)
        },
        setUserInfo (state,action) {
            state.userInfo = action.payload
        },
        clearUserInfo (state) {
            state.token = ''
            state.userInfo = {}
            removeToken()
        }
    }
})

// 解构出actionCreater
const { setToken,setUserInfo,clearUserInfo } = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

// 异步方法封装
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await loginAPI(loginForm)
        dispatch(setToken(res.data.token))
    }
}

const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await userInfoAPI()
        dispatch(setUserInfo(res.data))
    }
}

export { fetchLogin,fetchUserInfo,clearUserInfo }

export default userReducer