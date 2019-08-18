import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { add } from "../../store/counter/action";

import ListView from "../../components/ListView/index";
import "./index.scss";

@connect(
  ({ counter }) => ({
    counter
  }),
  dispatch => ({
    add() {
      dispatch(add());
    }
  })
)
export default class MyPublish extends Component {
  config = {
    navigationBarTitleText: "我发布的"
  };
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  render() {
    return (
      <View className='category-list'>
        <ListView />
      </View>
    );
  }
}
