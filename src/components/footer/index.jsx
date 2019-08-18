import Taro, { Component } from "@tarojs/taro";
import { View, Icon, Text } from "@tarojs/components";

import "./index.scss";

export default class Footer extends Component {
  static options = {
    addGlobalClass: true
  };

  render() {
    return (
      <View className='footer'>
        <View className='ft-item'>
        <Icon className='iconfont icon-xihuan' />
          <Text className='ft-text'>喜欢</Text>
        </View>
        <View className='ft-item'>
        <Icon className='iconfont icon-xihuan' />
        <Text className='ft-text'>分享</Text>
        </View>
        <View className='ft-item flex' onClick={this.props.onSelect}>
          立即抢购
        </View>
      </View>
    );
  }
}
