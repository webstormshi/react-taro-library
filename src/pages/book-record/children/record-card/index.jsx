import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import "./index.scss";

export default class RecordCard extends Component {
	state = {

  }
  componentDidMount() {
    let params = this.$router.params;
    Taro.setNavigationBarTitle = params.name;
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  render() {
    return (
      <View className='cart-box'>
        <Image
          className='cart-avatar'
          mode='widthFix'
          src='https://jdc.jd.com/img/80x80'
        />
        <Text className='cart-name'>曹雷</Text>
        <Text className='cart-desc'>2018-12-12 购买</Text>
      </View>
    );
  }
}
