import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

import CategoryCard from '../CategoryCard/index';
import "./index.scss";

export default class CategoryView extends Component {
  static options = {
    addGlobalClass: true
  };

  render() {
    let { current, data, type } = this.props;
    return (
      <View className='list-container'>
        <View className='header'>{ current.categoryName || '图书音像' }</View>
        <View className='content'>
          {
            data.length > 0 ?
            data.map(item => (
              <CategoryCard type={type} data={item} key={item.categoryId} />
            )) :
            <View className='empty-box'>暂无分类内容</View>
          }
        </View>
      </View>
    );
  }
}
