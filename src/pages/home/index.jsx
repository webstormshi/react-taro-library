import Taro, { Component } from "@tarojs/taro";
import { View, Swiper, SwiperItem, Image, Text, Icon } from "@tarojs/components";
import { AtTabs, AtTabsPane } from 'taro-ui';
import PropTypes from "prop-types";
import { connect } from "@tarojs/redux";

import {
  getNavItems,
  getSwiperImages,
  getHuntList,
  getSellList,
  // getRecommendBooks
} from "@store/home/action";

import ListView from "../../components/ListView/index";
import FakeSearchBar from "../../components/fake-search-bar";
import URL from "../../constants/urls";
import "./index.scss";

@connect(
  ({ home }) => ({
    navItems: home.navItems,
    swiperImages: home.swiperImages,
    newBooks: home.newBooks,
    hotBooks: home.hotBooks,
    // recommendBooks: home.recommendBooks
  }),
  {
    dispatchGetNavItems: getNavItems,
    dispatchGetSwiperImages: getSwiperImages,
    dispatchGetHuntList: getHuntList,
    dispatchGetSellList: getSellList,
    // dispatchGetRecommendBooks: getRecommendBooks
  }
)
export default class Home extends Component {
  config = {
    navigationBarTitleText: "首页"
  };

  static propTypes = {
    newBooks: PropTypes.arrayOf(PropTypes.object),
    hotBooks: PropTypes.arrayOf(PropTypes.object),
    // recommendBooks: PropTypes.arrayOf(PropTypes.object)
  };

  constructor() {
    super(...arguments);
    this.onClickSearchBar = this.onClickSearchBar.bind(this);
  }

  componentDidMount() {
    // this.props.dispatchGetNavItems();
    this.props.dispatchGetSwiperImages();
    this.props.dispatchGetHuntList();
    this.props.dispatchGetSellList();
    // this.props.dispatchGetRecommendBooks();
  }

  onClickSearchBar() {
    Taro.navigateTo({ url: URL.SEARCH });
  }

  jumpToBookList(e, url) {
    Taro.navigateTo({url: url});
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  handleLink = () => {
    Taro.navigateTo({url: URL.SELL_PUBLISH});
  }

  handleNavigator (id) {
    if(id == 4) {
      Taro.navigateTo({url: URL.SELL_PUBLISH});
    }
  }

  render() {
    let { swiperImages, newBooks, hotBooks } = this.props;
    return (
      <View>
        <FakeSearchBar onClick={this.onClickSearchBar} />
        <View className='book-recommend'>
          <Swiper
            className='swiper-container'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots
            autoplay
          >
            {swiperImages &&
              swiperImages.map(item => (
                <SwiperItem key={item._id} onClick={e=>this.jumpToBookList(e, item.targetUrl)}>
                  <View className='swiper-pic'>
                    <Image
                      style={{ width: '100%', height: '220PX' }}
                      mode='scaleToFill'
                      src={item.posterImg}
                    />
                  </View>
                </SwiperItem>
              ))}
          </Swiper>
        </View>
        <View className='menu-box'>
        {
          this.props.navItems.map(item => {
            return (
              <View className='menu-item' key={item.id} onClick={e=>this.handleNavigator(item.id)}>
                <View className={'iconfont ' + item.icon} />
                <Text className='menu-text'>{item.text}</Text>
              </View>
            );
          })
        }
        </View>
        <AtTabs
          current={this.state.current}
          scroll
          tabList={[
            { title: '转手' },
            { title: '求购' }
          ]}
          onClick={e=>this.handleClick(e)}
        >
          <AtTabsPane current={this.state.current} index={0}>
            <ListView list={newBooks} type='sell' />
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <ListView list={hotBooks} type='demand' />
          </AtTabsPane>
        </AtTabs>
        <Icon className='iconfont add-icon' size='36' type='success' onClick={this.handleLink} />
      </View>
    );
  }
}
