import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane } from 'taro-ui';
import { connect } from "@tarojs/redux";
// import { AtAvatar } from 'taro-ui';
import {
  getBookDetail
 } from "../../store/book/action";
import "./index.scss";
import ListView from "../../components/ListView/index";

@connect(
  ({ book }) => ({
    bookDetail: book.bookDetail
  }),
  {
    dispatchGetBookDetail: getBookDetail
  }
)

export default class BookRecord extends Component {
  config = {
    navigationBarTitleText: "该商品最新记录"
  };

  state = {
    book: {},
    current: 0
  };

  constructor() {
    super(...arguments);
    this.onPreview = this.onPreview.bind(this);
  }

  componentDidMount() {
    // let params = this.$router.params;
    // this.props.dispatchGetBookDetail(params.pid);
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  onPreview() {
    let { image } = this.state.book;
    Taro.previewImage({
      current: image,
      urls: [image]
    });
  }

  formatTime = (timeStamp) => {
    var time = new Date(timeStamp);
    return time.toLocaleString() + '前';
  }

  render() {
    return (
      <View className='cart-container'>
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
              <ListView list={4} type='record' />
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={1}>
              <ListView list={4} type='record' />
            </AtTabsPane>
          </AtTabs>
      </View>
    );
  }
}
