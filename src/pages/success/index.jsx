import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Image, Icon } from "@tarojs/components";
import { AtButton } from 'taro-ui';
import { connect } from "@tarojs/redux";
import { wxRegister } from "../../store/app/action";
import URL from '../../constants/urls';

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
    navigationBarTitleText: "微信提示"
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  handleDetail = () => {
    Taro.navigateTo({
      url: URL.BOOK_STORE
    });
  }

  handlePublish = () => {
    Taro.redirectTo({
      url: URL.SELL_PUBLISH
    });
  }

  render() {
    return (
      <View className='success'>
        <Icon 
          className='iconfont success-icon' 
          size='60'
          type='success'
        />
        <Text className='success-text'>商品发布成功，请在商品信息确认发布信息是否有误，或继续添加商品</Text>
        <AtButton type='primary' size='normal' className='action-btn success-btn' onClick={this.handleDetail}>查看发布信息</AtButton>
        <AtButton type='secondary' size='normal' className='action-btn' onClick={this.handlePublish}>继续添加</AtButton>
      </View>
    );
  }
}