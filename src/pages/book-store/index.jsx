import Taro, { Component } from "@tarojs/taro";
import { View, Image, Button } from "@tarojs/components";
import { AtTabs, AtTabsPane } from 'taro-ui';
import { connect } from "@tarojs/redux";
import URL from '../../constants/urls';
import ListView from "../../components/ListView/index";
import "./index.scss";

@connect(
  ({ app }) => ({
    app
  })
)
class BookStore extends Component {
  config = {
    navigationBarTitleText: "我的"
  };

  state = {
    userInfo: {
      avatarUrl: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3341635606,4274199912&fm=58',
      username: '我是谁？'
    },
    booksells: [
      {
        id: 1,
        avatarUrl: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3341635606,4274199912&fm=58'
      },
      {
        id: 1,
        avatarUrl: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3341635606,4274199912&fm=58'
      },
      {
        id: 1,
        avatarUrl: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3341635606,4274199912&fm=58'
      },
      {
        id: 1,
        avatarUrl: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3341635606,4274199912&fm=58'
      }
    ],
    current: 0
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }
  
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  render() {
    let { userInfo, booksells=[] } = this.state;
    const bookContent = (
      booksells.length > 0 ?
      booksells.map(item => (
        <View className='book-card' key={item.id}>
          <Image
            className='avatar'
            src={item.avatarUrl}
          />
          <View className='nickname'>你是我的眼</View>
        </View>
      )):
      (
        <View className='book-empty'>
          <View className='book-desc'>暂无图书信息</View>
          <Button className='boo-btn' type='primary' size='small'>现在添加</Button>
        </View>
      )
    )
    return (
      <View className='mine'>
        <View className='mheader'>
          <Image
            className='avatar'
            src={userInfo.avatarUrl}
          />
          <View className='nickname'>{userInfo.username || '未登录'}</View>
          <View className='desc'>卖书收入508.10元</View>
        </View>
        <AtTabs
          current={this.state.current}
          scroll
          tabList={[
            { title: '卖过这本' },
            { title: '买过这本' }
          ]}
          onClick={e=>this.handleClick(e)}
        >
            <AtTabsPane current={this.state.current} index={0}>
              <ListView list={4} type='sell' />
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={1}>
              <View className='book-shelf'>
                { bookContent }
              </View>
            </AtTabsPane>
          </AtTabs>
      </View>
    );
  }
}

export default BookStore;
