import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Navigator } from "@tarojs/components";
import { AtAvatar } from 'taro-ui';

import URL from '../../constants/urls';
import "./index.scss";

export default class DemandCard extends Component {
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
    if(data && data.demandImages) {
      images = JSON.parse(data.demandImages)
    }
    return (
      <Navigator
        className='content-card'
        url={`${URL.DEMAND_DETAIL}?did=${data.demandId}`}
      >
        <View className='header'>
          <AtAvatar image={data.avatarUrl} circle text='石勇'></AtAvatar>
          <View className='header-bd'>
            <Text className='title'>{data.username+ ' ' } | {data.demandName}</Text>
            <Text className='desc'>{this.formatTime(data.createTime)}</Text>
          </View>
          {/* <Text className='strong'>¥{data.productPrice}</Text> */}
        </View>
        <View className='image-box'>
          {
            images.map((item, index) => (
              <Image 
                key={'item' + index}
                className='image-item' 
                src={item}
                mode='widthFix'
              />
            ))
          }
        </View>
        <View className='content'>
          {data.demandDesc}
        </View>
        <View className='footer'>
          <Text className='label-ft'>来自 {data.demandLocal}</Text>
          <Text className='split-line'>|</Text>
          <Text className='label-ft'>{data.categoryName}</Text>
        </View>
      </Navigator>
    );
  }
}
