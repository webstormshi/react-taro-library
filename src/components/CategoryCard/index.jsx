import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import URL from '../../constants/urls';
import "./index.scss";

export default class CategoryCard extends Component {
  static options = {
    addGlobalClass: true
  };
  handleTap = () => {
    let { type, data } = this.props;
    if(type && type === 'choose') {
          Taro.setStorageSync('category', data);
          Taro.navigateBack({
            delta: 1
          });
    } else {
      Taro.navigateTo({
        url: `${URL.BOOK_LIST}?id=${data.categoryId}&name=${data.categoryName}`
      });
    }
  }
  render() {
    let { data } = this.props;
    return (
      <View
        className='category-card'
        onClick={this.handleTap}
      >
        <Image 
          className='category-logo' 
          src={data.categoryIcon || 'https://jdc.jd.com/img/80x80'}
          mode='widthFix'
        />
        <View className='category-name'>{data.categoryName}</View>
      </View>
    );
  }
}
