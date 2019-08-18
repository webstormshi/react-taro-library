import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { wxRegister } from "../../store/app/action";

import "./index.scss";

@connect(
  ({ app }) => ({
    app
  }),
  {
    dispatchWxRegister: wxRegister
  }
)

export default class Login extends Component {
  config = {
    navigationBarTitleText: "微信授权"
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  wxlogin = () => {
      Taro.navigateBack();
      Taro.getUserInfo({
        success: res => {
          var user = res.userInfo;
          this.props.dispatchWxRegister(user);
        }
    });
  }

  render() {
    let { user } = this.props;
    return (
      <View className='login'>
        <Image
          className='login-logo'
          src={user.avatarUrl||'https://jdc.jd.com/img/80x80'} 
          mode='widthFix'
        />
        <Text className='login-text'>微信授权用户信息登录</Text>
        <Button className='login-btn' onClick={this.wxlogin}>微信授权</Button>
      </View>
    );
  }
}