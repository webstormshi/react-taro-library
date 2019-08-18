import Taro from "@tarojs/taro";
import { LOGIN, REGISTER_USER, GET_USER_INFO }  from './action-type';
import API from "../../service/api";
import URL from '../../constants/urls';

// 微信授权登录
export const wxLogin = (params) => {
    // 返回函数，异步dispatch
    return async dispatch => {
        let result = await API.post('/auth/wx/loginByCode', {
            code: params.code
        });
        let user = result.user||{};
        dispatch({
            type: LOGIN,
            user: user.user || {},
            token: result.token
        });
        Taro.setStorageSync('token', result.token);
        Taro.setStorageSync('user', user.user||{});
        if(!user.user||!user.user.userId) {
            Taro.navigateTo({ url: URL.LOGIN });
        }
    }
}

// 微信用户注册
export const wxRegister = (data) => {
    // 返回函数，异步dispatch
    return async dispatch => {
        let result = await API.post('/auth/wx/registerByUserInfo', {
            ...data
        });
        var user = result.user;
        dispatch({
            type: REGISTER_USER,
            token: result.token,
            user: user.user
        });
        Taro.setStorageSync('token', result.token);
        Taro.setStorageSync('user', user.user||{});
    }
}

// 获取用户信息
export const getUserInfo = (userId) => {
    // 返回函数，异步dispatch
    return async dispatch => {
        let result = await API.get(`/user/${userId}`);
        var user = result.data;
        dispatch({
            type: GET_USER_INFO,
            token: result.token,
            user: user
        });
        Taro.setStorageSync('token', result.token);
        Taro.setStorageSync('user', user||{});
    }
}

// 发送手机验证码
export const sendVerfiyCode = (params) => {
    // 返回函数，异步dispatch
    return async dispatch => {
        let result = await API.post(`/user/${params.userId}/phoneValidatedCode`, {
            userPhone: params.phone
        });
        var code = result.status;
        if(code === 200) {
            Taro.showToast({
                icon: 'success',
                title: '发送成功'
            })
        } else {
            Taro.showToast({
                icon: 'failed',
                title: '发送失败'
            })
        }
    }
}

// 微信绑定手机号
export const bindUserByPhone = (params) => {
    // 返回函数，异步dispatch
    return async dispatch => {
        let result = await API.put(`/user/${params.userId}/bindPhone`, {
            userPhone: params.phone,
            validatedCode: params.verCode
        });
        if(result.status === 200) {
            dispatch(getUserInfo(params.userId));
            Taro.showToast({
                title: '绑定成功'
            })
            setTimeout(() => {
                Taro.navigateBack({
                    delta: 1
                });
            }, 1000);
        }
    }
}