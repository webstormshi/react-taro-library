import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import { connect } from "@tarojs/redux";
import { 
  getFirstCategroy,
  getSecondCategroy,
  getBookListByCategroy
 } from "../../store/book/action";

import CategoryView from "../../components/CategoryView/index";
import "./index.scss";

@connect(
  ({ book }) => ({
    firstCategroy: book.firstCategroy,
    secondCategroy: book.secondCategroy,
    bookList: book.bookList,
    bookDetail: book.bookDetail
  }),
  {
    dispatchGetFirstCategroy: getFirstCategroy,
    dispatchGetSecondCategroy: getSecondCategroy,
    dispatchGetBookListByCategroy: getBookListByCategroy
  }
)
export default class CategoryList extends Component {
  config = {
    navigationBarTitleText: "全部分类"
  };

  constructor() {
    super(...arguments)
    this.state = {
      current: 0,
      currentItem: {}
    }
  }

  componentDidMount() {
    this.props.dispatchGetFirstCategroy();
    this.props.dispatchGetSecondCategroy(1);
  }

  handleClick (value) {
    let { firstCategroy } = this.props;
    let currentItem = firstCategroy[value];
    this.props.dispatchGetSecondCategroy(currentItem.categoryId);
    this.setState({ current: value, currentItem: currentItem });
  }

  render() {
    let { firstCategroy, secondCategroy } = this.props;
    let { currentItem } = this.state;
    return (
      <View className='category-container'>
        <AtTabs
          current={this.state.current}
          scroll
          height='400px'
          tabDirection='vertical'
          tabList={firstCategroy}
          onClick={e=>this.handleClick(e)}
        >
          {
            firstCategroy.map(item =>(
              <AtTabsPane 
                tabDirection='vertical'
                current={this.state.current} 
                index={item.categoryId}
                key={item.categoryId}
              >
                <CategoryView type='choose' current={currentItem} data={secondCategroy} />
              </AtTabsPane>
            ))
          }
        </AtTabs>
      </View>
    );
  }
}
