import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text, Icon, Navigator } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import URL from '../../constants/urls';
import "./index.scss";

@connect(
  ({ app }) => ({
    app
  })
)
class Mine extends Component {
  config = {
    navigationBarTitleText: "我的"
  };

  // state = {
  //   userInfo: {
  //     avatar: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3341635606,4274199912&fm=58',
  //     nickname: '我是谁？'
  //   }
  // }
  
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  wxlogin = () => {
    Taro.navigateTo({url: URL.LOGIN});
  }

  render() {
    let { user } = this.props.app;
    return (
      <View className='mine' onClick={this.wxlogin}>
        <View className='header'>
          <Image
            className='avatar'
            src={user.avatarUrl}
          />
          <Text className='nickname'>{user.username || '未登录'}</Text>
        </View>
        <View className='nav-card'>
          <Navigator className='nav-item rt-line' url={URL.BOOK_STORE}>
            <Icon className='iconfont icon-xihuan' color='green' />
            <View className='item-name'>我的店铺(<Text className='strong'>21</Text>)</View>
          </Navigator>
          <Navigator className='nav-item rt-line' url={URL.BOOK_STORE}>
            <Icon className='iconfont icon-xihuan' />
            <View className='item-name'>我的订单(<Text className='strong'>3</Text>)</View>
          </Navigator>
          <Navigator className='nav-item' url={URL.BOOK_CART}>
            <Icon className='iconfont icon-xihuan' />
            <View className='item-name'>我的购物车(<Text className='strong'>8</Text>)</View>
          </Navigator>
        </View>
        <View className='menu-cells bottom-grap'>
          <Navigator
            className='menu-cell'
            url={`${URL.MY_PUBLISH}`}  
          >
            <Icon className='iconfont icon-fabu' />
            <Text className='menu-label'>最新公告</Text>
            <Text className='menu-tail'>5条新公告</Text>
          </Navigator>
          <Navigator
            className='menu-cell'
            url={`${URL.MY_PUBLISH}`}  
          >
            <Icon className='iconfont icon-fabu' />
            <Text className='menu-label'>最新消息</Text>
            <Text className='menu-tail'>99+未读消息</Text>
          </Navigator>
        </View>
        <View className='menu-cells'>
          <Navigator
            className='menu-cell'
            url={`${URL.MY_COLLECTIONS}`}  
          >
            <Icon className='iconfont icon-xihuan' />
            <Text className='menu-label'>我收藏的</Text>
            <Text className='menu-tail'></Text>
          </Navigator>
          <Navigator
            className='menu-cell'
            url={`${URL.MY_PUBLISH}`}  
          >
            <Icon className='iconfont icon-fabu' />
            <Text className='menu-label'>我购买的</Text>
            <Text className='menu-tail'></Text>
          </Navigator>
        </View>
        {/* <Copyright /> */}
      </View>
    );
  }
}

export default Mine;
