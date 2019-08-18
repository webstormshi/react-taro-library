import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

import "./index.scss";

export default class Index extends Component {
  static options = {
    addGlobalClass: true
  };

  render() {
    return (
      <View className='my-copyright'>
        <View className='my-copyright__link'>GitHub webstormshi</View>
        <View className='my-copyright__text'>Copyright © 2019 代码之家</View>
      </View>
    );
  }
}
