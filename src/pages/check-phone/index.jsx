import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { AtInput } from 'taro-ui';
import { connect } from "@tarojs/redux";
import { wxRegister, sendVerfiyCode, bindUserByPhone } from "../../store/app/action";

import "./index.scss";

@connect(
  ({ app }) => ({
    user: app.user
  }),
  {
    dispatchWxRegister: wxRegister,
    dispatchSendVerifyCode: sendVerfiyCode,
    dispatchBindUserByPhone: bindUserByPhone
  }
)

export default class Login extends Component {
  config = {
    navigationBarTitleText: "绑定手机号"
  };

  state = {
    verCode: '',
    phone: ''
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  handleChange (value, e) {
    var key = e.target.id;
    this.setState({
      [key]: value
    }, () => {
      console.log('state', this.state);
    });
  }

  handleSendCode = () => {
    const { userId } = this.props.user;
    const { phone } = this.state;
    if(!phone) {
      Taro.showToast({
        title: '手机号不能为空'
      })
    } else {
      this.props.dispatchSendVerifyCode({phone, userId});
    }
  }

  bindPhone = () => {
    const { userId } = this.props.user;
    const { phone, verCode } = this.state;
    if(verCode && phone) {
      this.props.dispatchBindUserByPhone({phone, verCode, userId});
    } else {
      Taro.showModal({
        content: '你输入的手机号或密码有误',
        showCancel: false
      })
    }
  }

  render() {
    return (
      <View className='login'>
        <Text className='login-text'>微信绑定手机号</Text>
        <AtInput
          name='phone'
          title='手机号码'
          type='phone'
          placeholder='手机号码'
          value={this.state.phone}
          onChange={this.handleChange.bind(this)}
        />
        <Button className='login-btn' onClick={this.handleSendCode.bind(this)}>发送验证码</Button>
        <AtInput
          name='verCode'
          title='验证码'
          type='text'
          maxLength='4'
          placeholder='验证码'
          value={this.state.verCode}
          onChange={this.handleChange.bind(this)}
        ></AtInput>
        <Button className='login-btn' onClick={this.bindPhone}>手机号绑定</Button>
      </View>
    );
  }
}