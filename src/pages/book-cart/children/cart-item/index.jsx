import Taro, { Component } from "@tarojs/taro";
import { View, Icon, Picker, Button, Image } from "@tarojs/components";
import "./index.scss";

export default class CartItem extends Component {
	state = {
		selector: ['美国', '中国', '巴西', '日本'],
    selectorChecked: '美国'
	}
	onChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
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
        <Icon className='iconfont add-icon' type='success' size='24' />
        <Image
          className='cart-avatar'
          mode='widthFix'
          src='https://jdc.jd.com/img/80x80'
        />
        <View className='cart-content'>
            <View className='cart-title'>一见到你，我就爱上了你</View>
            <Picker mode='selector' range={this.state.selector} onChange={this.onChange}>
                <View className='picker'>
                  当前位置：{this.state.selectorChecked}
                </View>
              </Picker>
            <View className='cart-price'>¥7.90</View>
        </View>
        <Button className='order-btn' type='primary'>锁定</Button>
      </View>
    );
  }
}
