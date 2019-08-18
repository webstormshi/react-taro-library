import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { 
  getBookListByCategroy
 } from "../../store/book/action";
import ListView from "../../components/ListView/index";
import "./index.scss";

@connect(
  ({ book }) => ({
    bookList: book.bookList
  }),
  {
    dispatchGetBookList: getBookListByCategroy
  }
)
export default class BookList extends Component {
  config = {
    navigationBarTitleText: "图书列表"
  };
  componentDidMount() {
    let params = this.$router.params;
    Taro.setNavigationBarTitle = params.name;
    this.props.dispatchGetBookList(params.id);
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  render() {
    return (
      <View className='category-list'>
        <ListView list={this.props.bookList} type='sell' />
      </View>
    );
  }
}
