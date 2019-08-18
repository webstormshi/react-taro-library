import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text, Swiper, SwiperItem } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtAvatar } from 'taro-ui';
import URL from "../../constants/urls";
import {
  getBookDetail
 } from "../../store/book/action";
 import Footer from "../../components/footer";
import "./index.scss";

@connect(
  ({ book }) => ({
    bookDetail: book.bookDetail
  }),
  {
    dispatchGetBookDetail: getBookDetail
  }
)

export default class BookDetail extends Component {
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
    let params = this.$router.params;
    this.props.dispatchGetBookDetail(params.pid);
  }

  onPreview() {
    let { image } = this.state.book;
    Taro.previewImage({
      current: image,
      urls: [image]
    });
  }

  handleSelect = () => {
    const { pid } = this.props.bookDetail;
    Taro.navigateTo({
      url: URL.CHECK_ORDER + `?pid=${pid}`
    });
  }

  formatTime = (timeStamp) => {
    var time = new Date(timeStamp);
    return time.toLocaleString() + '前';
  }

  render() {
    let { bookDetail } = this.props;
    if(!bookDetail) return;
    let images = [], tags = [];
    if(bookDetail && bookDetail.productImages) {
      images = JSON.parse(bookDetail.productImages);
    }
    if(bookDetail && bookDetail.productTags) {
      tags = bookDetail.productTags.split(',');
    }
    return (
      <View className='detail-container'>
          <Swiper
            className='swiper-container'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots
            autoplay
          >
            {
              images.map((item, index)=>(
                <SwiperItem key={'item' + index}>
                  <View className='swiper-pic'>
                    <Image
                      style={{ width: '100%', height: '220PX' }}
                      mode='widthFix'
                      src={item || 'https://jdc.jd.com/img/80x80'}
                    />
                  </View>
                </SwiperItem>
              ))
            }
          </Swiper>
          <View className='header'>
            <View className='title'>{bookDetail.productName}</View>
            <View className='detail-info'>
              <Text className='price'>¥{bookDetail.productPrice}</Text>
              <Text className='detail-data'>{bookDetail.productRead}浏览量/{bookDetail.productLike}喜欢</Text>
            </View>
            <View className='detail-tag'>
              {
                tags.map((item, index)=>(
                  <Text className='item-tag' key={'item' + index}>{item}</Text>
                ))
              }
            </View>
          </View>
          <navigator url={URL.BOOK_STORE}>
            <View className='user-box'>
              <AtAvatar image={bookDetail.storeIcon} circle text='石勇'></AtAvatar>
              <View className='user-info'>
                <Text className='title'>{bookDetail.storeName}</Text>
                <Text className='desc'>发布于{this.formatTime(bookDetail.createTime)}</Text>
              </View>
              <View className='shop-info'>
                <Text className='shop-num'>{bookDetail.onSaleSum||0}</Text>
                <Text className='shop-label'>在售宝贝</Text>
              </View>
            </View>
          </navigator>

          <View className='prod-detail'>
            <View className='prod-title'>商品详情</View>
            <View className='prod-content'>
              {bookDetail.productContent}
            </View>
          </View>
          <Footer onSelect={this.handleSelect} />
      </View>
    );
  }
}
