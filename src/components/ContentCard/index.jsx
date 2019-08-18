import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Navigator } from "@tarojs/components";
import { AtAvatar } from 'taro-ui';

import URL from '../../constants/urls';
import "./index.scss";

export default class ContentCard extends Component {
  static options = {
    addGlobalClass: true
  };

  handleNavigator () {

  }

  formatTime = (timeStamp) => {
    var time = new Date(timeStamp);
    return time.toLocaleString() + '前';
  }

  render() {
    let { data } = this.props;
    let images = [];
    if(!data) return;
    if(data && data.productImages) {
      images = JSON.parse(data.productImages)
    }
    return (
      <Navigator
        className='content-card'
        url={`${URL.BOOK_DETAIL}?pid=${data.productId}`}
      >
        <View className='header'>
          <AtAvatar image={data.storeIcon} circle text='石勇'></AtAvatar>
          <View className='header-bd'>
            <Text className='title'>{data.storeName + ' ' } | {data.productName}</Text>
            <Text className='desc'>{this.formatTime(data.createTime)}</Text>
          </View>
          <Text className='strong'>¥{data.productPrice}</Text>
        </View>
        <View className='image-box'>
          {
            images.length > 0 ?images.map((item, index) => (
              <Image 
                key={'item' + index}
                className='image-item' 
                src={item}
                mode='widthFix'
              />
            )): null
          }
        </View>
        <View className='content'>
          {data.productDesc}
        </View>
        <View className='footer'>
          <Text className='label-ft'>来自 {data.productLocal}</Text>
          <Text className='split-line'>|</Text>
          <Text className='label-ft'>{data.categoryName}</Text>
        </View>
      </Navigator>
    );
  }
}
