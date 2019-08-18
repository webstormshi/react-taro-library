import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text, Swiper, SwiperItem } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtAvatar } from 'taro-ui';
import {
  getDemandDetail
 } from "../../store/book/action";
 import Footer from "../../components/footer";
import "./index.scss";

@connect(
  ({ book }) => ({
    demandDetail: book.demandDetail
  }),
  {
    dispatchGetDemandDetail: getDemandDetail
  }
)

export default class DemandDetail extends Component {
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
    this.props.dispatchGetDemandDetail(params.did);
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
    let { demandDetail } = this.props;
    console.log('demandDetail', demandDetail);
    if(!demandDetail) return;
    let images = [], tags = [];
    if(demandDetail && demandDetail.productImages) {
      images = JSON.parse(demandDetail.productImages);
    }
    if(demandDetail && demandDetail.productTags) {
      tags = demandDetail.productTags.split(',');
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
                <SwiperItem key={item.id + index}>
                  <View className='swiper-pic'>
                    <Image
                      style={{ width: '100%', height: '220PX' }}
                      mode='heightFix'
                      src={item || 'https://jdc.jd.com/img/80x80'}
                    />
                  </View>
                </SwiperItem>
              ))
            }
          </Swiper>
          <View className='header'>
            <View className='title'>{demandDetail.productName}</View>
            <View className='detail-info'>
              <Text className='price'>¥{demandDetail.productPrice}</Text>
              <Text className='detail-data'>{demandDetail.productRead}浏览量/{demandDetail.productLike}喜欢</Text>
            </View>
            <View className='detail-tag'>
              {
                tags.map((item, index)=>(
                  <Text className='item-tag' key={index}>{item}</Text>
                ))
              }
            </View>
          </View>
          <View className='user-box'>
            <AtAvatar image={demandDetail.storeIcon} circle text='石勇'></AtAvatar>
            <View className='user-info'>
              <Text className='title'>{demandDetail.storeName}</Text>
              <Text className='desc'>发布于{this.formatTime(demandDetail.createTime)}</Text>
            </View>
            <View className='shop-info'>
              <Text className='shop-num'>{demandDetail.onSaleSum||0}</Text>
              <Text className='shop-label'>在售宝贝</Text>
            </View>
          </View>
          <View className='prod-detail'>
            <View className='prod-title'>商品详情</View>
            <View className='prod-content'>
              {demandDetail.productContent}
            </View>
          </View>
          <Footer />
      </View>
    );
  }
}
