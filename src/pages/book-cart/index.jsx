import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
// import { AtAvatar } from 'taro-ui';
import {
  getBookDetail
 } from "../../store/book/action";
 import Footer from "./children/footer";
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

export default class BookCart extends Component {
  config = {
    navigationBarTitleText: "商品详情"
  };

  state = {
    book: {}
  };

  constructor() {
    super(...arguments);
    this.onPreview = this.onPreview.bind(this);
  }

  componentDidMount() {
    // let params = this.$router.params;
    // this.props.dispatchGetBookDetail(params.pid);
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
          <ListView list={4} type='cart' />
          <Footer name='cart' />
      </View>
    );
  }
}
