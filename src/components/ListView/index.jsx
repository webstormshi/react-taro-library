import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

import ContentCard from '../ContentCard/index';
import RecordCard from '../../pages/book-record/children/record-card/index';
import DemandCard from '../DemandCard/index';
import CartItem from '../../pages/book-cart/children/cart-item/index';
import "./index.scss";

export default class ListView extends Component {
  static options = {
    addGlobalClass: true
  };

  render() {
    let { list, type } = this.props;
    let content;
    if(type == 'demand') {
      content = list.map(item =>(
        <DemandCard data={item} key={item.productId} />
      ))
    } else if(type == 'sell') {
      content = list.map(item =>(
        <ContentCard data={item} key={item.productId} />
      ))
    } else if(type == 'record') {
      content = list.map(item =>(
        <RecordCard data={item} key={item.productId} />
      ))
    }else {
      content = list.map(item =>(
        <CartItem data={item} key={item.productId} />
      ))
    }
    return (
      <View className='list-container'>
        { content }
      </View>
    );
  }
}
