import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtTag, AtActivityIndicator } from "taro-ui";
import { connect } from "@tarojs/redux";

import { isISBN } from "../../utils/validator";
import URL from "../../constants/urls";
import SearchBar from "../../components/search-bar";
import API from "../../service/api";
import NetworkError from "../../components/network-error";
import BookCard from "../../components/book-card";
import {
  getHotWordList,
  getRecomendList,
  searchProdctList,
  searchProdctByScanCode
  // getRecommendBooks
} from "@store/search/action";
import "./index.scss";

@connect(
  ({ search }) => ({
    recommendBooks: search.recommendBooks,
    hotsearchBooks: search.hotsearchBooks,
    searchBooks: search.searchBooks
  }),
  {
    dispatchGetHotWordList: getHotWordList,
    dispatchGetRecomendList: getRecomendList,
    dispatchSearchProdctList: searchProdctList,
    dispatchSearchProdctByScanCode: searchProdctByScanCode
  }
)

export default class Search extends Component {
  config = {
    navigationBarTitleText: "搜索"
  };

  constructor() {
    super(...arguments);
    let history = Taro.getStorageSync("history");
    this.state = {
      history: history || [],
      value: "",
      isSearching: false, // 每次搜索时重置
      isError: false,
      searchResults: [],
      recommends: ['概率论与数理统计', '英语四六级', '软件工程概论'],
      hot: ['英语', '高等数学', '语文'] || []
    };

    this.onChange = this.onChange.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onScan = this.onScan.bind(this);
    this.onClickTag = this.onClickTag.bind(this);
    this.onDeleteHistory = this.onDeleteHistory.bind(this);
    this.onReSearch = this.onReSearch.bind(this);
  }

  componentDidMount() {
    this.props.dispatchGetHotWordList();
    this.props.dispatchGetRecomendList();
  }

  onChange(value) {
    this.setState({ value });
  }

  onConfirm({ target: { value } }) {
    this.onSearch(value);
  }

  onClickTag({ name }) {
    this.onSearch(name);
  }

  async onSearch(value) {
    this.addHistory(value);
    this.setState({
      value,
      isSearching: true,
      isError: false,
      searchResults: []
    });
    try {
      let { data } = await API.get(`/books?keyword=${value}`);
      this.setState({
        isSearching: false,
        isError: false,
        searchResults: data
      });
    } catch (e) {
      this.setState({
        isSearching: false,
        isError: true,
        searchResults: []
      });
    }
  }

  onReSearch() {
    this.onSearch(this.state.value);
  }

  onScan() {
    Taro.scanCode({ scanType: ["barCode"] })
      .then(res => {
        if (!isISBN(res.result)) {
          return Taro.showModal({
            title: "扫描内容不合法",
            content: "请扫描图书ISBN条形码",
            showCancel: false
          });
        } else {
          Taro.navigateTo({
            url: `${URL.BOOK_DETAIL}?isbn=${res.result}`
          });
        }
      })
      .catch(e => {
        console.log("扫码失败", e);
      });
  }

  onDeleteHistory() {
    Taro.showModal({
      content: "确定删除全部历史记录？"
    }).then(res => {
      if (res.confirm) {
        Taro.removeStorage({ key: "history" });
        this.setState({ history: [] });
      }
    });
  }

  addHistory(value) {
    value = value.trim();
    let history = this.state.history.filter(v => v !== value);
    history.unshift(value);
    if (history.length > 10) {
      history = history.slice(0, 10);
    }
    this.setState({ history });
    Taro.setStorage({
      key: "history",
      data: history
    });
  }

  render() {
    const { history, value, isSearching, isError, searchResults } = this.state;

    const showScan =
      !isSearching && !isError && !(searchResults && searchResults.length);
    const showHistory =
      !isSearching &&
      !isError &&
      !(searchResults && searchResults.length) &&
      history.length;
    const showResults =
      !isSearching && !isError && (searchResults && searchResults.length);

    return (
      <View className='container'>
        <SearchBar
          focus
          fixed
          value={value}
          onChange={this.onChange}
          onConfirm={this.onConfirm}
          onScan={this.onScan}
        />
        {showScan && (
          <View
            className='scan-row at-row at-row__align--center'
            onClick={this.onScan}
          >
            <View className='at-col'>扫描图书条形码</View>
            <Text className='scan-row__arrow at-icon at-icon-chevron-right at-col' />
          </View>
        )}
        {showHistory && (
          <View className='history-container'>
            <View className='at-row at-row__align--center'>
              <View className='history-title at-col'>搜索历史</View>
              <View
                className='history-delete at-col'
                onClick={this.onDeleteHistory}
              >
                <View className='at-icon at-icon-trash' />
                {/* 清除 */}
              </View>
            </View>
            {history.map(item => {
              return (
                <AtTag
                  className='history-item'
                  key={item}
                  name={item}
                  onClick={this.onClickTag}
                >
                  {item}
                </AtTag>
              );
            })}
          </View>
        )}
        <View className='history-container'>
          <View className='at-row at-row__align--center'>
            <View className='history-title at-col'>最近热搜</View>
          </View>
          {this.state.hot.map(item => {
            return (
              <AtTag
                className='history-item'
                key={item}
                name={item}
                onClick={this.onClickTag}
              >
                {item}
              </AtTag>
            );
          })}
        </View>
        <View className='history-container'>
          <View className='at-row at-row__align--center'>
            <View className='history-title at-col'>热门推荐</View>
          </View>
          {this.state.recommends.map(item => {
            return (
              <AtTag
                className='history-item'
                key={item}
                name={item}
                onClick={this.onClickTag}
              >
                {item}
              </AtTag>
            );
          })}
        </View>
        {isSearching && (
          <AtActivityIndicator mode='center' content='加载中...' />
        )}
        {isError && <NetworkError onClick={this.onReSearch} />}
        {showResults && (
          <View>
            {searchResults.map(item => (
              <BookCard data={item} key={item.id} />
            ))}
          </View>
        )}
      </View>
    );
  }
}
