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
          <Text className='ft-text'>全选</Text>
        </View>
        <View className='ft-flex'>
          <Text className='ft-title'>¥19.10</Text>
          {/* <Text className='ft-text'>运费¥5 再买¥79.90包邮</Text> */}
        </View>
        <View className='ft-item flex'>
          结算
        </View>
      </View>
    );
  }
}
